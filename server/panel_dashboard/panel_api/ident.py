from panel_dashboard.constants import HTTP_CLIENT

async def set_ident(ip_addr, ident, value):
    await HTTP_CLIENT.post(f"http://{ip_addr}/{ident}", json={ident: value})

async def set_name(ip_addr, name):
    await set_ident(ip_addr, 'name', name)

async def set_group(ip_addr, group):
    await set_ident(ip_addr, 'group', group)