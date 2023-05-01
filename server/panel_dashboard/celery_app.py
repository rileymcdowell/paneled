from celery import Celery

app = Celery("panel_dashboard.task")
app.config_from_object('panel_dashboard.task.celeryconfig')
