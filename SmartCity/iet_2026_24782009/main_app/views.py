from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from django.shortcuts import get_object_or_404, redirect
from .models import Report


# HOME
class HomeView(TemplateView):
    template_name = 'dhila_app/home.html'


# READ → ListView
class ReportListView(ListView):
    model = Report
    template_name = 'dhila_app/list_report.html'
    context_object_name = 'reports'


# DETAIL
class ReportDetailView(DetailView):
    model = Report
    template_name = 'dhila_app/detail_report.html'
    context_object_name = 'report'


# CREATE → CreateView
class ReportCreateView(CreateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'dhila_app/add_report.html'
    success_url = reverse_lazy('report_list')


# UPDATE → UpdateView
class ReportUpdateView(UpdateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'dhila_app/update_report.html'
    success_url = reverse_lazy('report_list')


# DELETE → DeleteView
class ReportDeleteView(DeleteView):
    model = Report
    template_name = 'dhila_app/delete_report.html'
    success_url = reverse_lazy('report_list')


class ReportUpdateStatusView(View):
    def post(self, request, pk):
        report = get_object_or_404(Report, pk=pk)
        new_status = request.POST.get('status')
        report.status = new_status
        report.save()
        return redirect('report_list')