from together import Together
import json
import logging
import re
from dotenv import load_dotenv
import os
import requests
from django.http import  JsonResponse

load_dotenv()

# Initialize Together client
client = Together(
    api_key=os.environ['TOGETHER_AI_KEY']
)

def get_stock_recommendations(
    investment_amount: int,
    investment_duration: int,
    market_cap: str,
    sector: str,
    risk_tolerance: str,
) -> str:
    prompt = f"""    Please recommend 6 specific stocks listed in the national stock exchange(NSE) based on the following criteria:
    - Investment amount: {investment_amount} INR
    - Investment duration: {investment_duration} years
    - Market cap preference: {market_cap}
    - Sector preference: {sector}
    - Risk tolerance: {risk_tolerance}
    
    For each stock, provide:
    1. Stock symbol as listen in the NSE
    2. Company name
    3. Brief reason for recommendation
    4. Current market cap category
    5. Primary sector
    
    Format the response as a JSON array with each stock as an object containing the above fields."""

    try:
        response = client.chat.completions.create(
            # model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            model="deepseek-ai/DeepSeek-R1",

            messages=[{"role": "user", "content": prompt}],
            stream=False,  # Changed to False to get complete response at once
        )

        # Extract the content from the response
        recommendation = response.choices[0].message.content

        # Try to parse as JSON to ensure valid format
        try:
            json.loads(recommendation)
            return recommendation
        except json.JSONDecodeError:
            # If response is not valid JSON, return it as is
            return recommendation

    except Exception as e:
        logging.error(f"LLM Error: {str(e)}")
        raise Exception("Failed to generate stock recommendations")

# - for llama
# def clean_llm_response(response: str) -> dict:
#     """
#     Clean and parse the LLM response into proper JSON format
#     """
#     try:
#         # Find the JSON array in the response using regex
#         json_match = re.search(r"\[(.*?)\]", response, re.DOTALL)
#         if json_match:
#             json_str = json_match.group(0)
#             # Parse the JSON array
#             stocks_data = json.loads(json_str)

#             # Create the final response structure
#             cleaned_response = {
#                 "stocks": stocks_data,
#                 "disclaimer": "Past performance is not a guarantee of future results. Please conduct your own research and consult with a financial advisor before making any investment decisions.",
#             }

#             return cleaned_response
#         else:
#             raise ValueError("No JSON array found in response")

#     except json.JSONDecodeError as e:
#         logging.error(f"JSON parsing error: {str(e)}")
#         raise ValueError("Failed to parse response as JSON")
#     except Exception as e:
#         logging.error(f"Error cleaning response: {str(e)}")
#         raise ValueError("Failed to process response")

# - for deepseek
def clean_llm_response(input_string: str) -> list:
    start_marker = "```json"
    end_marker = "```"
    
    start_pos = input_string.find(start_marker)
    if start_pos == -1:
        return []  # No starting marker found
    
    # Move past the start marker
    start_pos += len(start_marker)
    
    # Find the closing marker after the start position
    end_pos = input_string.find(end_marker, start_pos)
    if end_pos == -1:
        return []  # No ending marker found
    
    # Extract the JSON content
    json_content = input_string[start_pos:end_pos].strip()
    
    # Handle empty result
    if not json_content:
        return []
    
    try:
        # Parse the JSON string into a Python object
        return json.loads(json_content)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return []

def get_stock_recommendations_json(
    investment_amount: int,
    investment_duration: int,
    market_cap: str,
    sector: str,
    risk_tolerance: str,
):
    response = get_stock_recommendations(
        investment_amount, investment_duration, market_cap, sector, risk_tolerance
    )
    cleaned_response = clean_llm_response(response)

    return cleaned_response
