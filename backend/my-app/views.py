# from rest_framework import generics
# from .models import FishStock, Order, OrderItem, Sales, SaleItem
# from .serializers import FishStockSerializer,OrderSerializer,OrderItemSerializer,SalesSerializer,SaleItemSerializer
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Order, Sales, SaleItem, FishStock
# from .serializers import SalesSerializer
# from rest_framework.permissions import AllowAny
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.db.models import Sum, F
# class FishStockListView(generics.ListCreateAPIView):
#     queryset = FishStock.objects.all()
#     serializer_class = FishStockSerializer

# class FishStockDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = FishStock.objects.all()
#     serializer_class = FishStockSerializer

# class OrderListView(generics.ListCreateAPIView):
#     queryset = Order.objects.prefetch_related('items')
#     serializer_class = OrderItemSerializer

# class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Order.objects.prefetch_related('items')
#     serializer_class = OrderSerializer

# class SalesListView(generics.ListCreateAPIView):
#     queryset = Sales.objects.prefetch_related('items')
#     serializer_class = SalesSerializer

# class SalesDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Sales.objects.prefetch_related('items')
#     serializer_class = SaleItemSerializer

# class MoveOrderToSalesView(APIView):
#     def post(self, request, order_id):
#         try:
#             # Fetch the order and its items
#             order = Order.objects.prefetch_related('items').get(id=order_id)

#             # Check stock for each item in the order
#             for item in order.items.all():
#                 if item.quantity > item.fish.quantity:
#                     return Response(
#                         {"error": f"Not enough stock for {item.fish.name}"},
#                         status=status.HTTP_400_BAD_REQUEST
#                     )

#             # Create Sales object
#             sale = Sales.objects.create()

#             # Create SaleItems and update stock
#             for item in order.items.all():
#                 SaleItem.objects.create(
#                     sale=sale,
#                     fish=item.fish,
#                     quantity=item.quantity,
#                     price_per_unit=item.fish.price,
#                 )
#                 # Deduct stock
#                 item.fish.quantity -= item.quantity
#                 item.fish.save()

#             # Update order status (optional)
#             order.status = "completed"
#             order.save()

#             # Serialize and return the new Sales object
#             sale_serializer = SalesSerializer(sale)
#             return Response(sale_serializer.data, status=status.HTTP_201_CREATED)

#         except Order.DoesNotExist:
#             return Response(
#                 {"error": "Order not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return Response(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
        
# # Report for Stock Levels
# class StockReportView(APIView):
#     def get(self, request, *args, **kwargs):
#         # Get stock levels by category
#         stock_data = FishStock.objects.all().values('category').annotate(total_quantity=Sum('quantity'))
        
#         # Get items with low stock
#         low_stock_items = FishStock.objects.filter(quantity__lt=F('low_stock_threshold'))
        
#         # Get stock value based on the current price
#         stock_value = sum(item.quantity * item.price for item in FishStock.objects.all())
        
#         return Response({
#             'stock_data': stock_data,
#             'low_stock_items': FishStockSerializer(low_stock_items, many=True).data,
#             'stock_value': stock_value
#         })

# # Report for Sales
# class SalesReportView(APIView):
#     def get(self, request, *args, **kwargs):
#         start_date = request.GET.get('start_date')
#         end_date = request.GET.get('end_date')
        
#         # If the dates are provided, filter by date range
#         if start_date and end_date:
#             sales = Sales.objects.filter(sale_date__range=[start_date, end_date])
#         else:
#             sales = Sales.objects.all()
        
#         # Total revenue
#         total_revenue = sum(item.revenue for sale in sales for item in sale.items.all())
        
#         # Best selling items
#         best_selling_items = SaleItem.objects.filter(sale__sale_date__range=[start_date, end_date]) \
#             .values('fish__name').annotate(total_quantity=Sum('quantity')).order_by('-total_quantity')

#         return Response({
#             'total_revenue': total_revenue,
#             'best_selling_items': best_selling_items
#         })

# # Report for Orders by Status
# class OrderReportView(APIView):
#     def get(self, request, *args, **kwargs):
#         orders_by_status = Order.objects.all().values('status').annotate(total_orders=Sum('id'))
#         return Response({'orders_by_status': orders_by_status})

# # Report for Orders by Date Range
# class OrdersByDateReportView(APIView):
#     def get(self, request, *args, **kwargs):
#         start_date = request.GET.get('start_date')
#         end_date = request.GET.get('end_date')
        
#         if start_date and end_date:
#             orders = Order.objects.filter(order_date__range=[start_date, end_date])
#             orders_data = OrderSerializer(orders, many=True).data
#         else:
#             orders_data = OrderSerializer(Order.objects.all(), many=True).data
        
#         return Response({'orders': orders_data})
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, F
from .models import FishStock, Order, OrderItem, Sales, SaleItem
from .serializers import (
    FishStockSerializer,
    OrderSerializer,
    OrderItemSerializer,
    SalesSerializer,
    SaleItemSerializer
)

# List and create FishStock items
class FishStockListView(generics.ListCreateAPIView):
    queryset = FishStock.objects.all()
    serializer_class = FishStockSerializer

# Retrieve, update, delete a FishStock item
class FishStockDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FishStock.objects.all()
    serializer_class = FishStockSerializer

class OrderListView(generics.ListCreateAPIView):
    # queryset = Order.objects.prefetch_related('items')
    serializer_class = OrderSerializer
    def get_queryset(self):
        status_filter = self.request.query_params.get('status')
        queryset = Order.objects.all()
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset.prefetch_related('items')

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.prefetch_related('items')
    serializer_class = OrderItemSerializer

# List and create Sales
class SalesListView(generics.ListCreateAPIView):
    queryset = Sales.objects.prefetch_related('items__fish')
    serializer_class = SalesSerializer

# Retrieve, update, delete a specific Sale
class SalesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sales.objects.prefetch_related('items__fish')
    serializer_class = SalesSerializer

from django.db import transaction

class MoveOrderToSalesView(APIView):
    def post(self, request, order_id):
        try:
            with transaction.atomic():
                order = Order.objects.prefetch_related('items__fish').get(id=order_id)

                for item in order.items.all():
                    if item.quantity > item.fish.quantity:
                        return Response(
                            {"error": f"Not enough stock for {item.fish.name}"},
                            status=status.HTTP_400_BAD_REQUEST
                        )

                sale = Sales.objects.create()

                for item in order.items.all():
                    SaleItem.objects.create(
                        sale=sale,
                        fish=item.fish,
                        quantity=item.quantity,
                        price_per_unit=item.fish.price,
                    )
                    item.fish.quantity -= item.quantity
                    item.fish.save()

                order.status = "completed"
                order.save()

                sale_serializer = SalesSerializer(sale)
                return Response(sale_serializer.data, status=status.HTTP_201_CREATED)

        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Report: Stock levels and low stock items
class StockReportView(APIView):
    def get(self, request):
        # Aggregate stock by category
        stock_data = FishStock.objects.values('category').annotate(total_quantity=Sum('quantity'))

        # Items with low stock
        low_stock_items = FishStock.objects.filter(quantity__lt=F('low_stock_threshold'))

        # Calculate total stock value
        stock_value = sum(item.quantity * item.price for item in FishStock.objects.all())

        return Response({
            'stock_data': stock_data,
            'low_stock_items': FishStockSerializer(low_stock_items, many=True).data,
            'stock_value': stock_value
        })

# Report: Sales summary and best-sellers
class SalesReportView(APIView):
    def get(self, request):
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        # Filter sales by date range if provided
        if start_date and end_date:
            sales = Sales.objects.filter(sale_date__range=[start_date, end_date])
        else:
            sales = Sales.objects.all()

        # Calculate total revenue
        total_revenue = sum(item.revenue for sale in sales for item in sale.items.all())

        # Get best-selling items
        best_selling_items = SaleItem.objects.filter(sale__sale_date__range=[start_date, end_date]) \
            .values('fish__name') \
            .annotate(total_quantity=Sum('quantity')) \
            .order_by('-total_quantity')

        return Response({
            'total_revenue': total_revenue,
            'best_selling_items': list(best_selling_items)
        })

# Report: Orders by status
class OrderReportView(APIView):
    def get(self, request):
        orders_by_status = Order.objects.values('status').annotate(total_orders=Sum('id'))
        return Response({'orders_by_status': list(orders_by_status)})

# Orders within a date range
class OrdersByDateReportView(APIView):
    def get(self, request):
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        if start_date and end_date:
            orders = Order.objects.filter(order_date__range=[start_date, end_date])
        else:
            orders = Order.objects.all()
        orders_data = OrderSerializer(orders, many=True).data
        return Response({'orders': orders_data})