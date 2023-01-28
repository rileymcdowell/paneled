import logging
import json
import redis as _redislib

_logger = logging.getLogger(__name__)

from panel_dashboard.constants \
    import DEFAULT_STATE_BACKEND_HOST \
         , DEFAULT_STATE_BACKEND_PORT \
         , DEFAULT_STATE_BACKEND_DB

_REDIS_CONN = None
def _get_redis():
    global _REDIS_CONN
    if _REDIS_CONN is None:
        _REDIS_CONN = \
            _redislib.Redis( host=DEFAULT_STATE_BACKEND_HOST
                           , port=DEFAULT_STATE_BACKEND_PORT
                           , db=DEFAULT_STATE_BACKEND_DB
                           )
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
Expires: 1 Hour
"""

_EXPIRE_STATUS_SECONDS = 60*5
_EXPIRE_SHADOW_SECONDS = 60*60

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

def confirm_panel(ip_address, status):
    redis = _get_redis()
    redis.sadd(b"panels", ip_address)
    set_status(ip_address, status)
    # It's okay to expire keys that do not exist, it's a no-op.
    redis.expire(_get_shadow_key(ip_address), _EXPIRE_SHADOW_SECONDS)

def get_status(ip_address):
    redis = _get_redis()
    res = redis.get(_get_status_key(ip_address)).decode()
    return json.loads(res)

def get_shadow(ip_address):
    redis = _get_redis()
    res = redis.get(_get_shadow_key(ip_address)).decode()
    return json.loads(res)

def set_status(ip_address, state):
    redis = _get_redis()
    key = _get_status_key(ip_address)
    redis.set(key, json.dumps(state))
    redis.expire(key, _EXPIRE_STATUS_SECONDS)

def set_shadow(ip_address, state):
    redis = _get_redis()
    key = _get_shadow_key(ip_address)
    redis.set(key, json.dumps(state))
    redis.expire(key, _EXPIRE_SHADOW_SECONDS)