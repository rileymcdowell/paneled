_RGB_MAX_DUTY_CYCLE = 1024
_FAN_MAX_DUTY_CYCLE = 256


def _red_duty_cycle_to_pct(duty_cycle):
    # TODO: calibrate red color intensity
    return duty_cycle / _RGB_MAX_DUTY_CYCLE 

def _green_duty_cycle_to_pct(duty_cycle):
    # TODO: calibrate green color intensity
    return duty_cycle / _RGB_MAX_DUTY_CYCLE 

def _blue_duty_cycle_to_pct(duty_cycle):
    # TODO: calibrate blue color intensity
    return duty_cycle / _RGB_MAX_DUTY_CYCLE 

def _fan_duty_cycle_to_pct(duty_cycle):
    return duty_cycle / _FAN_MAX_DUTY_CYCLE 

def duty_cycle_to_pct(name, duty_cycle):
    if name == 'red': 
        return _red_duty_cycle_to_pct(duty_cycle)
    elif name == 'green':
        return _green_duty_cycle_to_pct(duty_cycle)
    elif name == 'blue':
        return _blue_duty_cycle_to_pct(duty_cycle)
    elif name == 'fan':
        return _fan_duty_cycle_to_pct(duty_cycle)