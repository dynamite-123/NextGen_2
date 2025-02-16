from django.urls import path
from .views import (
    stock_quote_view,
    stock_recommendation_view,
    UserCreateView,
    LoginView,
    # UserUpdateView,
    # UserDeleteView,
    UserListView,
    # get_user_by_id,
    UserManageView,
    gainers_and_losers,
    stock_news,
    NSECompanyFilterView,
    nifty50_chart,
    sentiments_view,
    ChangePasswordView,
    add_liked_stock,
    user_liked_stocks,
)

urlpatterns = [
    path("stock/", stock_quote_view, name="stock-quote"),
    path("get-recommendations/", stock_recommendation_view, name="get-recommendation"),
    path("user/register/", UserCreateView.as_view(), name="register"),
    path("user/login/", LoginView.as_view(), name="login"),
    path("user/<int:pk>/", UserManageView.as_view(), name="user-manage"),
    path('users/', UserListView.as_view(), name='user-list'),
    path('gainers-and-losers/', gainers_and_losers, name='gainers-and-losers'),
    path('stock-news/', stock_news, name='stock-news'),
    path('stock-suggestions/', NSECompanyFilterView.as_view(), name='stock-suggestions'),
    path('nifty50-chart/', nifty50_chart, name='nifty50-chart'),
    path('sentiments/', sentiments_view, name='sentiments'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('liked-stocks/',user_liked_stocks, name='user-linked-stocks'),
    path('add-liked-stocks/',add_liked_stock, name='add-liked-stocks'),

]

