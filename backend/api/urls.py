from django.urls import path
from .views import stock_quote_view, stock_recommendation_view
from . import views

urlpatterns = [
    path('stock/', stock_quote_view, name='stock-quote'),
    path('get-recommendations/', stock_recommendation_view, name='get-recommendation'),
]