#include "identification.h"
#include <Preferences.h>
#include "app_version.h"
#include <iostream>
#include <sstream>
#include <iomanip>

const size_t MAX_STR_LEN = 64;
// Add one to the end for the null character.
const size_t MAX_MAC_LEN = 12+1;
const size_t HOSTNAME_LEN = MAX_STR_LEN+1+MAX_STR_LEN+1+MAX_MAC_LEN+1;
const char nameKey[] = "name";
const char groupKey[] = "group";

// A place to cache values were we have control over
// memory reclamation.
char currentName[MAX_STR_LEN];
char currentGroup[MAX_STR_LEN];
char macAddr[MAX_MAC_LEN];
char hostname[HOSTNAME_LEN];

Preferences preferences;

Identification::Identification() {
  // Nothing to do in constructor.
}

void Identification::setupIdentification() {
  // Uncomment in case things need cleared out.
  //  preferences.begin("app");
  //  preferences.remove(nameKey);
  //  preferences.remove(groupKey);
  //  preferences.clear();
  //  preferences.end();
}

/* Name Identification */
void Identification::saveName(const char* newName) {
  preferences.begin("app");
  strcpy(currentName, newName);
  preferences.putString(nameKey, currentName);
  preferences.end();
}
const char* Identification::getName(){
  // TODO: Copy char-by-char into currentGroup so it doesn't
  // get reclaimed.
  preferences.begin("app");
  char nameDest[MAX_STR_LEN];
  preferences.getString(nameKey, nameDest, MAX_STR_LEN);
  strcpy(currentName, nameDest);
  preferences.end();
  return currentName;
}

/* Group Identification */
void Identification::saveGroup(const char* newGroup) {
  preferences.begin("app");
  strcpy(currentGroup, newGroup);
  preferences.putString(groupKey, currentGroup);
  preferences.end();
}
const char* Identification::getGroup(){
  // TODO: Copy char-by-char into currentGroup so it doesn't
  // get reclaimed. nvs_get_str is the likely culprit.
  preferences.begin("app");
  char groupDest[MAX_STR_LEN];
  preferences.getString(groupKey, groupDest, MAX_STR_LEN);
  strcpy(currentGroup, groupDest);  
  preferences.end();
  return currentGroup;
}

/* Version Identification */
const char* Identification::getVersion() {
  return APP_VERSION;
}

/* Unique MAC Address */
const char* Identification::getMac() {
  uint8_t mac[6];
  esp_efuse_mac_get_default(mac); // The mac used by the wifi unit.
  std::stringstream ss;
  // Set the stream to pad with zeros.
  ss << std::setfill('0');
  // Pull out each byte of the mac address and write it as hex (width 2);
  for (int i = 0; i < 6; i++) {
    ss << std::hex << std::setw(2) << static_cast<int>(mac[i]);
  }
  // The string stream contents are recliamed, so save a copy.
  strcpy(macAddr, ss.str().c_str());
  return macAddr;
}

const char* Identification::getHostname() {
  strcpy(hostname, this->getName());
  strcat(hostname, "-");
  strcat(hostname, this->getGroup());
  strcat(hostname, "-");
  strcat(hostname, this->getMac());
  return hostname;
}
