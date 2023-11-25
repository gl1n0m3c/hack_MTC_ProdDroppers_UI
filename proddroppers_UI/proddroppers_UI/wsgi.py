import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "proddroppers_UI.settings")

application = get_wsgi_application()
