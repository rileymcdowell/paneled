import os

DISCOVERY_MODE_MDNS = 'mdns'
DISCOVERY_MODE_IP_LIST = 'ip_list'

def get_discovery_mode():
    """
    The present
    """
    if 'PANEL_IPS' in os.environ:
        return DISCOVERY_MODE_IP_LIST
    elif  'USE_MDNS' in os.environ:
        return DISCOVERY_MODE_MDNS 
    else:
        raise NotImplementedError("Unknown discovery mode")