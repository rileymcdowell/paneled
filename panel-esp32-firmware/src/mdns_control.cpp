#include "mdns_control.h"

#include <ESPmDNS.h>
#include "identification.h"

MDNSControl::MDNSControl(Identification& identification) {
    identification_ = &identification;
}

void MDNSControl::setupControl() {
    //initialize mDNS service
    mdns_init();

    //set hostname
    mdns_hostname_set(identification_->getHostname());
    //set default instance
    mdns_instance_name_set("ESP32 LED Panel");

    mdns_service_add(NULL, "_http", "_tcp", 80, NULL, 0);
    mdns_service_instance_name_set("_http", "_tcp", "ESP32 LED Panel Control");

    mdns_service_txt_item_set("_http", "_tcp", "name", identification_->getName());
    mdns_service_txt_item_set("_http", "_tcp", "group", identification_->getGroup());
    mdns_service_txt_item_set("_http", "_tcp", "mac", identification_->getMac());
    mdns_service_txt_item_set("_http", "_tcp", "version", identification_->getVersion());
}
