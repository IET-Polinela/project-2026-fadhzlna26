from django.shortcuts import render

def contacts(request):
    return render(request, 'dhila_app/contacts.html')