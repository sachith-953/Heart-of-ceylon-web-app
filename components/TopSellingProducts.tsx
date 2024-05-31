'use client'
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface productType {
  
  productName : string,
  productMainImage : string,
  productPrice : number,
  productId : number,
}
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
async function getData() {
  const res = await fetch('http://localhost:8080/api/v1/pBuyer/TopSellingProducts',{ 
      cache: 'no-store' 
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
  }

  return res.json()
}

const TopSellingProducts = async () => {

  const fetchedData = await getData();
  data = fetchedData; // Assign the fetched data to the global data array
  console.log(data)


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
            <div key={index} className='bg-white h-80 md:h-96 text-black rounded-xl mb-5'>
              <div
                className='h-56 bg-indigo-500 rounded-t-xl'
                style={{ backgroundImage: `url(${d.productMainImage})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
              >
            
              </div>
              <div className="flex flex-col justify-center items-center p-1 text-center md:h-40 max-h-40 ">
                <p className='text-xl font-semibold sm:text-sm md:text-lg'>{d.productName}</p>
                {/* <p className='text-center'>{d.review}</p> */}
                {/* <button className='bg-indigo-500 text-white text-lg py-1 px-4 rounded-xl'>Read More</button> */}
                <p className='text-xl mt-1 font-normal'>{d.productPrice}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    </div>


  );
};

let data: productType[] = [];


export default TopSellingProducts;