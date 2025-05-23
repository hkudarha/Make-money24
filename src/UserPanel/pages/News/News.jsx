import React, { useState, useEffect } from 'react';
import { getNews } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNewData = async () => {
        try {
            const res = await getNews();
            const data = res?.data || [];
            setNews(data);
        } catch (err) {
            console.error("Failed to fetch News Data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNewData();
    }, []);

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-5 text-center">Latest News</h2>

            {news.length === 0 ? (
                <p className="text-center text-3xl font-medium">No news found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map(article => (
                        <div key={article.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.description}</p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-blue-600 hover:underline"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
