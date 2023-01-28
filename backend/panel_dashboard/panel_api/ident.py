import requests

def set_ident(ip_addr, ident, value):
    requests.post(f"http://{ip_addr}/{ident}", json={ident: value})

def set_name(ip_addr, name):
    set_ident(ip_addr, 'name', name)

def set_group(ip_addr, group):
    set_ident(ip_addr, 'group', group)