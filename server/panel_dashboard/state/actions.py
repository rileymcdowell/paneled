import typing
import logging
import json
import redis as _redislib
import panel_dashboard.ops as ops

_logger = logging.getLogger(__name__)

from panel_dashboard.constants \
    import REDIS_STATE_BACKEND_URL

_REDIS_CONN = None
def _get_redis():
    global _REDIS_CONN
    if _REDIS_CONN is None:
        _REDIS_CONN = \
            _redislib.from_url(REDIS_STATE_BACKEND_URL)
    return _REDIS_CONN

"""
Schema:

Key: "panels"
Description: A set storing the last known set of panels, some of which may no longer be around.
Type: Set
Expires: Never

Key: "<ip_address>-status"
Description: Last known panel status.
Type: Hash
Expires: 5 Minutes

Key: "<ip_address>-shadow"
Description: Current desired panel status.
Type: Hash
Expires: 1 Week
"""

_SECOND = 1
_MINUTE = _SECOND * 60
_HOUR = _MINUTE * 60
_DAY = _HOUR * 24
_WEEK = _DAY * 7

_EXPIRE_STATUS_SECONDS = _MINUTE * 5
_EXPIRE_SHADOW_SECONDS = _WEEK

def _get_status_key(ip_address):
    if type(ip_address) == bytes:
        ip_address = ip_address.decode()
    return f"{ip_address}-status"

def _get_shadow_key(ip_address):
    if type(ip_address) == bytes:
        ip_address = ip_address.decode()
    return f"{ip_address}-shadow"

def get_panels():
    redis = _get_redis()

    # We can easily get the last known list of
    # panels, but there might be some that have expired.
    panels = redis.smembers(b"panels")

    # We should clean them up before returning the result.
    drop_panels = set()
    for panel in panels:
        if not redis.exists(_get_status_key(panel)):
            # Remove from redis panel list and from memory
            drop_panels.add(panel)
    for drop_panel in drop_panels:
        redis.srem(b"panels", drop_panel)
        panels.remove(drop_panel)

    return [x.decode() for x in panels]

async def confirm_panel(ip_address, status):
    """
    This is what we do when we find a new panel or confirm a known panel
    exists. We should synchronize status and shadow here.
    """
    redis = _get_redis()
    redis.sadd(b"panels", ip_address)
    set_status(ip_address, status)
    shadow = get_shadow(ip_address)
    _logger.debug(f"Confirmed: {shadow}", flush=True)
    if shadow is not None:
        # If a shadow does exist, sync with it.
        await ops.synchronize_state.sync_panel(current=status, desired=shadow)
    else:
        # If it doesn't exist, make one based on the current state.
        await set_shadow(ip_address, status)

    # Reconfirm the shadow/status key expiration timeline.
    # It's okay to expire keys that do not exist, it's a no-op.
    redis.expire(_get_shadow_key(ip_address), _EXPIRE_SHADOW_SECONDS)

def get_status(ip_address):
    redis = _get_redis()
    res = redis.get(_get_status_key(ip_address))
    if res is None:
        return res
    else:
        return json.loads(res.decode())

def get_shadow(ip_address) -> dict[str, typing.Any]:
    redis = _get_redis()
    res = redis.get(_get_shadow_key(ip_address))
    if res is None:
        return None
    else:
        return json.loads(res.decode())

def set_status(ip_address, state):
    redis = _get_redis()
    key = _get_status_key(ip_address)
    redis.set(key, json.dumps(state))
    redis.expire(key, _EXPIRE_STATUS_SECONDS)

async def set_shadow(ip_address, state):
    redis = _get_redis()
    key = _get_shadow_key(ip_address)
    redis.set(key, json.dumps(state))
    redis.expire(key, _EXPIRE_SHADOW_SECONDS)
    try:
        await ops.synchronize_state.sync_panel(current=get_status(ip_address), desired=state)
    except Exception:
        import traceback
        traceback.print_exc()
        _logger.warn("Failed to set state when shadow was set...")
        pass # The state can sync properly when the panel is next online.