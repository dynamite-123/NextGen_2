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
]

