import requests

def set_name(ip_addr, name):
    requests.post(f"http://{ip_addr}/name", json={"name": name})

def set_group(ip_addr, group):
    requests.post(f"http://{ip_addr}/group", json={"group": group})