import requests
from panel_dashboard.ops.calibration import pct_to_duty_cycle

_VALID_COLORS = ['red', 'green', 'blue', 'white']
def set_panel_color(ip_addr, color_name, color_value):
    color_name = color_name.lower()
    assert color_name in _VALID_COLORS
    duty_cycle = pct_to_duty_cycle(color_name, color_value)
    requests.post(f"http://{ip_addr}/{color_name}", json={color_name: duty_cycle})

def set_panel_red_pct(ip_addr, value):
    set_panel_color(ip_addr, "red", value)

def set_panel_green_pct(ip_addr, value):
    set_panel_color(ip_addr, "green", value)

def set_panel_blue_pct(ip_addr, value):
    set_panel_color(ip_addr, "blue", value)

def set_panel_white_pct(ip_addr, value):
    set_panel_color(ip_addr, "white", value)
