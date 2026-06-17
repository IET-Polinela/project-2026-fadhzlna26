from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from usermanagement_24782009.api_views import RegisterView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django_scalar.views import scalar_viewer


def welcome(request):
    return HttpResponse("<h1> Selamat Datang Fadhila Azliana")


urlpatterns = [
    path('', include('main_app.urls')),
    path('admin/', admin.site.urls),
    path('welcome/', welcome),
    path('about/', include('about.urls')),
    path('contacts/', include('contacts.urls')),
    path('', include('usermanagement_24782009.urls')),
    path('dashboard/', include('dashboard_24782009.urls')),

    # API utama
    path('api/', include('main_app.api_urls')),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='api_register'),

    # OpenAPI Schema
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Swagger UI
    path(
        'api/docs/swagger/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui'
    ),

    # Scalar UI
    path('api/docs/scalar/', scalar_viewer, name='scalar-ui'),
]