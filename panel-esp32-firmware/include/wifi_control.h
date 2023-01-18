#ifndef H_WIFI_CONTROL
#define H_WIFI_CONTROL

#include "./identification.h"

class WifiControl {
  private:
    Identification* identification_;
  public:
    WifiControl(Identification& identification);
    void setupWifi();
};

#endif
