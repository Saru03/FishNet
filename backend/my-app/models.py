from django.db import models
from django.forms import ValidationError

class FishStock(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=[('Freshwater', 'Freshwater'), ('Saltwater', 'Saltwater')])
    quantity = models.IntegerField()
    date_added = models.DateField(null=True, blank=True)
    low_stock_threshold = models.IntegerField(default=10)
    cold_storage = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Current market price
    description = models.TextField(blank=True)

    def update_quantity(self, amount):
        self.quantity += amount
        self.save()

    def is_low_stock(self):
        return self.quantity < self.low_stock_threshold
    
    def __str__(self):
        return self.name

class Order(models.Model):
    order_date = models.DateField(auto_now_add=True)
    delivery_date = models.DateField()

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Order #{self.id} on {self.order_date}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    fish = models.ForeignKey(FishStock, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def clean(self):
        if self.quantity > self.fish.quantity:
            raise ValidationError(f"Not enough stock available for {self.fish.name}")

    def __str__(self):
        return f"{self.quantity} of {self.fish.name} for Order #{self.order.id}"


class Sales(models.Model):
    sale_date = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=50, default='manual')  # e.g., 'manual', 'order', 'middle_men'

    def __str__(self):
        return f"Sale #{self.id} on {self.sale_date}"
    
    @property
    def total_revenue(self):
        return sum(item.revenue for item in self.items.all())


class SaleItem(models.Model):
    sale = models.ForeignKey(Sales, related_name='items', on_delete=models.CASCADE)
    fish = models.ForeignKey(FishStock, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price_per_unit = models.FloatField()

    @property
    def revenue(self):
        return self.quantity * self.price_per_unit
    
    def __str__(self):
        return f"{self.quantity} of {self.fish.name} for Sale #{self.sale.id}"
    
  