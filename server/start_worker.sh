#!/bin/sh

# The command to start the celery task worker

celery \
    -A panel_dashboard.celery_app \
    worker \
    --beat \
    --concurrency=1 \
    --loglevel=INFO