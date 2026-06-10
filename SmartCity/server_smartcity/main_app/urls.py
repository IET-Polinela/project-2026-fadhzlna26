from django.urls import path
from .views import (
    HomeView,
    ReportListView,
    ReportDetailView,
    ReportCreateView,
    ReportUpdateView,
    ReportDeleteView,
    ReportUpdateStatusView
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('reports/', ReportListView.as_view(), name='report_list'),
    path('detail/<int:pk>/', ReportDetailView.as_view(), name='report_detail'),
    path('add/', ReportCreateView.as_view(), name='report_add'),
    path('update/<int:pk>/', ReportUpdateView.as_view(), name='report_update'),
    path('delete/<int:pk>/', ReportDeleteView.as_view(), name='report_delete'),
    path('update-status/<int:pk>/', ReportUpdateStatusView.as_view(), name='update_status'),
]