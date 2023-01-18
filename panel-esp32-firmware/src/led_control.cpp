#include "led_control.h"
#include <math.h>
#include <esp32-hal-ledc.h>

const int CTRL_FREQ = 20000; // 20 KHz
const int CTRL_RESOLUTION = 10; // 2**10 = 1024
const int MAX_DUTY_CYCLE = pow(2, CTRL_RESOLUTION);

LedControl::LedControl(int ctrlChannel, int ctrlPin, float initialDutyCyclePct) {
  ctrlChannel_ = ctrlChannel;
  ctrlPin_ = ctrlPin;
  dutyCycle_ = initialDutyCyclePct * MAX_DUTY_CYCLE;
}

void LedControl::setupControl() {
  // First, setup the PWM frequency and resolution
  ledcSetup(ctrlChannel_, CTRL_FREQ, CTRL_RESOLUTION); 
  // Then, tell which pin should output that PWM signal.
  ledcAttachPin(ctrlPin_, ctrlChannel_);
  // Last, set the initial duty cycle.
  ledcWrite(ctrlChannel_, dutyCycle_);
}
  
int LedControl::getDutyCycle() {
  return dutyCycle_;
}
  
void LedControl::setDutyCycle(int duty) {
  // Save the value.
  dutyCycle_ = duty;
  // Set the value.
  ledcWrite(ctrlChannel_, dutyCycle_);
}
