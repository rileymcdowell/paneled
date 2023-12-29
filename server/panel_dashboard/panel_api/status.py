import typing
import panel_dashboard.ops.calibration as calibration
from panel_dashboard.constants import HTTP_CLIENT

async def get_panel_status(ip_addr) -> dict[str, typing.Any]:
    status_result = await HTTP_CLIENT.get(f"http://{ip_addr}/status")
    status = status_result.json()
    status['red'] = calibration.duty_cycle_to_pct('red', status['redDutyCycle'])
    status['green'] = calibration.duty_cycle_to_pct('green', status['greenDutyCycle'])
    status['blue'] = calibration.duty_cycle_to_pct('blue', status['blueDutyCycle'])
    status['white'] = calibration.duty_cycle_to_pct('white', status['whiteDutyCycle'])
    status['fan'] = calibration.duty_cycle_to_pct('fan', status['fanDutyCycle'])
    status['ipAddr'] = ip_addr
    return status
