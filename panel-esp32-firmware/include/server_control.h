#ifndef H_SERVER_CONTROL
#define H_SERVER_CONTROL

#include "./fan_control.h"
#include "./fan_tach.h"
#include "./led_control.h"
#include "./identification.h"
#include <ArduinoJson.h>

class ServerControl {
  private:
    FanControl* fanControl_;
    FanTach* fanTach_;
    LedControl* redControl_;
    LedControl* greenControl_;
    LedControl* blueControl_;
    LedControl* whiteControl_;
    Identification* identification_;


    void setRed();
    void setGreen();
    void setBlue();
    void setWhite();
    void setFan();
    void setName();
    void setGroup();
    void getStatus();
    
  public:
    ServerControl( FanControl& fanControl
                 , FanTach& fanTach
                 , LedControl& redControl
                 , LedControl& greenControl
                 , LedControl& blueControl
                 , LedControl& whiteControl
                 , Identification& identification);
    void setupServer();
    void handleClient();
};

#endif
