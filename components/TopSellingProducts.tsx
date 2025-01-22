'use client';

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";

interface TopSellingProduct {
  productName: string;
  productMainImage: string;
  productPrice: number;
  productId: number;
}

const TopSellingProducts = () => {
  const [data, setData] = useState<TopSellingProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const toast = useToast();
  const { toast } = useToast();

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/topSelling`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch top selling products');
        }

        const responseData = await res.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching top selling products:', error);
        setError('Failed to load products. Please try again later.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load top selling products. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopSellingProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="bg-gray-300 p-8">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 pt-5 pb-8 px-4 md:px-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-6">
        Top Selling Products
      </h1>
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : data.length > 0 ? (
          <Slider {...settings}>
            {data.map((product) => (
              <div key={product.productId} className="px-2">
                <div className="bg-white h-[380px] text-black rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <div className="h-56 w-full relative">
                    <Image
                      src={product.productMainImage}
                      alt={product.productName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="rounded-t-xl object-cover"
                      priority={false}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center p-4 text-center h-40">
                    <h2 className="text-lg font-semibold line-clamp-2 mb-2">
                      {product.productName}
                    </h2>
                    <p className="text-xl font-medium text-green-600">
                      ${product.productPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;