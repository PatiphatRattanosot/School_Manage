import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import News from '../components/News';
import { useNewsContext } from '../context/NewsContext';
function HomePage() {
  const [images, setImages] = useState([]);
  const {allNews , fetchNewsByType} = useNewsContext()
  useEffect(() => {
    const getImages = async () => {
      const type = { newsType: "แนะนำ" };
      const data = await fetchNewsByType(type)
      setImages(data)
    };
    getImages();
  }, [allNews]);
  
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
