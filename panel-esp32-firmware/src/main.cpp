#include "led_control.h"
#include "fan_control.h"
#include "fan_tach.h"
#include "wifi_control.h"
#include "server_control.h"
#include "identification.h"
#include "mdns_control.h"

/* FAN SPEED CONTROL */
const int fanCtrlChannel = 0;
const int fanCtrlPin = 21;
const float fanInitialDutyCycle = 0.3; // 30%
FanControl fanControl = FanControl(fanCtrlChannel, fanCtrlPin, fanInitialDutyCycle);
/* END FAN SPEED CONTROL */

/* FAN TACHOMETER */
const int fanTachometerPin = 19;
FanTach fanTach = FanTach(fanTachometerPin);
/* END FAN TACHOMETER */

/* BEGIN LED PWM */
const int whiteCtrlChannel = 2;
const int whiteCtrlPin = 22;
const float whiteInitialDutyCycle = 0.02;
LedControl whiteControl = LedControl(whiteCtrlChannel, whiteCtrlPin, whiteInitialDutyCycle);

const int redCtrlChannel = 4;
const int redCtrlPin = 26;
const float redInitialDutyCycle = 0.02;
LedControl redControl = LedControl(redCtrlChannel, redCtrlPin, redInitialDutyCycle);

const int greenCtrlChannel = 6;
const int greenCtrlPin = 25;
const float greenInitialDutyCycle = 0.02;
LedControl greenControl = LedControl(greenCtrlChannel, greenCtrlPin, greenInitialDutyCycle);

const int blueCtrlChannel = 8;
const int blueCtrlPin = 23;
const float blueInitialDutyCycle = 0.02;
LedControl blueControl = LedControl(blueCtrlChannel, blueCtrlPin, blueInitialDutyCycle);
/* END LED PWM */

/* BEGIN IDENTIFICATION */
Identification identification = Identification();
/* END IDENTIFICATION */

/* BEGIN WIFI CONTROL */
WifiControl wifiControl = WifiControl(identification);
/* END WIFI CONTROL */

/* BEGIN SERVER CONTROL */
ServerControl serverControl = ServerControl( fanControl
                                           , fanTach
                                           , redControl
                                           , greenControl
                                           , blueControl
                                           , whiteControl
                                           , identification
                                           );
/* END SERVER CONTROL */

/* BEGIN mDNS CONTROL */
MDNSControl mdnsControl = MDNSControl(identification);
/* END mDNS CONTROL */

/* BEGIN SETUP/LOOP CONVENTION */

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(115200);
  fanControl.setupControl();
  fanTach.setupTach();
  whiteControl.setupControl();
  redControl.setupControl();
  greenControl.setupControl();
  blueControl.setupControl();
  identification.setupIdentification();
  wifiControl.setupWifi();
  serverControl.setupServer();
  mdnsControl.setupControl();
}

// the loop function runs over and over again forever
void loop() {
  if (fanTach.hasUpdate()) {
    int rpm = fanTach.getRPM();
    Serial.print("Fan Speed Reported: ");
    Serial.print(rpm);
    Serial.println(" RPM");
  }
  serverControl.handleClient();
}

/* END SETUP/LOOP CONVENTION */
int main() {
  setup();
  while (true) {
    loop();
  }
}