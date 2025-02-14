from yahooquery import Ticker
import json
import pandas as pd
import numpy as np


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
