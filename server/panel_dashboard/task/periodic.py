from requests.exceptions import ConnectionError
from panel_dashboard.celery_app import app
from panel_dashboard.discovery.panel_discovery import discover_panel_ips 
from panel_dashboard.panel_api.status import get_panel_status
from panel_dashboard.state.actions import confirm_panel

@app.task
def discover_panels():
    for panel_ip in discover_panel_ips():
        try:
            # TODO: What happens if panel goes offline?
            # Get the status of all current panels
            status = get_panel_status(panel_ip)
            confirm_panel(panel_ip, status)
        except ConnectionError:
            # That panel we discovered probably got turned off, so just keep going.
            continue
