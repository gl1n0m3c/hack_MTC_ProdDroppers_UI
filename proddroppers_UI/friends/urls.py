from django.urls import path

from friends.views import friends


urlpatterns = [
    path(
        "list/<int:pk>/",
        friends,
    ),
]
