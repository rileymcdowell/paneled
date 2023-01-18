#include "server_control.h"

#include <WebServer.h>
#include <ArduinoJson.h>
#include <Update.h>

#include "identification.h"
#include "fan_control.h"
#include "fan_tach.h"
#include "led_control.h"

const uint SERVER_PORT = 80;
WebServer server(SERVER_PORT);
char jsonDocBuffer[350];

const char* serverIndex = R"(<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'>
    <title>LED Wall Panel</title>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
  </head>
  <body>
    <h1>LED Wall Panel</h1>
    <h3 id='version'></h3>
    <hr/>
    <h3 id='group'></h3>
    <h3 id='name'></h3>
    <form method='POST' action='#' enctype='multipart/form-data' id='upload_form'>
      <input type='file' name='update'>
      <input type='submit' value='Update'>
    </form>
    <div id='prg'>progress: 0%</div>
    <script>
    /* Load the status and populate fields*/
    $.ajax({ url: '/status'
           , type: 'GET'
          }).done(function(status) {
            $('#version').empty();
            $('#version').append('Version: ' + status['version']);
            $('#name').empty();
            $('#name').append('Name: ' + status['name']);
            $('#group').empty();
            $('#group').append('Group: ' + status['group']);
          });
    /* What to do when form is submitted */
    $('form').submit(function(e) {
      e.preventDefault();
      var form = $('#upload_form')[0];
      var data = new FormData(form);
      $.ajax({
        url: '/update',
        type: 'POST',
        data: data,
        contentType: false,
        processData:false,
        xhr: function() {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener('progress', function(evt) {
          if (evt.lengthComputable) {
              var per = evt.loaded / evt.total;
              $('#prg').html('progress: ' + Math.round(per*100) + '%');
          }
          }, false);
          return xhr;
        },
        success: function(d, s) {
            console.log('success!');
        },
        error: function (a, b, c) {
            console.log('failure!');
        }
      });
    });
    </script>
  </body>
</html>
)";

const char* redirectHTML = R"(<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="./index">here</A>.
</BODY></HTML>)";

ServerControl::ServerControl( FanControl& fanControl
                            , FanTach& fanTach
                            , LedControl& redControl
                            , LedControl& greenControl
                            , LedControl& blueControl
                            , LedControl& whiteControl
                            , Identification& identification) {
  fanControl_ = &fanControl;
  fanTach_ = &fanTach;
  redControl_ = &redControl;
  greenControl_ = &greenControl;
  blueControl_ = &blueControl;
  whiteControl_ = &whiteControl;
  identification_ = &identification;
}

void ServerControl::getStatus() {
  StaticJsonDocument<512> jsonDocument;
  
  jsonDocument["name"] = identification_->getName();
  jsonDocument["group"] = identification_->getGroup();
  jsonDocument["macAddr"] = identification_->getMac();
  jsonDocument["version"] = identification_->getVersion();
  jsonDocument["fanDutyCycle"] = fanControl_->getDutyCycle();
  jsonDocument["fanRPM"] = fanTach_->getRPM();
  jsonDocument["whiteDutyCycle"] = whiteControl_->getDutyCycle();
  jsonDocument["redDutyCycle"] = redControl_->getDutyCycle();
  jsonDocument["greenDutyCycle"] = greenControl_->getDutyCycle();
  jsonDocument["blueDutyCycle"] = blueControl_->getDutyCycle();

  serializeJson(jsonDocument, jsonDocBuffer);
  server.sendHeader("Connection", "close");
  server.send(200, "application/json", jsonDocBuffer);
}


void setColor(LedControl* ledControl, char* color) {
  String body = server.arg("plain");
  StaticJsonDocument<100> jsonDocument;
  deserializeJson(jsonDocument, body);
  int dutyCycle = jsonDocument[color];
  ledControl->setDutyCycle(dutyCycle);

  server.sendHeader("Connection", "close");
  server.send(200, "application/json", "{'status': 'OK'}");
}

void ServerControl::setRed() {
  char red[] = "red";
  setColor(redControl_, red);
}

void ServerControl::setGreen() {
  char green[] = "green";
  setColor(greenControl_, green);
}

void ServerControl::setBlue() {
  char blue[] = "blue";
  setColor(blueControl_, blue);
}

void ServerControl::setWhite() {
  char white[] = "white";
  setColor(whiteControl_, white);
}

void ServerControl::setFan() {
  String body = server.arg("plain");
  StaticJsonDocument<100> jsonDocument;
  deserializeJson(jsonDocument, body);
  int dutyCycle = jsonDocument["fan"];
  fanControl_->setDutyCycle(dutyCycle);

  server.sendHeader("Connection", "close");
  server.send(200, "application/json", "{'status': 'OK'}");
}

void ServerControl::setName() {
  String body = server.arg("plain");
  StaticJsonDocument<100> jsonDocument;
  deserializeJson(jsonDocument, body);
  const char* newName = jsonDocument["name"];
  identification_->saveName(newName);

  server.sendHeader("Connection", "close");
  server.send(200, "application/json", "{'status': 'OK'}");
}

void ServerControl::setGroup() {
  String body = server.arg("plain");
  StaticJsonDocument<100> jsonDocument;
  deserializeJson(jsonDocument, body);
  const char* newGroup = jsonDocument["group"];
  identification_->saveGroup(newGroup);

  server.sendHeader("Connection", "close");
  server.send(200, "application/json", "{'status': 'OK'}");
}

void ServerControl::setupServer() {
  // Callbacks are class methods, so need to use lambda
  // to capture "this" by reference.
  server.on("/status", [&]() {
    this->getStatus();
  } );
  server.on("/white", HTTP_POST, [&]() {
    this->setWhite();
  } );
  server.on("/red", HTTP_POST, [&]() {
    this->setRed();
  } );
  server.on("/green", HTTP_POST, [&]() {
    this->setGreen();
  } );
  server.on("/blue", HTTP_POST, [&]() {
    this->setBlue();
  } );
  server.on("/fan", HTTP_POST, [&]() {
    this->setFan();
  } );

  /* MDNS Main Page */
  server.on("/", HTTP_GET, [&]() {
    server.sendHeader("Connection", "close");
    server.sendHeader("Location", "/index");
    server.send(301, "text/html", redirectHTML);
  });

  /* Identification */
  server.on("/version", HTTP_GET, [&]() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", this->identification_->getVersion());
  });
  server.on("/name", HTTP_GET, [&]() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", this->identification_->getName());
  });
  server.on("/group", HTTP_GET, [&]() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", this->identification_->getGroup());
  });
  server.on("/name", HTTP_POST, [&]() {
    this->setName();
  } );
  server.on("/group", HTTP_POST, [&]() {
    this->setGroup();
  } );

  /* Wifi Updates */
  server.on("/index", HTTP_GET, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", serverIndex);
  });
  server.on("/update", HTTP_POST, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/plain", (Update.hasError()) ? "FAIL" : "OK");
    ESP.restart();
  }, []() {
    HTTPUpload& upload = server.upload();
    if (upload.status == UPLOAD_FILE_START) {
      Serial.printf("Update: %s\n", upload.filename.c_str());
      if (!Update.begin(UPDATE_SIZE_UNKNOWN)) { //start with max available size
        Update.printError(Serial);
      }
    } else if (upload.status == UPLOAD_FILE_WRITE) {
      /* flashing firmware to ESP*/
      if (Update.write(upload.buf, upload.currentSize) != upload.currentSize) {
        Update.printError(Serial);
      }
    } else if (upload.status == UPLOAD_FILE_END) {
      if (Update.end(true)) { //true to set the size to the current progress
        Serial.printf("Update Success: %u\nRebooting...\n", upload.totalSize);
      } else {
        Update.printError(Serial);
      }
    }
  });
  server.begin();
}

void ServerControl::handleClient() {
  server.handleClient();
}
