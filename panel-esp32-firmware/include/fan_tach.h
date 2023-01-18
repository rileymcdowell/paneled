#ifndef H_FAN_TACH
#define H_FAN_TACH

#include <Ticker.h>

class FanTach {
  private:
    int pin_;
    
  public:
    FanTach(int pin);
    void setupTach();
    int getRPM();
    bool hasUpdate();
};

#endif
