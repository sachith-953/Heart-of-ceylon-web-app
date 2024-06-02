// 'use client'
// import React from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const TopSellingProducts = () => {

//   // change this to change appearence of the slider
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 250,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1536,
//         settings: {
//           slidesToShow: 6,
//         },
//       },
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (

//     <div className='bg-gray-300 pt-5 pb-8 px-10'>
//       <h1
//         className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-3"
//       >
//         Top Selling Products
//       </h1>
//       <div className='m-auto'>

//         <Slider {...settings}>
//           {data.map((d, index) => (
//             <div key={index} className='bg-white h-80 md:h-96 text-black rounded-xl mb-5'>
//               <div
//                 className='h-56 bg-indigo-500 rounded-t-xl'
//                 style={{ backgroundImage: `url(${d.img})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
//               ></div>
//               <div className="flex flex-col justify-center items-center p-1 text-center md:h-40 max-h-40 ">
//                 <p className='text-xl font-semibold sm:text-sm md:text-lg'>{d.name}</p>
//                 {/* <p className='text-center'>{d.review}</p> */}
//                 {/* <button className='bg-indigo-500 text-white text-lg py-1 px-4 rounded-xl'>Read More</button> */}
//                 <p className='text-xl mt-1 font-normal'>{d.price}</p>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>

//     </div>


//   );
// };
// // Made a array for contain all text info and image paths
// const data = [
//   {
//     name: 'Leaf Tea Packs Qualitea Ceylon (Pvt) Ltd',
//     img: 'assets/images/img_1.jpg',
//     review: 'A stunning flower that thrives in the most unexpected places, even on the moon!',
//     price: '$36.09'
//   },
//   {
//     name: 'Nescafe Clasico, 7 Count Box, Instant Dark Roast Sri Lanka Ubuy',
//     img: 'assets/images/img_2.jpg',
//     review: 'This flower boasts vibrant colors and can survive in the harshest environments, including space.',
//     price: '$36.76'
//   },
//   {
//     name: 'Ceylon Cinnamon Powder - 100g - Tree of Life',
//     img: 'assets/images/img_3.jpg',
//     review: 'Known for its resilience, this flower can bloom even in the vacuum of space.',
//     price: '$36.98'
//   },
//   {
//     name: 'Natural Ceylon Blue Sapphire Online from Sri Lanka',
//     img: 'assets/images/img_4.jpg',
//     review: 'A delicate flower with the unique ability to thrive under zero-gravity conditions.',
//     price: '$36.76'
//   },
//   {
//     name: 'Coconuts with the husk',
//     img: 'assets/images/img_5.jpg',
//     review: 'This flowers beauty is out of this world, able to grow and flourish on the moon.',
//     price: '$36.76'
//   },
//   {
//     name: 'JOBBS MENS CASUAL POLO T-SHIRT Fashion Bug Online Clothing Stores',
//     img: 'assets/images/img_6.jpg',
//     review: 'An extraordinary flower that defies gravity and thrives in the cosmos.',
//     price: '$36.76'
//   },
//   {
//     name: 'Male Crowntail Betta Freshwaterfish Aquariumfish Coburg Aquairum',
//     img: 'assets/images/img_7.jpg',
//     review: 'This celestial flower can bloom in space, showcasing its otherworldly beauty.',
//     price: '$36.76'
//   }
// ];

// export default TopSellingProducts;




// ===============================================================================================================
'use client'

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

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

      const res = await fetch('http://localhost:3000/api/product/topSelling', {
        method: 'GET',
      });

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
            <div key={index} className='bg-white h-80 md:h-96 text-black rounded-xl mb-5'>
              <div
                className='h-56 bg-indigo-500 rounded-t-xl'
                style={{ backgroundImage: `url(${d.img})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
              ></div>
              <div className="flex flex-col justify-center items-center p-1 text-center md:h-40 max-h-40 ">
                <p className='text-xl font-semibold sm:text-sm md:text-lg'>{d.name}</p>
                {/* <p className='text-center'>{d.review}</p> */}
                {/* <button className='bg-indigo-500 text-white text-lg py-1 px-4 rounded-xl'>Read More</button> */}
                <p className='text-xl mt-1 font-normal'>{d.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    </div>


  );
};
// Made a array for contain all text info and image paths
const data = [
  {
    name: 'Leaf Tea Packs Qualitea Ceylon (Pvt) Ltd',
    img: 'assets/images/img_1.jpg',
    review: 'A stunning flower that thrives in the most unexpected places, even on the moon!',
    price: '$36.09'
  },
  {
    name: 'Nescafe Clasico, 7 Count Box, Instant Dark Roast Sri Lanka Ubuy',
    img: 'assets/images/img_2.jpg',
    review: 'This flower boasts vibrant colors and can survive in the harshest environments, including space.',
    price: '$36.76'
  },
  {
    name: 'Ceylon Cinnamon Powder - 100g - Tree of Life',
    img: 'assets/images/img_3.jpg',
    review: 'Known for its resilience, this flower can bloom even in the vacuum of space.',
    price: '$36.98'
  },
  {
    name: 'Natural Ceylon Blue Sapphire Online from Sri Lanka',
    img: 'assets/images/img_4.jpg',
    review: 'A delicate flower with the unique ability to thrive under zero-gravity conditions.',
    price: '$36.76'
  },
  {
    name: 'Coconuts with the husk',
    img: 'assets/images/img_5.jpg',
    review: 'This flowers beauty is out of this world, able to grow and flourish on the moon.',
    price: '$36.76'
  },
  {
    name: 'JOBBS MENS CASUAL POLO T-SHIRT Fashion Bug Online Clothing Stores',
    img: 'assets/images/img_6.jpg',
    review: 'An extraordinary flower that defies gravity and thrives in the cosmos.',
    price: '$36.76'
  },
  {
    name: 'Male Crowntail Betta Freshwaterfish Aquariumfish Coburg Aquairum',
    img: 'assets/images/img_7.jpg',
    review: 'This celestial flower can bloom in space, showcasing its otherworldly beauty.',
    price: '$36.76'
  }
];

export default TopSellingProducts;

