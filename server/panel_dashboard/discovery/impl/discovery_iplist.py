import os

def discover_panels():
    return os.environ['PANEL_IPS'].split(',')