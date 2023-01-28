import requests
import panel_dashboard.ops.calibration as calibration

_STATUS_TIMEOUT = 10 # Seconds

def get_panel_status(ip_addr):
    status = requests.get(f"http://{ip_addr}/status", timeout=_STATUS_TIMEOUT).json()
    status['red'] = calibration.duty_cycle_to_pct('red', status['redDutyCycle']) 
    status['green'] = calibration.duty_cycle_to_pct('green', status['greenDutyCycle']) 
    status['blue'] = calibration.duty_cycle_to_pct('blue', status['blueDutyCycle']) 
    status['white'] = calibration.duty_cycle_to_pct('white', status['whiteDutyCycle']) 
    status['fan'] = calibration.duty_cycle_to_pct('fan', status['fanDutyCycle']) 
    status['ipAddr'] = ip_addr
    return status
