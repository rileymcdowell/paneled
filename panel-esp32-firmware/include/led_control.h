#ifndef H_LED_CONTROL
#define H_LED_CONTROL

class LedControl {
  private:
    int ctrlChannel_;
    int ctrlPin_;
    int dutyCycle_;
    
  public:
    LedControl(int ctrlChannel, int ctrlPin, float initialDutyCyclePct);
    void setupControl();
    int getDutyCycle();
    void setDutyCycle(int duty);
};

#endif
