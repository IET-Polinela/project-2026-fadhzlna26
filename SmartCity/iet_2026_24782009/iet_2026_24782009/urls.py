from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

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
]