from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings
# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('core')

# Using a string here means the worker will not have to serialize
# the configuration object to child processes.
app.config_from_object(settings, namespace='CELERY')

# Use Django database as result backend

# Celery Beat Settings
app.conf.beat_schedule = {
    'delete-notifications-every-month': {
        'task': 'notification.tasks.delete_all_notifications',
        'schedule': crontab(minute=0),
        # 'schedule': crontab(0, 0, day_of_month='1'),
    },
}

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')