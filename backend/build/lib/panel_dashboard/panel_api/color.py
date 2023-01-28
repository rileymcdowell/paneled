import requests

_VALID_COLORS = ['red', 'green', 'blue', 'white']
def _set_panel_color(ip_addr, color_name, color_value):
    assert color_name in _VALID_COLORS
    requests.post(f"http://{ip_addr}/{color_name}", json={color_name: color_value})

def set_panel_red(ip_addr, value):
    _set_panel_color(ip_addr, "red", value)

def set_panel_green(ip_addr, value):
    _set_panel_color(ip_addr, "green", value)

def set_panel_blue(ip_addr, value):
    _set_panel_color(ip_addr, "blue", value)

def set_panel_white(ip_addr, value):
    _set_panel_color(ip_addr, "white", value)