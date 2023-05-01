_RGBW_MAX_DUTY_CYCLE = 1024
_FAN_MAX_DUTY_CYCLE = 256


def _color_duty_cycle_to_pct(duty_cycle):
    return duty_cycle / _RGBW_MAX_DUTY_CYCLE 

def _fan_duty_cycle_to_pct(duty_cycle):
    return duty_cycle / _FAN_MAX_DUTY_CYCLE 

def _color_pct_to_duty_cycle(pct):
    return pct * 255 * 4

def _fan_pct_to_duty_cycle(pct):
    return pct * 255

def duty_cycle_to_pct(name, duty_cycle):
    if name in ('red', 'green', 'blue', 'white'): 
        return _color_duty_cycle_to_pct(duty_cycle)
    elif name == 'fan':
        return _fan_duty_cycle_to_pct(duty_cycle)
    
def pct_to_duty_cycle(name, pct):
    if name in ('red', 'green', 'blue', 'white'): 
        return _color_pct_to_duty_cycle(pct)
    elif name == 'fan':
        return _fan_pct_to_duty_cycle(pct)