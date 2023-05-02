import os


# Convert the redis host and port to a base url.
_REDIS_URL = f"redis://{os.environ.get('REDIS_HOST_PORT')}"

# The state db gets Redis DB 0
REDIS_STATE_BACKEND_URL = f"{_REDIS_URL}/0"
# Celery message broker gets Redis DB 1
REDIS_CELERY_BROKER_URL = f"{_REDIS_URL}/1"