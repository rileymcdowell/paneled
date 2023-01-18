#include "fan_tach.h"
#include <Ticker.h>
#include <Arduino.h>

// The target interval between speed updates. 
// Accurate to within 10% or so.
const int FAN_UPDATE_INTERVAL_S = 10;

// Stylistically, these should be private class variables.
// Pragmatically, dealing with IRAM_ATTRs and interrupt
// callbacks is cleaner with static-type functions.
// It works fine as long as we only read a single fan tachometer.
int halfRevolutionsInInterval = 0;
int currentRPM = 0;
bool tachUpdateReady = false;
Ticker periodicTicker;

volatile int fanHalfRevolutions;
void IRAM_ATTR countHalfRevolution() {
  // An ISR function triggered by interrupts.
  // Function defined in onboard RAM for maximum handling speed.
  // volatile variables only.
  fanHalfRevolutions += 1;
}

void updateTachInfo() {
  tachUpdateReady = true;
  halfRevolutionsInInterval = fanHalfRevolutions;
  // Reset for next time
  fanHalfRevolutions = 0;
}

FanTach::FanTach(int pin) {
   pin_ = pin;
}

void FanTach::setupTach() {
  // Configure a timer to update the tach status on an interval.
  periodicTicker.attach(FAN_UPDATE_INTERVAL_S, updateTachInfo);
  // Configure a callback to catch fan tachometer signal.
  attachInterrupt(pin_, countHalfRevolution, RISING);
}

int FanTach::getRPM() {
  // Use a multiplier and divisor of 1024 to avoid doing float math.
  int fullRevolutionsInInterval = 1024 * halfRevolutionsInInterval / 2;
  int rps = fullRevolutionsInInterval / FAN_UPDATE_INTERVAL_S;
  int rpm = rps * 60 / 1024;
  
  // Mark this update as read.
  tachUpdateReady = false;
  
  return rpm;
}

bool FanTach::hasUpdate() {
  return tachUpdateReady;
}
