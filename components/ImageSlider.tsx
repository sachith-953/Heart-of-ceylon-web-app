'use client'
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className='w-3/4 m-auto mt-20 border-3 border-green-600'>
      <Slider {...settings}>
        {data.map((d, index) => (
          <div key={index} className='bg-white h-[450px] text-black rounded-xl border-3 border-green-600'>
            <div
              className='h-56 bg-indigo-500 rounded-t-xl'
              style={{ backgroundImage: `url(${d.img})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
            ></div>
            <div className="flex flex-col justify-center items-center gap-4 p-4">
              <p className='text-xl font-semibold'>{d.name}</p>
              <p className='text-center'>{d.review}</p>
              {/* <button className='bg-indigo-500 text-white text-lg py-1 px-4 rounded-xl'>Read More</button> */}
              <p className='text-xl font-semibold'>{d.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
// Made a array for contain all text info and image paths
const data = [
  {
    name: 'Tea',
    img: 'assets/images/img_1.jpg',
    review: 'A stunning flower that thrives in the most unexpected places, even on the moon!',
    price: '$36'
  },
  {
    name: 'Coffee',
    img: 'assets/images/img_2.jpg',
    review: 'This flower boasts vibrant colors and can survive in the harshest environments, including space.',
    price: '$36'
  },
  {
    name: 'Cinnamon',
    img: 'assets/images/img_3.jpg',
    review: 'Known for its resilience, this flower can bloom even in the vacuum of space.',
    price: '$36'
  },
  {
    name: 'Gems',
    img: 'assets/images/img_4.jpg',
    review: 'A delicate flower with the unique ability to thrive under zero-gravity conditions.',
    price: '$36'
  },
  {
    name: 'Coconuts',
    img: 'assets/images/img_5.jpg',
    review: 'This flowers beauty is out of this world, able to grow and flourish on the moon.',
    price: '$36'
  },
  {
    name: 'Cloths',
    img: 'assets/images/img_6.jpg',
    review: 'An extraordinary flower that defies gravity and thrives in the cosmos.',
    price: '$36'
  },
  {
    name: 'Fish',
    img: 'assets/images/img_7.jpg',
    review: 'This celestial flower can bloom in space, showcasing its otherworldly beauty.',
    price: '$36'
  }
];

export default ImageSlider;
