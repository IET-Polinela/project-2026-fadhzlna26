from django.shortcuts import render, redirect
from .models import Report
from .forms import ReportForm


# HOME
def home(request):
    return render(request, 'dhila_app/home.html')


# READ (halaman daftar laporan)
def list_report(request):
    reports = Report.objects.all()
    return render(request, 'dhila_app/list_report.html', {'reports': reports})


# CREATE
def add_report(request):
    if request.method == "POST":
        form = ReportForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('list_report')
    else:
        form = ReportForm()

    return render(request, 'dhila_app/add_report.html', {'form': form})


# UPDATE
def update_report(request, id):
    report = Report.objects.get(id=id)

    if request.method == "POST":
        form = ReportForm(request.POST, instance=report)
        if form.is_valid():
            form.save()
            return redirect('list_report')
    else:
        form = ReportForm(instance=report)

    return render(request, 'dhila_app/update_report.html', {'form': form})


# DELETE
def delete_report(request, id):
    report = Report.objects.get(id=id)
    report.delete()
    return redirect('list_report')