import React from 'react'
import Card from './Card'

function News({ allNews }) {


    return (
        <div className="flex flex-wrap justify-center gap-4">
            {allNews &&
                allNews.map((news, index) => (
                    <div key={index}>
                        <Card
                            id={news.id}
                            img={news.newsImage}
                            title={news.title}
                            type={news.newsType}
                            des={news.description}
                        />
                    </div>
                ))}
        </div>

    )
}

export default News
