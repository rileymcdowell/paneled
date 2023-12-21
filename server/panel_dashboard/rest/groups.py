from flask import jsonify, request
from panel_dashboard.flask_app import app
import panel_dashboard.state.actions as state_actions
from panel_dashboard.ops import group_average


@app.route("/api/v1/group", methods=["GET"])
def group__get():
    group_name = request.args["name"]
    panels = state_actions.get_panels()
    panel_statuses = [state_actions.get_status(x) for x in panels]
    group_panels = [x for x in panel_statuses if x["group"] == group_name]

    to_return = group_average.average_panels(group_panels)
    to_return["name"] = group_name 

    return jsonify(to_return)


@app.route("/api/v1/group", methods=["POST"])
def group__post():
    config = request.get_json()
    previous_config = config['previousGroupConfig']
    proposed_config = config['proposedGroupConfig']
    group_name = proposed_config["group"]

    panels = state_actions.get_panels()
    panel_statuses = [state_actions.get_status(x) for x in panels]
    group_panels = [x for x in panel_statuses if x["group"] == group_name]

    changed_keys = [k for k in proposed_config if previous_config[k] != proposed_config[k]]
    changes = {k:v for k, v in proposed_config.items() if k in changed_keys}

    for panel in group_panels:
        current_shadow = state_actions.get_shadow(panel['ipAddr'])
        new_shadow = current_shadow | changes
        state_actions.set_shadow(panel['ipAddr'], new_shadow)

    return jsonify(proposed_config) 