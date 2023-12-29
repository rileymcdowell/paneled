from panel_dashboard.ops.calibration import pct_to_duty_cycle
from panel_dashboard.constants import HTTP_CLIENT

async def set_fan_pct(ip_addr, speed):
    duty_cycle = pct_to_duty_cycle('fan', speed)
    await HTTP_CLIENT.post(f"http://{ip_addr}/fan", json={"fan": duty_cycle})