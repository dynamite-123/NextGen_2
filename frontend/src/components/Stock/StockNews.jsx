import { useEffect, useState } from "react";

const StockNews = ({ symbol }) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/sentiments/?symbol=${symbol}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching stock news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [symbol]);

  if (loading) return <div className="bg-gray-700 p-6 rounded-lg">Loading News...</div>;
  if (!news) return <div className="bg-gray-700 p-6 rounded-lg">No News Available</div>;

  return (
    <div className="bg-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Financial News & Sentiment</h3>
      <p className="text-gray-400">Overall Sentiment: <span className="font-bold text-white">{news.summary.overall_sentiment}</span></p>
      <p className="text-gray-400">Sentiment Score: <span className="font-bold text-white">{news.summary.average_score.toFixed(2)}</span></p>
      
      <div className="mt-4 space-y-3">
        {news.headlines.slice(0, 5).map((item, index) => (
          <div key={index} className="p-3 bg-gray-800 rounded-lg">
            <p className="text-white font-semibold">{item.headline}</p>
            <p className={`text-sm ${item.sentiment === 'positive' ? 'text-green-400' : item.sentiment === 'negative' ? 'text-red-400' : 'text-yellow-400'}`}>
              Sentiment: {item.sentiment} (Score: {item.scores.compound.toFixed(2)})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNews;
