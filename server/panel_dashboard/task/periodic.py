import asyncio
from httpx import ConnectError
from asgiref.sync import async_to_sync
from panel_dashboard.celery_app import app
from panel_dashboard.discovery.panel_discovery import discover_panel_ips
from panel_dashboard.panel_api.status import get_panel_status
from panel_dashboard.state.actions import confirm_panel

async def _get_status_and_confirm(panel_ip):
    # TODO: What happens if panel goes offline?
    try:
        status = await get_panel_status(panel_ip)
        await confirm_panel(panel_ip, status)
    except ConnectError:
        # That panel we discovered probably got turned off, so just keep going.
        pass


@app.task
def discover_panels():
    results = []
    for panel_ip in discover_panel_ips():
        # Get the status of all current panels. This implicitly synchronizes
        # the state of the panel with the state in the backing store.
        results.append(_get_status_and_confirm(panel_ip))

    # TODO: Celery 6.0 might support async directly. For now, we need
    # to use asgiref to interop celery to the async stuff.
    async_to_sync(asyncio.gather)(*results)
