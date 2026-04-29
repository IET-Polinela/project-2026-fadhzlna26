from django.views.generic import TemplateView
from django.http import JsonResponse
from main_app.models import Report
from django.db.models import Count


class DashboardView(TemplateView):
    template_name = 'dashboard/dashboard.html'


def dashboard_data(request):
    # Data status
    status_data = Report.objects.values('status').annotate(total=Count('id'))

    # Data kategori
    category_data = Report.objects.values('category').annotate(total=Count('id'))

    return JsonResponse({
        'status': list(status_data),
        'category': list(category_data),
    })