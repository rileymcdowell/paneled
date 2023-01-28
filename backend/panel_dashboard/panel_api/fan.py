import requests
from panel_dashboard.ops.calibration import duty_cycle_to_pct, pct_to_duty_cycle

def set_fan_pct(ip_addr, speed):
    duty_cycle = pct_to_duty_cycle('fan', speed)
    requests.post(f"http://{ip_addr}/fan", json={"fan": duty_cycle})