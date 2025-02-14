export const NewsFeed = () => {
  const news = [
    {
      title: 'Quarterly Earnings Beat Expectations',
      content: 'Company reports strong Q4 results, surpassing analyst estimates...',
      time: '2 hours ago'
    },
    {
      title: 'New Product Launch Announced',
      content: 'Company unveils next-generation product line...',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Related News</h2>
      <div className="space-y-4">
        {news.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};