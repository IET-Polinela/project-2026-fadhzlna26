from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def welcome(request):
    return HttpResponse("<h1> Selamat Datang Fadhila Azliana")

urlpatterns = [
    path('', include('main_app.urls')),   # HOME
    path('admin/', admin.site.urls),
    path('welcome/', welcome),
    path('about/', include('about.urls')),
    path('contacts/', include('contacts.urls')),
    path('', include('usermanagement_24782009.urls')),
    path('dashboard/', include('dashboard_24782009.urls')),
    path('api/', include('main_app.api_urls')),
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]