from panel_dashboard.app_config import get_discovery_mode

# Allow discovered panels to leave the cache after 10 minutes
SECOND = 1
MINUTE = 60 * SECOND


def discover_panel_ips():

    if get_discovery_mode() == 'mdns':
        from panel_dashboard.discovery.impl.discovery_mdns import discover_panels as _discover_panels_impl
    elif get_discovery_mode() == 'ip_list':
        from panel_dashboard.discovery.impl.discovery_iplist import discover_panels as _discover_panels_impl
    else:
        raise NotImplementedError("Unknown discovery mode")

    return _discover_panels_impl()
