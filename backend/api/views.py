from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from .utils import get_stock_data
from .stock_recommender import get_stock_recommendations_json
import logging
from .models import User
from .serializers import (
    UserCreateSerializer,
    LoginSerializer,
    UserUpdateSerializer,
    UserListSerializer,
    UserSerializer,
)


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
