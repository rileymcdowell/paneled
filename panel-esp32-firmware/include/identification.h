#ifndef H_IDENTIFICATION
#define H_IDENTIFICATION

class Identification {
  public:
    Identification();
    void setupIdentification();
    
    void saveName(const char* name);
    const char* getName();
    void saveGroup(const char* group);
    const char* getGroup();
    /* Read-only convenience wrappers */
    const char* getVersion();
    const char* getMac();
    const char* getHostname();
};

#endif
