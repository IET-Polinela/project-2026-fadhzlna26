from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
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


# Helper untuk otorisasi admin
class AdminPermissionMixin:
    def _is_admin_user(self, user):
        return user.is_authenticated and (
            getattr(user, 'is_admin', False)
            or user.is_staff
            or user.is_superuser
        )


# CREATE
class ReportCreateView(AdminPermissionMixin, CreateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'dhila_app/add_report.html'
    success_url = reverse_lazy('report_list')

    def dispatch(self, request, *args, **kwargs):
        if not self._is_admin_user(request.user):
            messages.error(request, "Akses Ditolak! Hanya admin yang bisa menambah laporan.")
            return redirect('report_list')
        return super().dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        messages.success(self.request, "✅ Laporan berhasil ditambahkan!")
        return super().form_valid(form)


# UPDATE
class ReportUpdateView(AdminPermissionMixin, UpdateView):
    model = Report
    fields = ['title', 'category', 'description', 'location']
    template_name = 'dhila_app/update_report.html'
    success_url = reverse_lazy('report_list')

    def dispatch(self, request, *args, **kwargs):
        if not self._is_admin_user(request.user):
            messages.error(request, "Akses Ditolak! Hanya admin yang dapat mengubah laporan.")
            return redirect('report_list')
        return super().dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        messages.info(self.request, "✏️ Laporan berhasil diperbarui!")
        return super().form_valid(form)


# DELETE
class ReportDeleteView(AdminPermissionMixin, DeleteView):
    model = Report
    success_url = reverse_lazy('report_list')

    def dispatch(self, request, *args, **kwargs):
        if not self._is_admin_user(request.user):
            messages.error(request, "Akses Ditolak! Hanya admin yang dapat menghapus laporan.")
            return redirect('report_list')
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        messages.success(request, "🗑️ Laporan berhasil dihapus!", extra_tags='danger')
        self.object.delete()
        return redirect(self.success_url)


# UPDATE STATUS
class ReportUpdateStatusView(AdminPermissionMixin, View):

    def dispatch(self, request, *args, **kwargs):
        if not self._is_admin_user(request.user):
            messages.error(request, "Akses Ditolak! Hanya admin yang dapat mengubah status laporan.")
            return redirect('report_list')
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, pk):
        report = get_object_or_404(Report, pk=pk)
        new_status = request.POST.get('status')

        report.status = new_status
        report.save()

        messages.warning(request, f"⚙️ Status diubah menjadi {new_status}!")

        return redirect('report_list')