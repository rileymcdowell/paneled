import os

DISCOVERY_MODE_MDNS = 'mdns'
DISCOVERY_MODE_IP_LIST = 'ip_list'
_DISCOVERY_MODE_UNSET = 'unset'

def get_discovery_mode():
    """
    The present
    """
    mode = os.environ.get('DISCOVERY_MODE', _DISCOVERY_MODE_UNSET)
    if mode == DISCOVERY_MODE_IP_LIST:
        return DISCOVERY_MODE_IP_LIST
    elif mode == DISCOVERY_MODE_MDNS:
        return DISCOVERY_MODE_MDNS 
    elif mode == _DISCOVERY_MODE_UNSET:
        raise ValueError("DISCOVERY_MODE environment variable was not set")
    else:
        raise NotImplementedError(f"DISCOVERY_MODE {mode} is not implemented")