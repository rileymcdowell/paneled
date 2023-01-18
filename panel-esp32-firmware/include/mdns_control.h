#ifndef H_MDNS_CONTROL
#define H_MDNS_CONTROL

#include "./identification.h"

class MDNSControl {
  private:
    Identification* identification_;
    
  public:
    MDNSControl(Identification& identification);
    void setupControl();

};

#endif
