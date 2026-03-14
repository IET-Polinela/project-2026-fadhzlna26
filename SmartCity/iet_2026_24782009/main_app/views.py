from django.shortcuts import render

def home(request):
    return render(request, 'dhila_app/home.html')