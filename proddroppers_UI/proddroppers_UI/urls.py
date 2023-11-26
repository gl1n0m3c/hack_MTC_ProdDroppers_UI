from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from proddroppers_UI.views import (
    auth,
    friends,
    main,
    music,
    profile,
    room,
    rooms,
    start,
)


app_name = "main"

urlpatterns = [
    path("auth/", auth, name="auth"),
    path("main/", main, name="main"),
    path("rooms/", rooms, name="rooms"),
    path("music/<int:pk>/", music, name="music"),
    path("room/<int:pk>/", room, name="room"),
    path("profile/<int:pk>/", profile, name="profile"),
    path("friends/<int:pk>/", friends, name="friends"),
    path("", start, name="start"),
    path("admin/", admin.site.urls),
]


if settings.DEBUG:
    import debug_toolbar

    urlpatterns += (path("__debug__/", include(debug_toolbar.urls)),)

    if settings.MEDIA_ROOT:
        urlpatterns += static(
            settings.MEDIA_URL,
            document_root=settings.MEDIA_ROOT,
        )
