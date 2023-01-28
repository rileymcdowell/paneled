import requests

def set_fan_speed(ip_addr, speed):
    requests.post(f"http://{ip_addr}/fan", json={"fan": speed})