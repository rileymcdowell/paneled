from collections import defaultdict
from ipaddress import ip_address
from panel_dashboard.flask_app import app
import panel_dashboard.state.actions as state_actions
from flask import jsonify, request
from panel_dashboard.ops import group_average
import panel_dashboard.panel_api as panel_api

@app.route('/api/v1/statetree', methods=['GET'])
def panel_statetree__get():
    panels = state_actions.get_panels()
    state_tree = defaultdict(dict)
    for panel in panels:
        status = state_actions.get_status(panel)
        group = status['group']
        state_tree[group][panel] = status
    return jsonify(state_tree)


@app.route('/api/v1/group', methods=['GET'])
def group__get():
    group_name = request.args['name']
    panels = state_actions.get_panels()
    panel_statuses = [state_actions.get_status(x) for x in panels]
    group_panels = [x for x in panel_statuses if x['group'] == group_name]

    to_return = group_average.average_panels(group_panels)
    to_return['name'] = group_name 

    return jsonify(to_return)


@app.route('/api/v1/panel', methods=['POST'])
def panel__post():
    new_config = request.get_json()
    # Not sure this is actually needed, since the IP uniquely identifies the panel.
    #previous_panel_config = new_config['previousPanelConfig']
    new_panel_config = new_config['proposedPanelConfig']
    ip_addr = new_panel_config['ipAddr']

    # Update our state
    state_actions.set_shadow(ip_addr, new_panel_config)
    
    return new_panel_config
