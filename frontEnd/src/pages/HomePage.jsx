import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import NewsServices from '../services/news.service';

function HomePage() {
  const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const type = { newsType: "แนะนำ" };
            const response = await NewsServices.getByType(type);
            setImages(response.data);
        };
        getImages();
    }, []);

  return (
    <div >
      <Navbar></Navbar>
      <Carousel images={images}/>
    </div>
  )
}

export default HomePage
