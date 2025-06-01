# from rest_framework import serializers
# from .models import FishStock, Order, OrderItem, Sales, SaleItem

# class FishStockSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FishStock
#         fields = '__all__'


# class OrderItemSerializer(serializers.ModelSerializer):
#     fish = FishStockSerializer(read_only=True)
#     fish_id = serializers.PrimaryKeyRelatedField(
#         queryset=FishStock.objects.all(), source='fish', write_only=True
#     )

#     class Meta:
#         model = OrderItem
#         fields = ['id', 'fish', 'fish_id', 'quantity']


# class OrderSerializer(serializers.ModelSerializer):
#     items = OrderItemSerializer(many=True, read_only=True)
#     item_details = OrderItemSerializer(many=True, write_only=True)

#     class Meta:
#         model = Order
#         fields = ['id', 'order_date', 'delivery_date', 'items', 'item_details']

#     def create(self, validated_data):
#         item_details = validated_data.pop('item_details')
#         order = Order.objects.create(**validated_data)
#         for item in item_details:
#             OrderItem.objects.create(order=order, **item)
#         return order



# class SaleItemSerializer(serializers.ModelSerializer):
#     fish = FishStockSerializer(read_only=True)
#     fish_id = serializers.PrimaryKeyRelatedField(
#         queryset=FishStock.objects.all(), source='fish', write_only=True
#     )

#     class Meta:
#         model = SaleItem
#         fields = ['id', 'fish', 'fish_id', 'quantity', 'price_per_unit', 'revenue']


# class SalesSerializer(serializers.ModelSerializer):
#     items = SaleItemSerializer(many=True, read_only=True)
#     item_details = SaleItemSerializer(many=True, write_only=True)

#     class Meta:
#         model = Sales
#         fields = ['id', 'sale_date', 'items', 'item_details']

#     def create(self, validated_data):
#         item_details = validated_data.pop('item_details')
#         sale = Sales.objects.create(**validated_data)
#         for item in item_details:
#             SaleItem.objects.create(sale=sale, **item)
#         return sale

from rest_framework import serializers
from .models import FishStock, Order, OrderItem, Sales, SaleItem

class FishStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = FishStock
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    fish = FishStockSerializer(read_only=True)
    fish_id = serializers.PrimaryKeyRelatedField(
        queryset=FishStock.objects.all(), source='fish', write_only=True
    )
    fishName = serializers.CharField(source='fish.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'fish', 'fish_id', 'fishName', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    item_details = OrderItemSerializer(many=True, write_only=True)
    orderDate = serializers.DateField(source='order_date', read_only=True) 
    deliveryDate = serializers.DateField(source='delivery_date', required=False)

    class Meta:
        model = Order
        fields = ['id', 'orderDate', 'deliveryDate', 'status', 'items', 'item_details']

    def create(self, validated_data):
        item_details = validated_data.pop('item_details')
        order = Order.objects.create(**validated_data)
        for item in item_details:
            OrderItem.objects.create(order=order, **item)
        return order


class SaleItemSerializer(serializers.ModelSerializer):
    fish = FishStockSerializer(read_only=True)
    fish_id = serializers.PrimaryKeyRelatedField(
        queryset=FishStock.objects.all(), source='fish', write_only=True
    )
    fishName = serializers.CharField(source='fish.name', read_only=True)
    revenue = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = SaleItem
        fields = ['id', 'fish', 'fish_id', 'fishName', 'quantity', 'price_per_unit', 'revenue']


class SalesSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True, read_only=True)
    item_details = SaleItemSerializer(many=True, write_only=True)
    saleDate = serializers.DateField(source='sale_date')
    source = serializers.CharField()

    class Meta:
        model = Sales
        fields = ['id', 'saleDate', 'items', 'item_details', 'source']

    def create(self, validated_data):
        item_details = validated_data.pop('item_details')
        source = validated_data.get('source', 'manual')
        sale = Sales.objects.create(**validated_data, source=source)
        for item in item_details:
            SaleItem.objects.create(sale=sale, **item)
        return sale