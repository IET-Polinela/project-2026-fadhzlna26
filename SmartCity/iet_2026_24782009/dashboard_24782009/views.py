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

    reported = list(
        Report.objects.filter(status='REPORTED')
        .order_by('-id')[:5]
        .values('title', 'category', 'status')
    )

    resolved = list(
        Report.objects.filter(status='RESOLVED')
        .order_by('-id')[:5]
        .values('title', 'category', 'status')
    )

    return JsonResponse({
        'status': list(status_data),
        'category': list(category_data),
        'reported': reported,
        'resolved': resolved,
    })