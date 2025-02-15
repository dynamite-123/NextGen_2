from yahooquery import Ticker
import json
import pandas as pd
import numpy as np
import yfinance as yf 
import requests
from dotenv import load_dotenv
import os

class CustomFloatStr(float):
    def __repr__(self):
        return str(self)


def handle_nan_values(obj):
    if isinstance(obj, dict):
        return {key: handle_nan_values(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [handle_nan_values(item) for item in obj]
    elif isinstance(obj, (float, np.float64)):
        if np.isnan(obj) or np.isinf(obj):
            return None
        return CustomFloatStr(obj)
    return obj


def get_balance_sheet(symbol, *args, **kwargs):
    stock = Ticker(symbol)
    balance_sheet = stock.balance_sheet()

    balance_sheet_fields = [
        "currencyCode",
        "asOfDate",
        "CurrentAssets",
        "TotalAssets",
        "LongTermDebt",
        "CurrentDebt",
        "TotalDebt",
        "StockholdersEquity",
        "TotalCapitalization",
    ]
    # Get last 5 rows
    last_few_rows = balance_sheet.tail(5)

    json_data = last_few_rows.apply(
        lambda x: x.apply(
            lambda v: (
                str(v) if isinstance(v, pd.Timestamp) else None if pd.isna(v) else v
            )
        )
    ).to_dict("records")

    formatted_json = json.dumps(json_data, indent=4)
    balance_sheet_data = json.loads(formatted_json)

    data = handle_nan_values(
        [
            {key: value for key, value in data.items() if key in balance_sheet_fields}
            for data in balance_sheet_data
        ]
    )

    return data


def get_cash_flow(symbol, *args, **kwargs):

    stock = Ticker(symbol)
    cash_flow = stock.cash_flow()

    cash_flow_fields = [
        "asOfDate",
        "currencyCode",
        "OperatingCashFlow",
        "InvestingCashFlow",
        "FinancingCashFlow",
        "NetIncome",
    ]

    last_few_rows = cash_flow.tail(5)
    cash_flow_data = last_few_rows.apply(
        lambda x: x.apply(
            lambda v: (
                str(v)
                if isinstance(v, pd.Timestamp)
                else (
                    None
                    if pd.isna(v)
                    else float(v) if isinstance(v, (float, np.float64)) else v
                )
            )
        )
    ).to_dict("records")

    data = handle_nan_values(
        [
            {key: value for key, value in data.items() if key in cash_flow_fields}
            # {key: value for key, value in data.items()}
            for data in cash_flow_data
        ]
    )

    return data


def get_overview(symbol, *args, **kwargs):
    stock = Ticker(symbol)
    overview_data = stock.quotes

    # - Required fields for overview
    required_fields = {
        "currency",
        "marketCap",
        "longName",
        "regularMarketPreviousClose",
        "regularMarketChangePercent",
        "bookValue",
        "trailingPE",
        "priceToBook",
        "dividendRate",
        "fiftyTwoWeekLow",
        "fiftyTwoWeekHigh",
        "fiftyDayAverage",
        "twoHundredDayAverage",
    }

    data = handle_nan_values(
        {
            field: overview_data[symbol].get(field)
            for field in required_fields
            if field in overview_data[symbol]
        }
    )

    return data


def get_stock_data(symbol, *args, **kwargs):

    filtered_data = {}

    filtered_data["overview"] = get_overview(symbol)

    filtered_data["balanceSheet"] = get_balance_sheet(symbol)

    filtered_data["cashFlow"] = get_cash_flow(symbol)

    return filtered_data


# print(get_stock_data("RELIANCE.NS"))

def get_nse_top_gainers():
    nifty50_symbols = [
        "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS",
        "HINDUNILVR.NS", "KOTAKBANK.NS", "SBIN.NS", "BHARTIARTL.NS", "ITC.NS",
        "ASIANPAINT.NS", "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "HCLTECH.NS",
        "WIPRO.NS", "SUNPHARMA.NS", "ULTRACEMCO.NS", "TITAN.NS", "LT.NS",
        "NESTLEIND.NS", "POWERGRID.NS", "INDUSINDBK.NS", "BAJAJFINSV.NS", "HDFCLIFE.NS",
        "DRREDDY.NS", "GRASIM.NS", "JSWSTEEL.NS", "CIPLA.NS", "ADANIPORTS.NS",
        "COALINDIA.NS", "TATAMOTORS.NS", "BPCL.NS", "ONGC.NS", "HEROMOTOCO.NS",
        "EICHERMOT.NS", "DIVISLAB.NS", "APOLLOHOSP.NS", "BRITANNIA.NS", "SHREECEM.NS",
        "TECHM.NS", "BAJAJ-AUTO.NS", "M&M.NS", "ADANIENT.NS", "NTPC.NS",
        "UPL.NS", "HINDALCO.NS", "SBILIFE.NS"
    ]
    
    # Fetch current day's price data
    data = yf.download(tickers=nifty50_symbols, period="1d", interval="1d", group_by='ticker')
    
    gainers = []
    for symbol in nifty50_symbols:
        if symbol in data:
            open_price = data[symbol]['Open'].iloc[0]
            close_price = data[symbol]['Close'].iloc[0]
            change_percent = ((close_price - open_price) / open_price) * 100
            gainers.append({
                'symbol': symbol.replace('.NS', ''),  # Remove '.NS' suffix for clarity
                'open': round(open_price, 2),
                'close': round(close_price, 2),
                'change': round(change_percent, 2)
            })
    
    # Sort by percentage change and get top 5 gainers
    top_gainers = sorted(gainers, key=lambda x: x['change'], reverse=True)[:5]
    
    return top_gainers


def get_nse_top_losers():
    nifty50_symbols = [
        "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS",
        "HINDUNILVR.NS", "KOTAKBANK.NS", "SBIN.NS", "BHARTIARTL.NS", "ITC.NS",
        "ASIANPAINT.NS", "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "HCLTECH.NS",
        "WIPRO.NS", "SUNPHARMA.NS", "ULTRACEMCO.NS", "TITAN.NS", "LT.NS",
        "NESTLEIND.NS", "POWERGRID.NS", "INDUSINDBK.NS", "BAJAJFINSV.NS", "HDFCLIFE.NS",
        "DRREDDY.NS", "GRASIM.NS", "JSWSTEEL.NS", "CIPLA.NS", "ADANIPORTS.NS",
        "COALINDIA.NS", "TATAMOTORS.NS", "BPCL.NS", "ONGC.NS", "HEROMOTOCO.NS",
        "EICHERMOT.NS", "DIVISLAB.NS", "APOLLOHOSP.NS", "BRITANNIA.NS", "SHREECEM.NS",
        "TECHM.NS", "BAJAJ-AUTO.NS", "M&M.NS", "ADANIENT.NS", "NTPC.NS",
        "UPL.NS", "HINDALCO.NS", "SBILIFE.NS"
    ]
    
    # Fetch current day's price data
    data = yf.download(tickers=nifty50_symbols, period="1d", interval="1d", group_by='ticker')
    
    losers = []
    for symbol in nifty50_symbols:
        if symbol in data:
            open_price = data[symbol]['Open'].iloc[0]
            close_price = data[symbol]['Close'].iloc[0]
            change_percent = ((close_price - open_price) / open_price) * 100
            losers.append({
                'symbol': symbol.replace('.NS', ''),  # Remove '.NS' suffix
                'open': round(open_price, 2),
                'close': round(close_price, 2),
                'change': round(change_percent, 2)
            })
    
    # Sort by percentage change (lowest to highest) and get top 5 losers
    top_losers = sorted(losers, key=lambda x: x['change'])[:5]
    
    return top_losers

def get_stock_news(stock_symbol):
    url = f"https://query1.finance.yahoo.com/v1/finance/search?q={stock_symbol}&newsCount=5"
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        news = response.json().get("news", [])
        res = [article["title"] for article in news]
        res = '. '.join(res)
        return res
    except:
        return ""
    
print(get_stock_news('RELIANCE'))