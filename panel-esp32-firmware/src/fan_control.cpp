#include "fan_control.h"
#include <math.h>
#include <esp32-hal-ledc.h>

const int CTRL_FREQ = 25000; // 25 KHz per spec
const int CTRL_RESOLUTION = 8; // 2**8 = 256
const int MAX_DUTY_CYCLE = pow(2, CTRL_RESOLUTION);

FanControl::FanControl(int controlChannel, int controlPin, float initialDutyCyclePct) {
  controlChannel_ = controlChannel;
  controlPin_ = controlPin;
  dutyCycle_ = initialDutyCyclePct * MAX_DUTY_CYCLE;
}

void FanControl::setupControl() {
  // First, setup the PWM frequency and resolution
  ledcSetup(controlChannel_, CTRL_FREQ, CTRL_RESOLUTION); 
  // Then, tell which pin should output that PWM signal.
  ledcAttachPin(controlPin_, controlChannel_);
  // Last, set the initial duty cycle.
  ledcWrite(controlChannel_, dutyCycle_);
}
  
int FanControl::getDutyCycle() {
  return dutyCycle_;
}
  
void FanControl::setDutyCycle(int duty) {
  // Save the value.
  dutyCycle_ = duty;
  // Set the value.
  ledcWrite(controlChannel_, dutyCycle_);
}
