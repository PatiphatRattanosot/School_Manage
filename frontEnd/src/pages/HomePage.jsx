import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import NewsServices from '../services/news.service';
import News from '../components/News';

function HomePage() {
  const [images, setImages] = useState([]);
  const [allNews ,setAllNews] = useState([])

  useEffect(() => {
    const getImages = async () => {
      const type = { newsType: "แนะนำ" };
      const response = await NewsServices.getByType(type);
      setImages(response.data);
    };
    const getAllNews = async () => {
      const response = await NewsServices.getNews()
      setAllNews(response.data)
    }
    getAllNews()
    getImages();
  }, []);
  
  return (
    <div >
      <Carousel images={images} />
      <div className="font-bold ">
        <h1 className='text-6xl my-4'>ข่าวสาร</h1>
        <News allNews={allNews}/>
      </div>
    </div>
  )
}

export default HomePage
