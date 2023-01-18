#ifndef H_FAN_CONTROL
#define H_FAN_CONTROL

class FanControl {
  private:
    int controlChannel_;
    int controlPin_;
    int dutyCycle_;
    
  public:
    FanControl(int controlChannel, int controlPin, float initialDutyCyclePct);
    void setupControl();
    int getDutyCycle();
    int getFanRPM();
    void setDutyCycle(int duty);
};

#endif
