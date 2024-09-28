import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useNewsContext } from '../context/NewsContext';
function News({ allNews }) {
    const navigate = useNavigate()
    const { deleteNews } = useNewsContext()

    const handleEdit = (id) => {
        navigate(`/news/edit/${id}`)
    };

    const handleDelete = (id) => {
        deleteNews(id)
    };

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {allNews && allNews.map((news) => (
                <div key={news.id}>
                    <Card
                        id={news.id}
                        img={news.newsImage}
                        title={news.title}
                        type={news.newsType}
                        des={news.description}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            ))}
        </div>
    );
}

export default News;
