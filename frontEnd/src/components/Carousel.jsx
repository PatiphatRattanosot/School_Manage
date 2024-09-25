import React, { useEffect, useState } from 'react';

function Carousel({ images }) {
    const [currentSlide, setCurrentSlide] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === images.length ? 1 : prev + 1));
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    const handlePrev = () => {
        setCurrentSlide(prev => (prev === 1 ? images.length : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide(prev => (prev === images.length ? 1 : prev + 1));
    };

    return (
        <div className="relative">
            <div className="carousel w-full my-4">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        id={`slide${index + 1}`}
                        className={`carousel-item relative w-full ${currentSlide === index + 1 ? 'block' : 'hidden'}`}
                    >
                        <img
                            src={image.newsImage}
                            alt={image.title}
                            className="w-full"
                        />
                    </div>
                ))}
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button onClick={handlePrev} className="btn btn-circle">❮</button>
                <button onClick={handleNext} className="btn btn-circle">❯</button>
            </div>
        </div>
    );
}

export default Carousel;
