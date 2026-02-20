from celery import Celery
from datetime import timedelta
import os 

os.environ.setdefault('DJANGO_SETTINGS_MODULE','foodd.settings')
celery_app = Celery('foodd')
celery_app.autodiscover_tasks()

# RabbitMQ broker configuration
rabbitmq_host = os.environ.get('RABBITMQ_HOST', 'localhost')
rabbitmq_port = os.environ.get('RABBITMQ_PORT', '5672')
celery_app.conf.broker_url = f'amqp://{rabbitmq_host}:{rabbitmq_port}//'
celery_app.conf.result_backend = f'rpc://{rabbitmq_host}:{rabbitmq_port}//'
celery_app.conf.task_serializer = 'json'
celery_app.conf.result_serializer='pickle'
celery_app.conf.accept_content =['json','pickle']
celery_app.conf.result_expires = timedelta(days=1)
celery_app.conf.task_always_eager= False
celery_app.conf.worker_prefetch_multiplier = 2