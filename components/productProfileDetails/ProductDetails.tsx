"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';


interface ProductProfileDTO {
  productId: number;
  productName: string;
  productAvailableStocks: number;
  productDescription: string;
  productPrice: number;
  productDiscountPrice: number;
  productMainImage: string;
  productOtherImage: string;
  productWeight: number;
  productDimensions: string;
  productRatings: number;
  productTotalItemSold: number;
}

const ProductProfile: React.FC = () => {
  const [product, setProduct] = useState<ProductProfileDTO | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/api/v1/pBuyer/getProductDetails?productId=123');
        const data: ProductProfileDTO = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full md:w-2/3">
        <div className="relative h-96 md:h-full">
          <Image
            src={product.productMainImage}
            alt={product.productName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.productName}</h2>
          <p className="text-gray-600 text-sm mb-4">{product.productDescription}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            LKR {product.productPrice} / ${product.productPrice.toFixed(2)}
          </p>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-gray-700">Quantity:</span>
            <input
              type="number"
              min="1"
              max={product.productAvailableStocks}
              defaultValue="1"
              className="w-16 px-2 py-1 border rounded"
            />
          </div>
          <p className="text-sm text-gray-500 mb-6">Available: {product.productAvailableStocks} Kg</p>
        </div>
        <div className="space-y-3">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" variant="default">
            Buy It Now
          </Button>
          <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800" variant="outline">
            Add To Cart
          </Button>
          <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800" variant="outline">
            Wholesale Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductProfile;