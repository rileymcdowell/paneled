import panel_dashboard.panel_api as panel_api

def sync_panel(current, desired):
    previous_panel_config = current 
    new_panel_config = desired 
    ip_addr = current['ipAddr']

    # Update the color
    for color in ('red', 'green', 'blue', 'white'):
        if previous_panel_config[color] != new_panel_config[color]:
            value = new_panel_config[color]
            panel_api.color.set_panel_color(ip_addr, color, value)

    # Update the name/group
    for ident in ('name', 'group'):
        if previous_panel_config[ident] != new_panel_config[ident]:
            value = new_panel_config[ident]
            panel_api.ident.set_ident(ip_addr, ident, value)

    # Update the fan speed
    if previous_panel_config['fan'] != new_panel_config['fan']:
        value = new_panel_config['fan']
        panel_api.fan.set_fan_pct(ip_addr, value)
