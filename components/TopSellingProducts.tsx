'use client'

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const TopSellingProducts = () => {

  // change this to change appearence of the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  interface dataDataType {
    productName: string
    productMainImage: string
    productPrice: number
    productId: number
  }
  // let data: productType[] = [];

  // const [data, setData] = useState("")

  const [data, setData] = useState<dataDataType[]>([]);

  useEffect(() => {
    const handleLogOut = async () => {
      console.log("request sending to nextjs API");

      const res = await fetch('http://localhost:3000/api/product/topSelling', { cache: 'no-store' });

      console.log("res" + res);

      const responseData = await res.json();

      console.log(responseData);

      console.log("img test");
      console.log(responseData[0].productMainImage);

      setData(responseData);
    };

    handleLogOut();
  }, []);

  return (

    <div className='bg-gray-300 pt-5 pb-8 px-10'>
      <h1
        className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-3"
      >
        Top Selling Products
      </h1>
      <div className='m-auto'>

        <Slider {...settings}>
          {data.map((d, index) => (
            <div key={index} className="bg-white h-80 md:h-96 text-black rounded-xl mb-5">
            <div className="h-56 bg-indigo-500 rounded-t-xl relative">
              <Image
                src={d.productMainImage}
                alt={d.productName}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <div className="flex flex-col justify-center items-center p-1 text-center md:h-40 max-h-40">
              <p className="text-xl font-semibold sm:text-sm md:text-lg">{d.productName}</p>
              <p className="text-xl mt-1 font-normal">${d.productPrice}</p>
            </div>
          </div>
          ))}
        </Slider>
      </div>

    </div>


  );
};



export default TopSellingProducts;
