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


urlpatterns = [
    path("auth/", auth),
    path("main/", main),
    path("rooms/", rooms),
    path("main/<int:pk>/", music),
    path("room/<int:pk>/", room),
    path("profile/<int:pk>/", profile),
    path("friends/<int:pk>/", friends),
    path("", start),
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
