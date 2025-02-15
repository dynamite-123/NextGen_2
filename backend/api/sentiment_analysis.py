import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from datetime import datetime
from typing import List, Dict, Union
import logging
from collections import Counter
import re
import json

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class FinancialSentimentAnalyzer:
    def __init__(self):
        try:
            nltk.download('vader_lexicon', quiet=True)
            self.sia = SentimentIntensityAnalyzer()
            self._customize_analyzer()
        except Exception as e:
            logger.error(f"Failed to initialize analyzer: {str(e)}")
            raise

    def _customize_analyzer(self):
        self.financial_lexicon = {
            'partnership': 3.0,
            'expansion': 2.5,
            'growth': 2.0,
            'breakthrough': 2.0,
            'upbeat': 2.0,
            'innovation': 2.0,
            'collaborate': 1.5,
            'beat estimates': 2.5,
            'exceeded expectations': 2.5,
            'strong performance': 2.0,
            'strategic': 1.5,
            'advantage': 1.5,
            'opportunity': 1.5,
            'layoff': -2.5,
            'downsizing': -2.0,
            'restructuring': -1.0,
            'investigation': -2.0,
            'lawsuit': -2.0,
            'decline': -2.0,
            'miss estimates': -2.5,
            'below expectations': -2.5,
            'weak performance': -2.0,
            'challenge': -1.0,
            'risk': -1.5,
            'volatile': -1.5,
            'uncertainty': -1.5
        }
        self.sia.lexicon.update(self.financial_lexicon)

    def analyze_headlines(self, headlines: List[str]) -> Dict:
        """
        Analyze sentiment for a list of headlines and return JSON-formatted results.
        
        Args:
            headlines (List[str]): List of news headlines
            
        Returns:
            Dict: JSON-compatible dictionary with analysis results
        """
        results = {
            "metadata": {
                "timestamp": datetime.now().isoformat(),
                "total_headlines": len(headlines)
            },
            "summary": {
                "positive_count": 0,
                "negative_count": 0,
                "neutral_count": 0,
                "overall_sentiment": None,
                "average_score": 0
            },
            "headlines": []
        }
        
        total_score = 0
        
        for idx, headline in enumerate(headlines, 1):
            # Analyze sentiment
            processed = headline.lower()
            scores = self.sia.polarity_scores(processed)
            
            # Determine sentiment category
            if scores['compound'] >= 0.2:
                sentiment = "positive"
                results["summary"]["positive_count"] += 1
            elif scores['compound'] <= -0.2:
                sentiment = "negative"
                results["summary"]["negative_count"] += 1
            else:
                sentiment = "neutral"
                results["summary"]["neutral_count"] += 1
            
            # Add recency weight
            recency_weight = 1 + ((len(headlines) - idx) * 0.1)
            weighted_score = scores['compound'] * recency_weight
            total_score += weighted_score
            
            # Add headline analysis
            headline_result = {
                "headline": headline,
                "sentiment": sentiment,
                "scores": {
                    "compound": round(scores['compound'], 3),
                    "positive": round(scores['pos'], 3),
                    "negative": round(scores['neg'], 3),
                    "neutral": round(scores['neu'], 3),
                    "weighted_score": round(weighted_score, 3)
                }
            }
            
            results["headlines"].append(headline_result)
        
        # Calculate average weighted score
        avg_score = total_score / len(headlines) if headlines else 0
        results["summary"]["average_score"] = round(avg_score, 3)
        
        # Determine overall sentiment
        if avg_score >= 0.2:
            results["summary"]["overall_sentiment"] = "positive"
        elif avg_score <= -0.2:
            results["summary"]["overall_sentiment"] = "negative"
        else:
            results["summary"]["overall_sentiment"] = "neutral"
        
        return results

def main():
    # Sample headlines
    headlines = [
        'Infosys Limited (INFY) Expands Partnership with Siemens to Enhance Digital Learning with Generative AI',
        'Infosys, Siemens to advance digital learning with generative AI',
        'DeepSeek AI breakthrough to benefit Indian IT stocks, Bernstein says',
        'INFY Q3 Earnings Meet Estimates: Will Upbeat FY25 View Lift the Stock?',
        'Trending tickers: Apple, Rivian, Infosys, Duolingo and Rio Tinto'
    ]
    
    try:
        analyzer = FinancialSentimentAnalyzer()
        results = analyzer.analyze_headlines(headlines)
        # Print formatted JSON
        print(json.dumps(results, indent=2))
    except Exception as e:
        logger.error(f"Error in main execution: {str(e)}")

if __name__ == "__main__":
    main()









# import nltk
# from nltk.sentiment import SentimentIntensityAnalyzer
# from datetime import datetime
# from typing import List, Dict, Union
# import logging
# from collections import Counter
# import re

# # Set up logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(levelname)s - %(message)s'
# )
# logger = logging.getLogger(__name__)

# class FinancialSentimentAnalyzer:
#     """
#     A specialized sentiment analyzer for financial news that considers
#     domain-specific context and terminology.
#     """
    
#     def __init__(self):
#         """Initialize the Financial Sentiment Analyzer with custom configurations."""
#         try:
#             nltk.download('vader_lexicon', quiet=True)
#             self.sia = SentimentIntensityAnalyzer()
#             self._customize_analyzer()
#         except Exception as e:
#             logger.error(f"Failed to initialize analyzer: {str(e)}")
#             raise

#     def _customize_analyzer(self):
#         """Customize the sentiment analyzer with finance-specific terms and weights."""
#         self.financial_lexicon = {
#             # Positive financial terms
#             'partnership': 3.0,
#             'expansion': 2.5,
#             'growth': 2.0,
#             'profit': 2.0,
#             'breakthrough': 2.0,
#             'upbeat': 2.0,
#             'innovation': 2.0,
#             'collaborate': 1.5,
#             'beat estimates': 2.5,
#             'exceeded expectations': 2.5,
#             'strong performance': 2.0,
#             'strategic': 1.5,
#             'advantage': 1.5,
#             'opportunity': 1.5,
            
#             # Negative financial terms
#             'layoff': -2.5,
#             'downsizing': -2.0,
#             'restructuring': -1.0,
#             'investigation': -2.0,
#             'lawsuit': -2.0,
#             'decline': -2.0,
#             'miss estimates': -2.5,
#             'below expectations': -2.5,
#             'weak performance': -2.0,
#             'challenge': -1.0,
#             'risk': -1.5,
#             'volatile': -1.5,
#             'uncertainty': -1.5,
            
#             # Neutral or context-dependent terms
#             'estimates': 0.0,
#             'quarterly': 0.0,
#             'announces': 0.0,
#             'report': 0.0
#         }
        
#         # Update VADER lexicon with financial terms
#         self.sia.lexicon.update(self.financial_lexicon)

#     def _preprocess_headline(self, headline: str) -> str:
#         """
#         Preprocess the headline to better capture financial context.
        
#         Args:
#             headline (str): Raw headline text
            
#         Returns:
#             str: Processed headline
#         """
#         text = headline.lower()
        
#         replacements = {
#             r'q[1-4] earnings': 'quarterly earnings',
#             r'beat.*estimate': 'beat estimates',
#             r'miss.*estimate': 'miss estimates',
#             r'better than.*expected': 'exceeded expectations',
#             r'worse than.*expected': 'below expectations',
#             r'higher than.*expected': 'exceeded expectations',
#             r'lower than.*expected': 'below expectations'
#         }
        
#         for pattern, replacement in replacements.items():
#             text = re.sub(pattern, replacement, text)
            
#         return text

#     def _analyze_financial_context(self, headline: str) -> Dict[str, float]:
#         """Analyze financial context-specific features of the headline."""
#         context_scores = {
#             'business_impact': 0.0,
#             'market_sentiment': 0.0
#         }
        
#         impact_indicators = {
#             'partnership': 0.8,
#             'expansion': 0.7,
#             'earnings': 0.6,
#             'revenue': 0.6,
#             'growth': 0.5,
#             'strategy': 0.4
#         }
        
#         market_indicators = {
#             'outlook': 0.7,
#             'guidance': 0.6,
#             'forecast': 0.6,
#             'target': 0.5,
#             'estimate': 0.4
#         }
        
#         for term, score in impact_indicators.items():
#             if term in headline.lower():
#                 context_scores['business_impact'] += score
                
#         for term, score in market_indicators.items():
#             if term in headline.lower():
#                 context_scores['market_sentiment'] += score
        
#         # Normalize scores
#         for key in context_scores:
#             context_scores[key] = min(1.0, context_scores[key])
            
#         return context_scores

#     def analyze_sentiment(self, headline: str) -> Dict[str, Union[str, float]]:
#         """Analyze the sentiment of a financial headline with improved accuracy."""
#         try:
#             processed_headline = self._preprocess_headline(headline)
#             base_scores = self.sia.polarity_scores(processed_headline)
#             context_scores = self._analyze_financial_context(processed_headline)
            
#             # Adjust compound score based on financial context
#             adjusted_compound = base_scores['compound']
#             if context_scores['business_impact'] > 0.5:
#                 adjusted_compound *= (1 + context_scores['business_impact'] * 0.3)
#             if context_scores['market_sentiment'] > 0.5:
#                 adjusted_compound *= (1 + context_scores['market_sentiment'] * 0.2)
                
#             # Determine sentiment category
#             if adjusted_compound >= 0.2:
#                 sentiment = 'positive'
#             elif adjusted_compound <= -0.2:
#                 sentiment = 'negative'
#             else:
#                 sentiment = 'neutral'
                
#             return {
#                 'headline': headline,
#                 'sentiment': sentiment,
#                 'score': adjusted_compound,
#                 'base_score': base_scores['compound'],
#                 'context_scores': context_scores
#             }
            
#         except Exception as e:
#             logger.error(f"Error in sentiment analysis: {str(e)}")
#             return None

#     def analyze_headlines(self, headlines: List[str]) -> Dict:
#         """
#         Analyze sentiment for a list of headlines.
        
#         Args:
#             headlines (List[str]): List of news headlines
            
#         Returns:
#             Dict containing analysis results
#         """
#         if not headlines:
#             logger.warning("No headlines provided")
#             return None
            
#         analysis_results = []
#         sentiments = []
        
#         # Analyze each headline
#         for headline in headlines:
#             sentiment_analysis = self.analyze_sentiment(headline)
#             if sentiment_analysis:
#                 analysis_results.append(sentiment_analysis)
#                 sentiments.append(sentiment_analysis['sentiment'])
        
#         # Calculate statistics
#         sentiment_counts = Counter(sentiments)
#         total_headlines = len(analysis_results)
        
#         # Calculate weighted sentiment scores
#         weighted_scores = []
#         for idx, result in enumerate(analysis_results):
#             # More recent news has higher weight
#             recency_weight = 1.0 + (idx * 0.1)
#             # Higher impact news has higher weight
#             impact_weight = 1.0 + result['context_scores']['business_impact']
            
#             weighted_score = result['score'] * recency_weight * impact_weight
#             weighted_scores.append(weighted_score)
        
#         avg_weighted_score = sum(weighted_scores) / len(weighted_scores) if weighted_scores else 0
        
#         return {
#             'analysis_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
#             'total_headlines': total_headlines,
#             'sentiment_counts': dict(sentiment_counts),
#             'overall_sentiment': self._determine_overall_sentiment(weighted_scores),
#             'average_score': round(avg_weighted_score, 3),
#             'detailed_results': analysis_results
#         }

#     def _determine_overall_sentiment(self, weighted_scores: List[float]) -> str:
#         """Determine overall sentiment using weighted scores."""
#         if not weighted_scores:
#             return 'neutral'
            
#         avg_score = sum(weighted_scores) / len(weighted_scores)
        
#         if avg_score >= 0.2:
#             return 'positive'
#         elif avg_score <= -0.2:
#             return 'negative'
#         return 'neutral'

#     def generate_report(self, analysis_results: Dict) -> str:
#         """Generate detailed analysis report."""
#         if not analysis_results:
#             return "No analysis results available."
            
#         report = f"""
# Financial News Sentiment Analysis Report
# =====================================
# Analysis Date: {analysis_results['analysis_date']}

# Summary
# -------
# Total headlines analyzed: {analysis_results['total_headlines']}
# Positive headlines: {analysis_results['sentiment_counts'].get('positive', 0)}
# Negative headlines: {analysis_results['sentiment_counts'].get('negative', 0)}
# Neutral headlines: {analysis_results['sentiment_counts'].get('neutral', 0)}

# Overall Sentiment: {analysis_results['overall_sentiment'].upper()}
# Average Score: {analysis_results['average_score']}

# Detailed Analysis
# ---------------"""
        
#         for result in analysis_results['detailed_results']:
#             report += f"\nHeadline: {result['headline']}"
#             report += f"\nSentiment: {result['sentiment'].upper()}"
#             report += f"\nAdjusted Score: {result['score']:.3f}"
#             report += f"\nBusiness Impact: {result['context_scores']['business_impact']:.2f}"
#             report += f"\nMarket Sentiment: {result['context_scores']['market_sentiment']:.2f}\n"
            
#         return report

# def main():
#     """Main function demonstrating usage with simplified input."""
#     # Sample headlines
#     headlines = ['Sunteck Realty Faces Sustained Challenges Amid Broader Real Estate Sector Decline', 'The total return for Sunteck Realty (NSE:SUNTECK) investors has risen faster than earnings growth over the last five years', 'Stocks to Watch: Nykaa, Hyundai Motor, BSE, Zydus Lifesciences, Sunteck Realty, and more', 'SunTeck Realty slips 4% after posting Q3 biz update; key details here', 'Sunteck Realty stock jumps 9% on strong Q2 business update', 'Jefferies hikes Sunteck Realty target post stellar Q2 show, sees over 40% potential upside', 'Sunteck Realty Faces Challenges Amid Broader Market Volatility and Declining Performance', 'Sunteck Realty share price rises 8% as Q2FY25 pre-sales increase 33% to ₹524 crore, collections rise 25%', 'Sunteck Realty jumps 11% after stellar Q3 results; profit soars 537%', 'Sunteck Realty stock jumps 7% on robust Q2 business update, Rs 520 cr in pre-sales']
    
#     try:
#         analyzer = FinancialSentimentAnalyzer()
#         results = analyzer.analyze_headlines(headlines)
#         report = analyzer.generate_report(results)
#         print(report)
#     except Exception as e:
#         logger.error(f"Error in main execution: {str(e)}")

# if __name__ == "__main__":
#     main()