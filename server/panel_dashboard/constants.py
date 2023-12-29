import os
import httpx


# Convert the redis host and port to a base url.
_REDIS_URL = f"redis://{os.environ.get('REDIS_HOST_PORT')}"

# The state db gets Redis DB 0
REDIS_STATE_BACKEND_URL = f"{_REDIS_URL}/0"
# Celery message broker gets Redis DB 1
REDIS_CELERY_BROKER_URL = f"{_REDIS_URL}/1"

# How long to wait for http requests.
HTTP_TIMEOUT_S = 5

# An http client supporting async calls to be shared across requests
HTTP_CLIENT = httpx.AsyncClient(timeout=HTTP_TIMEOUT_S)