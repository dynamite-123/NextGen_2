from together import Together

client = Together()

response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1",
    messages=[
        {
                "role": "user",
                "content": "Please recommend 6 specific stocks listed in the national stock exchange(NSE) based on the following criteria:\n    - Investment amount: 10000 INR\n    - Investment duration: 2 years\n    - Market cap preference: small\n    - Sector preference: IT\n    - Risk tolerance: High\n    \n    For each stock, provide:\n    1. Stock symbol as listen in the NSE\n    2. Company name\n    3. Brief reason for recommendation\n    4. Current market cap category\n    5. Primary sector\n    \n    Format the response as a JSON array with each stock as an object containing the above fields."
        },
        {
                "role": "assistant",
                "content": "<think>\nOkay, let‛s tackle this query. The user wants six specific NSE-listed stocks based on certain criteria. Let‛s break down the requirements first.\n\nInvestment amount is 10,000 INR over two years. That‛s a relatively short duration. Market cap preference is small, so I need to focus on small-cap companies. Sector is IT, and risk tolerance is high. High risk in small-cap IT stocks makes sense because these companies can be volatile but might offer higher growth potential.\n\nFirst, I need to list small-cap IT companies on the NSE. Remember, in India, small-cap usually refers to companies with a market cap below 5,000 crore INR, but definitions can vary. Let me think of some IT companies that fit this. \n\nStart with names like Intellect Design Arena. Wait, their market cap might be higher. Let me check. Oh, maybe they are mid-cap. Then perhaps companies like Tanla Platforms? I think they are in the IT sector and might be small-cap. Also, Nucleus Software Exports, but are they small-cap? Maybe. Others like R Systems International, Majesco, or Sonata Software? Wait, Sonata might be mid-cap. \n\nNeed to verify market caps. Let me recall: Tanla‛s market cap was around 8,000 crore INR recently, which might be mid-cap. Hmm, maybe I need to look for smaller ones. What about Genesys International? They are in mapping and GIS services, part of IT. Their market cap is around 1,000 crore. That‛s small-cap. \n\nAnother one could be Orient Green Power? Wait, no, that‛s energy. Let‛s focus on IT. Think of companies like Accelya Solutions India Ltd. They provide IT solutions for airlines. Their market cap is around 1,500 crore. That‛s small-cap. \n\nNucleus Software Exports: their market cap is about 1,200 crore, so that‛s small. Then there‛s R Systems International, which is around 2,500 crore. Maybe that‛s still considered small-cap. \n\nAlso, Majesco Ltd. They are in insurance IT solutions. Market cap around 1,800 crore. That‛s small. Another one could be RS Software (India) Ltd, but I‛m not sure if they‛re listed on NSE. Maybe not. \n\nWait, let me think again. Some other names: Hinduja Global Solutions. Wait, their market cap is around 5,000 crore, which might be mid-cap. Maybe Zensar Technologies? No, their market cap is higher. \n\nAlternatively, look for IT services companies that are smaller. Maybe eMudhra Limited. They deal with digital trust services. Market cap around 5,000 crore? Wait, that‛s mid-cap. Maybe not. \n\nWhat about Tata Elxsi? No, they‛re a large-cap. Hmm. Let‛s see: Intense Technologies? They are in software products for digital transformation. Market cap around 600 crore. That‛s small. \n\nSo compiling the list:\n\n1. Genesys International Corporation - GENESYS, IT sector, small-cap. They focus on geospatial solutions, which is a niche in IT. High growth potential with digital transformation trends.\n\n2. Nucleus Software Exports - NUCLEUS, financial IT solutions. Small-cap. Their products for banking could see growth with fintech expansion.\n\n3. R Systems International - RSYSTEMS, IT services and solutions. Small-cap. They work with emerging tech, which is good for high risk/reward.\n\n4. Accelya Solutions India - ACCELYA, IT for airline industry. Rebound in travel post-pandemic could boost them.\n\n5. Intense Technologies - INTENTECH, digital transformation software. Small-cap with potential in automation and AI.\n\n6. Majesco - MAJESCO, insurance IT solutions. Digital insurance trends could drive growth.\n\nNeed to check if all these are listed on NSE and their symbols. For example, Majesco‛s symbol is MAJESCO. R Systems is RSYSTEMS. Genesys is GENESYS. Accelya is ACCELYA. Nucleus Software is NUCLEUS. Intense Technologies is INTENTECH. \n\nAlso, need to confirm their sectors are IT and market caps are small. The reasons should highlight growth potential aligned with high risk tolerance. Each stock should have a brief reason tied to sector trends or company strengths. Make sure the JSON structure has all required fields without errors.\n</think>\n\njson\n[\n    {\n        \"stock_symbol\": \"GENESYS\",\n        \"company_name\": \"Genesys International Corporation Ltd\",\n        \"reason_for_recommendation\": \"Specializes in geospatial technology and digital mapping solutions, poised to benefit from India‛s growing focus on smart cities and digital infrastructure.\",\n        \"market_cap_category\": \"Small\",\n        \"primary_sector\": \"IT\"\n    },\n    {\n        \"stock_symbol\": \"NUCLEUS\",\n        \"company_name\": \"Nucleus Software Exports Ltd\",\n        \"reason_for_recommendation\": \"Provides lending and transaction banking solutions globally; strong growth potential in fintech and digital banking adoption.\",\n        \"market_cap_category\": \"Small\",\n        \"primary_sector\": \"IT\"\n    },\n    {\n        \"stock_symbol\": \"RSYSTEMS\",\n        \"company_name\": \"R Systems International Ltd\",\n        \"reason_for_recommendation\": \"Focuses on AI, cloud, and IoT-driven IT services; positioned to capitalize on niche digital transformation projects.\",\n        \"market_cap_category\": \"Small\",\n        \"primary_sector\": \"IT\"\n    },\n    {\n        \"stock_symbol\": \"ACCELYA\",\n        \"company_name\": \"Accelya Solutions India Ltd\",\n        \"reason_for_recommendation\": \"Leverages SaaS solutions for the airline industry, with recovery in global travel demand driving revenue growth.\",\n        \"market_cap_category\": \"Small\",\n        \"primary_sector\": \"IT\"\n    },\n    {\n        \"stock_symbol\": \"INTENTECH\",\n        \"company_name\": \"Intense Technologies Ltd\",\n        \"reason_for_recommendation\": \"Offers customer lifecycle management software; high-risk, high-reward bet on telecom and BFSI sector digitization.\",\n        \"market_cap_category\": \"Small\",\n        \"primary_sector\": \"IT\"\n    },\n    {\n        \"stock_symbol\": \"MAJESCO\",\n        \"company_name\": \"Majesco Ltd\",\n        \"reason_for_recommendation\": \"Cloud-based insurance software provider; growth potential from increasing adoption of insurtech in emerging markets.\",\n        \"market_cap_category\": \"Small\",\n        \"primary_sector\": \"IT\"\n    }\n]\n"
        }
],
    max_tokens=None,
    temperature=0.6,
    top_p=0.95,
    top_k=50,
    repetition_penalty=1,
    stop=["<｜end▁of▁sentence｜>"],
    stream=True
)
for token in response:
    if hasattr(token, 'choices'):
        print(token.choices[0].delta.content, end='', flush=True)




















'''
from together import Together
import json
import logging
import re
from dotenv import load_dotenv
import os

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
    """
    Get stock recommendations using Together AI's LLaMA model
    """
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


def clean_llm_response(response: str) -> dict:
    """
    Clean and parse the LLM response into proper JSON format
    """
    try:
        # Find the JSON array in the response using regex
        json_match = re.search(r"\[(.*?)\]", response, re.DOTALL)
        if json_match:
            json_str = json_match.group(0)
            # Parse the JSON array
            stocks_data = json.loads(json_str)

            # Create the final response structure
            cleaned_response = {
                "stocks": stocks_data,
                "disclaimer": "Past performance is not a guarantee of future results. Please conduct your own research and consult with a financial advisor before making any investment decisions.",
            }

            return cleaned_response
        else:
            raise ValueError("No JSON array found in response")

    except json.JSONDecodeError as e:
        logging.error(f"JSON parsing error: {str(e)}")
        raise ValueError("Failed to parse response as JSON")
    except Exception as e:
        logging.error(f"Error cleaning response: {str(e)}")
        raise ValueError("Failed to process response")


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

'''