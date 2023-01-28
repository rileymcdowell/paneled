import requests
import panel_dashboard.ops.calibration as calibration

def get_panel_status(ip_addr):
    status = requests.get(f"http://{ip_addr}/status").json()
    status['red'] = calibration.duty_cycle_to_pct('red', status['redDutyCycle']) 
    status['green'] = calibration.duty_cycle_to_pct('green', status['greenDutyCycle']) 
    status['blue'] = calibration.duty_cycle_to_pct('blue', status['blueDutyCycle']) 
    status['fan'] = calibration.duty_cycle_to_pct('fan', status['fanDutyCycle']) 
    return status
