import os
from panel_dashboard.constants import DEFAULT_CELERY_BROKER_URL

broker_url = os.environ.get("REDIS_URL", DEFAULT_CELERY_BROKER_URL)
imports = ('panel_dashboard.task.periodic',)

_SECOND = 1.0
_DISCOVER_PANEL_QUERY_INTERVAL = 60 * _SECOND

beat_schedule = { 
    'refresh_panel_list': {
        'task': 'panel_dashboard.task.periodic.discover_panels',
        'schedule': _DISCOVER_PANEL_QUERY_INTERVAL,
    }
}