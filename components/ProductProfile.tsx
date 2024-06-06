/* eslint-disable @next/next/no-img-element */

'use client';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductProfile = () => {
  const [images, setImages] = useState({
    img1: "https://th.bing.com/th/id/R.97bb22f1e770d7959b21acb3b9e0e235?rik=fdIfM5pO3534rw&pid=ImgRaw&r=0",
  });

  const [activeImg, setActiveImage] = useState(images.img1);
  const [amount, setAmount] = useState(1);

  //main container
  return (
    <div className='flex flex-col justify-between lg:flex-row gap-4 lg:gap-6 lg:items-start'>
        <Navbar />
      <div className='flex flex-col gap-4 lg:w-1/2'>
        <div className='flex justify-center'>
          <img src={activeImg} alt="" className='max-w-full h-auto lg:max-w-none lg:w-80 lg:h-80 md:w-60 md:h-60 xs:w-30 xs:h-30 object-cover rounded-xl' />
        </div>
      </div>
      {/* About the product */}
      <div className='flex flex-col gap-4 lg:w-1/2'>
        <div>
          <span className='text-violet-600 font-semibold'>Made in Sri Lanka</span>
          <h1 className='text-3xl font-bold'>Ceylon Black Tea</h1>
        </div>
        <div><p className='text-gray-800'>
          Sri Lanka, formerly known as Ceylon, is one of the world{"'"}s major tea-producing countries.
          The tea industry in Sri Lanka dates back to the 19th century when British colonists introduced tea cultivation to the island.
        </p></div>
        <h6 className='text-2xl font-semibold'>LKR 1500.00 <p>Approximately $ 5.00</p></h6>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold'>Shipping and Payment Information</h2>
          <p className='text-gray-700 mt-2'>
            <strong>Shipping:</strong><br/>
            Free Standard Shipping. See details<br/>
            International shipment of items may be subject to customs processing and additional charges.<br/>
            Located in: SHANGHAI, China<br/>
            <strong>Delivery:</strong><br/>
            Estimated between Wed, Mar 27 and Wed, Apr 17<br/>
            Please note the delivery estimate is greater than 11 business days. Please allow additional time if international delivery is subject to customs processing.<br/>
            <strong>Returns:</strong><br/>
            Seller does not accept returns. See details<br/>
            <strong>Payments:</strong><br/>
          </p>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <div className='flex flex-row items-center'>
            <button 
              className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-2xl' 
              onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span className='py-2 px-4 rounded-lg'>{amount}</span>
            <button 
              className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-2xl' 
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className='bg-violet-800 text-white font-semibold py-2 px-4 rounded-xl'>
            Add to Cart
          </button>
          <button className='bg-violet-800 text-white font-semibold py-2 px-4 rounded-xl'>
            Buy it now
          </button>
          <button className='bg-violet-800 text-white font-semibold py-2 px-4 rounded-xl'>
            Add to watchlist
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductProfile;
