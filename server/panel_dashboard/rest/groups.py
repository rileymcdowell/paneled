from flask import jsonify, request
from panel_dashboard.flask_app import app
import panel_dashboard.state.actions as state_actions
from panel_dashboard.ops import group_average
import asyncio


@app.route("/api/v1/group", methods=["GET"])
async def group__get():
    group_name = request.args["name"]
    panels = state_actions.get_panels()
    panel_statuses = [state_actions.get_status(x) for x in panels]
    group_panels = [x for x in panel_statuses if x["group"] == group_name]

    to_return = group_average.average_panels(group_panels)
    to_return["name"] = group_name

    return jsonify(to_return)


@app.route("/api/v1/group", methods=["POST"])
async def group__post():
    """
    Apply the proposed configuration to any selected panels

    Note that while a configuration option may appear unchanged
    between the previous config and the proposed config, this is
    misleading. The proposal is an average of all panels, so
    a POST to this endpoint should apply that "average" to all
    panels in the group bringing a heterogenous state into a
    homogenous state.
    """
    config = request.get_json()
    # This is available from the frontend, but not really needed right now.
    #previous_config = config['previousGroupConfig']
    proposed_config = config['proposedGroupConfig']
    group_name = proposed_config["group"]

    panels = state_actions.get_panels()
    panel_statuses = [state_actions.get_status(x) for x in panels]
    group_panels = [x for x in panel_statuses if x["group"] == group_name]

    to_await = []

    for panel in group_panels:
        current_shadow = state_actions.get_shadow(panel['ipAddr'])
        # There are things in the proposed group config that don't belong in
        # individual panel config (such as the number of panels in the group).
        # This filter makes sure we synchronize state that makes sense for a
        # panel.
        applicable_config = {k:v for k,v in proposed_config.items() if k in current_shadow}
        new_shadow = current_shadow | applicable_config
        to_await.append(state_actions.set_shadow(panel['ipAddr'], new_shadow))

    # This way we can asynchronously set all the panels' statuses.
    await asyncio.gather(*to_await)

    return jsonify(proposed_config)