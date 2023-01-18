#include "wifi_control.h"
#include "identification.h"
#include <WiFi.h>

const char* WIFI_SSID = "dd-wrt-down";
const char* WIFI_PASSWORD = "govap123";

WifiControl::WifiControl(Identification& identification) {
  identification_ = &identification;
}

void WifiControl::setupWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  WiFi.setHostname(this->identification_->getHostname());
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Establishing connection to WiFi...");
  }
  Serial.println("Connected to network");
  Serial.println(WiFi.localIP());
}
