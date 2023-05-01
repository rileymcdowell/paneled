# The state db gets Redis DB 0
DEFAULT_STATE_BACKEND_HOST = "redis"
DEFAULT_STATE_BACKEND_PORT = 6379
DEFAULT_STATE_BACKEND_DB = 0

# Celery message broker gets Redis DB 1
DEFAULT_CELERY_BROKER_URL = "redis://redis:6379/1"