from django.http import JsonResponse
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.views.static import serve as django_static_serve
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from carson_app.views import ItemViewSet




def hello_view(request):
    return JsonResponse({'message': 'Hello from Django!'})

def serve_static(request, path, document_root=None, show_indexes=False):
    response = django_static_serve(request, path, document_root=document_root, show_indexes=show_indexes)
    if path.endswith('.js'):
        response['Content-Type'] = 'application/javascript'
    elif path.endswith('.css'):
        response['Content-Type'] = 'text/css'
    return response



router = routers.DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [

    path("api/hello/", hello_view),

    path("admin/", admin.site.urls),

    # API endpoints provided by djoser:
    path('auth/', include('djoser.urls')),  # Registration, password reset, etc.

    # JWT endpoints:
    path('auth/', include('djoser.urls.jwt')),

    # Optionally, include your other API endpoints:

    path('api/', include(router.urls)),

    # path('api/', include('carson_app.api_urls')),

    # Catch-all route for React (if serving React through Django)
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html")),
]

if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^static/(?P<path>.*)$', serve_static, {'document_root': settings.STATIC_ROOT}),
    ]


# ✅ Catch-all React frontend (must be last)
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html")),
]
