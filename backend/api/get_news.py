import yfinance as yf
import json
import requests
from bs4 import BeautifulSoup

stock = yf.Ticker('DSSL')
data_str = stock.news

def fetch_yahoo_news(symbol: str):
    stock = yf.Ticker(symbol)
    data = stock.news
    return data

def extract_yahoo_titles(data_str):
    """
    Extract news titles from a string representation of news data.
    
    Args:
        data_str (str): String containing news data in a list-of-dictionaries format
        
    Returns:
        list: List of extracted news titles
    """
    data_str = str(data_str)

    try:
        # Try to parse as JSON
        data = json.loads(data_str)
        # If JSON parsing succeeded, extract titles properly
        titles = [item['content']['title'] for item in data if 'content' in item and 'title' in item['content']]
    except json.JSONDecodeError:
        # If JSON parsing fails, extract titles using string manipulation
        titles = []
        current_pos = 0
        while True:
            title_start = data_str.find("'title': '", current_pos)
            if title_start == -1:
                break
            title_start += 10 
            title_end = data_str.find("'", title_start)
            titles.append(data_str[title_start:title_end])
            current_pos = title_end
    
    return titles

def fetch_google_news(ticker):
    url = f"https://www.google.com/search?q={ticker}+stock+news&tbm=nws"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return f"Failed to retrieve news: Status code {response.status_code}"
    
    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("div", class_="BNeawe vvjwJb AP7Wnd")

    news_list = []
    for article in articles[:10]:  # Limit to 10 news articles
        title = article.get_text(strip=True)
        link = article.find_parent("a")["href"]
        full_link = "https://www.google.com" + link
        news_list.append((title, full_link))
    
    return news_list 

def extract_google_titles(data):
    """
    Extract the titles from a list of tuples where each tuple contains (title, url)
    
    Args:
        data: List of tuples in the format [(title, url), ...]
    
    Returns:
        List of title strings
    """
    titles = []
    for item in data:
        if isinstance(item, tuple) and len(item) >= 1:
            titles.append(item[0])
    return titles

def get_all_news(symbol):

    res1 = fetch_yahoo_news(symbol)

    res2 = fetch_google_news(symbol)

    res1 = extract_yahoo_titles(res1)

    res2 = extract_google_titles(res2)

    return list(set(res1 + res2))






