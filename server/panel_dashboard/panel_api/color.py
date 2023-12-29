import logging
import httpx
from panel_dashboard.ops.calibration import pct_to_duty_cycle
from panel_dashboard.constants import HTTP_CLIENT

_logger = logging.getLogger(__name__)

_VALID_COLORS = ['red', 'green', 'blue', 'white']
async def set_panel_color(ip_addr, color_name, color_value, retries=2):
    color_name = color_name.lower()
    assert color_name in _VALID_COLORS
    duty_cycle = pct_to_duty_cycle(color_name, color_value)
    try:
        await HTTP_CLIENT.post(f"http://{ip_addr}/{color_name}", json={color_name: duty_cycle})
    except httpx.ConnectTimeout:
        if retries > 0:
            _logger.warning(f"Connect Error on {ip_addr} for {color_name}={color_value}. Retrying...")
            return await set_panel_color(ip_addr, color_name, color_value, retries=retries-1)
        else:
            _logger.error(f"Failed to connect to {ip_addr} for {color_name}={color_value}.")
            raise


async def set_panel_red_pct(ip_addr, value):
    await set_panel_color(ip_addr, "red", value)

async def set_panel_green_pct(ip_addr, value):
    await set_panel_color(ip_addr, "green", value)

async def set_panel_blue_pct(ip_addr, value):
    await set_panel_color(ip_addr, "blue", value)

async def set_panel_white_pct(ip_addr, value):
    await set_panel_color(ip_addr, "white", value)
