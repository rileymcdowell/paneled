import os
import time

import logging

_logger = logging.getLogger(__name__)

_MDNS_WAIT_TIME_S = int(os.environ.get('MDNS_WAIT_TIME_S', '5'))
_PANEL_NAME_SUBSTRING = "LED Panel Control"

def discover_panels():
    from zeroconf import ServiceBrowser, ServiceListener, Zeroconf

    class MyListener(ServiceListener):
        def __init__(self):
            self.found = []

        def update_service(self, zc: Zeroconf, type_: str, name: str) -> None:
            pass

        def remove_service(self, zc: Zeroconf, type_: str, name: str) -> None:
            pass

        def add_service(self, zc: Zeroconf, type_: str, name: str) -> None:
            info = zc.get_service_info(type_, name)
            self.found.append(info)


    zeroconf = Zeroconf()
    listener = MyListener()
    browser = ServiceBrowser(zeroconf, "_http._tcp.local.", listener)
    _logger.debug(f"Started mDNS service browser: {browser.name} with thread identity: {browser.ident}")
    time.sleep(_MDNS_WAIT_TIME_S)
    zeroconf.close()

    matches = [x for x in listener.found if _PANEL_NAME_SUBSTRING in x.name]
    _logger.debug(f"mDNS detected {len(matches)} matches in {_MDNS_WAIT_TIME_S} seconds")

    panel_ips = []
    for match in matches:
        try:
            panel_ips.append(match.parsed_addresses()[0])
        except:
            pass

    return panel_ips

if __name__ == '__main__':
    print(discover_panels())
