import requests
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from .utils import get_stock_data, get_nse_top_gainers, get_nse_top_losers, get_stock_news
from .stock_recommender import get_stock_recommendations_json
import logging
from .models import User, NSECompany, LikedStock
from .serializers import (
    UserCreateSerializer,
    LoginSerializer,
    UserUpdateSerializer,
    UserListSerializer,
    UserSerializer,
    NSECompanySerializer,
    ChangePasswordSerializer,
    LikedStockSerializer,
    AddLikedStockSerializer,
)
from .get_news import get_all_news
from .sentiment_analysis import FinancialSentimentAnalyzer


class IsAdminOrSuperuser(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and (request.user.is_staff or request.user.is_superuser)
        )


@api_view(["GET"])
def stock_quote_view(request):
    symbol = request.GET.get("symbol")  # Get stock symbol from query parameters

    if not symbol:
        return Response(
            {"error": "Stock symbol is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        data = get_stock_data(symbol)

        if not data:
            return Response(
                {"error": "No data found for this stock."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def stock_recommendation_view(request):
    """
    API endpoint to get stock recommendations based on investment criteria
    """
    # Extract parameters from request data
    try:
        investment_amount = float(request.data.get("investment_amount", 0))
        investment_duration = int(request.data.get("investment_duration", 0))
        market_cap = request.data.get("market_cap", "")
        sector = request.data.get("sector", "")
        risk_tolerance = request.data.get("risk_tolerance", "")

        # Validate inputs
        if not all(
            [investment_amount, investment_duration, market_cap, sector, risk_tolerance]
        ):
            return Response(
                {
                    "error": "All parameters are required: investment_amount, investment_duration, market_cap, sector, risk_tolerance"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Get recommendations
        recommendations = get_stock_recommendations_json(
            investment_amount, investment_duration, market_cap, sector, risk_tolerance
        )

        return Response(recommendations, status=status.HTTP_200_OK)

    except ValueError as e:
        return Response(
            {"error": f"Invalid parameter values: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        logging.error(f"Error in stock_recommendation_view: {str(e)}")
        return Response(
            {"error": "Failed to generate recommendations"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "phone_number": user.phone_number,
                        },
                        "tokens": {
                            "refresh": str(refresh),
                            "access": str(refresh.access_token),
                        },
                    },
                    status=status.HTTP_201_CREATED,
                )
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data["username"],
                password=serializer.validated_data["password"],
            )
            if user:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "phone_number": user.phone_number,
                        },
                    }
                )
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserManageView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, pk):
        User = get_user_model()
        user = get_object_or_404(User, id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = request.user
        try:
            user.delete()
            return Response(
                {"message": "User deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except ObjectDoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    # permission_classes = [IsAdminOrSuperuser]
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        try:
            users = self.get_queryset()
            serializer = self.get_serializer(users, many=True)
            return Response(
                {"count": users.count(), "users": serializer.data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class NSECompanyFilterView(APIView):
    def get(self, request, *args, **kwargs):
        symbol_prefix = request.query_params.get('symbol', None)  # Get the symbol query parameter
        company_dict = {}
        if symbol_prefix:
            # Filter companies whose symbol starts with the provided prefix (case insensitive)
            companies = NSECompany.objects.filter(symbol__istartswith=symbol_prefix)[:5]
            
            symbols = []
            for comp in companies:
                symbols.append(comp.symbol)
            
            return Response(symbols, status=status.HTTP_200_OK)
        
        return Response({"detail": "Symbol parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET"])
def gainers_and_losers(request, *args, **kwargs):

    try:
        data = {}
        data['top_gainers'] = get_nse_top_gainers()
        data['top_losers'] = get_nse_top_losers()

        if not data:
            return Response(
                {"error": "No data found for this stock."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def stock_news(request):
    symbol = request.GET.get("symbol")

    if not symbol:
        return Response(
            {"error": "Stock symbol is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        data = get_stock_news(symbol)
        if not data:
            return Response(
                {"error": "No data found for this stock."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response({
            "news": data
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def nifty50_chart(request, *args, **kwargs):
    url = "https://query1.finance.yahoo.com/v8/finance/chart/^NSEI?interval=1d&range=1mo"
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()  # Parse JSON response
        return Response(data, status=status.HTTP_200_OK)
    else:
        print("Failed to fetch data:", response.status_code)

 
@api_view(["GET"])
def sentiments_view(request, *arg, **args):
    symbol = request.GET.get("symbol")  # Get stock symbol from query parameters

    if not symbol:
        return Response(
            {"error": "Stock symbol is required."}, status=status.HTTP_400_BAD_REQUEST
        )
    
    news_list = get_all_news(symbol)

    try:
        analyzer = FinancialSentimentAnalyzer()
        results = analyzer.analyze_headlines(news_list)
        return Response(results, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#liking a stock

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_liked_stock(request):
    serializer = AddLikedStockSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Stock added to liked list"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def user_liked_stocks(request):
    liked_stocks_by_user = {}

    users = User.objects.prefetch_related('liked_stocks').all()

    for user in users:
        liked_stocks_by_user[user.id] = [stock.stock_symbol for stock in user.liked_stocks.all()]

    return JsonResponse(liked_stocks_by_user,safe=False)
