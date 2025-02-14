from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import get_stock_data
from .stock_recommender import get_stock_recommendations_json
import logging


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
