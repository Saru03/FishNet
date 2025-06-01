from django.urls import path
from .views import (
    FishStockListView,
    FishStockDetailView,
    OrderListView,
    OrderDetailView,
    SalesListView,
    SalesDetailView,
    MoveOrderToSalesView,
    StockReportView,
    SalesReportView,
    OrderReportView,
    OrdersByDateReportView
)

urlpatterns = [
    path('fishstock/', FishStockListView.as_view(), name='fishstock-list'),
    path('fishstock/<int:pk>/', FishStockDetailView.as_view(), name='fishstock-detail'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('sales/', SalesListView.as_view(), name='sales-list'),
    path('sales/<int:pk>/', SalesDetailView.as_view(), name='sales-detail'),
    path('orders/<int:order_id>/convert-to-sale/', MoveOrderToSalesView.as_view(), name='convert-order-to-sale'),
    # Reports
    path('reports/stock/', StockReportView.as_view(), name='stock-report'),
    path('reports/sales/', SalesReportView.as_view(), name='sales-report'),
    path('reports/orders/', OrderReportView.as_view(), name='orders-by-status'),
    path('reports/orders-by-date/', OrdersByDateReportView.as_view(), name='orders-by-date'),
]