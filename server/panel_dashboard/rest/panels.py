from collections import defaultdict
from panel_dashboard.flask_app import app
import panel_dashboard.state.actions as state_actions
from flask import jsonify, request


@app.route('/api/v1/statetree', methods=['GET'])
def panel_statetree__get():
    panels = state_actions.get_panels()
    state_tree = defaultdict(dict)
    for panel in panels:
        status = state_actions.get_status(panel)
        group = status['group']
        state_tree[group][panel] = status
    return jsonify(state_tree)


@app.route('/api/v1/shadowtree', methods=['GET'])
def panel_shadowtree__get():
    panels = state_actions.get_panels()
    shadow_tree = defaultdict(dict)
    for panel in panels:
        status = state_actions.get_shadow(panel)
        group = status['group']
        shadow_tree[group][panel] = status
    return jsonify(shadow_tree)


@app.route('/api/v1/panel', methods=['POST'])
def panel__post():
    new_config = request.get_json()
    # Not sure this is actually needed, since the IP uniquely identifies the panel.
    new_panel_config = new_config['proposedPanelConfig']
    ip_addr = new_panel_config['ipAddr']

    # Update our state
    state_actions.set_shadow(ip_addr, new_panel_config)
    
    return jsonify(new_panel_config)
