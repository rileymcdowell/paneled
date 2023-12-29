import panel_dashboard.panel_api as panel_api


def _is_close(a, b, tolerance=0.005):
    """
    Since the UI works in integers from 1 to 100 but the ESP32 PWM
    has a resolution of 1024, some values we will try to set will
    be approximately correct, and that's just fine. We need
    a function to check if things are approximately equal, or "close".

    Setting a tolerance of 0.005 would verify things are accurate to within
    1/2 a percent for a value of 1 to 100. That's plenty for this application.
    """

    return abs(a - b) < tolerance


async def sync_panel(current, desired):
    previous_panel_config = current
    new_panel_config = desired
    ip_addr = current['ipAddr']

    # Update the color
    for color in ('red', 'green', 'blue', 'white'):
        if not _is_close(previous_panel_config[color], new_panel_config[color]):
            value = new_panel_config[color]
            await panel_api.color.set_panel_color(ip_addr, color, value)

    # Update the name/group
    for ident in ('name', 'group'):
        if previous_panel_config[ident] != new_panel_config[ident]:
            value = new_panel_config[ident]
            await panel_api.ident.set_ident(ip_addr, ident, value)

    # Update the fan speed
    if not _is_close(previous_panel_config['fan'], new_panel_config['fan']):
        value = new_panel_config['fan']
        await panel_api.fan.set_fan_pct(ip_addr, value)
