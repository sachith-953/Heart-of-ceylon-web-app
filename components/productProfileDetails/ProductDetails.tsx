"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddToCartButton from "./AddToCartButton";


interface ChildProps {
  pId: number;
}

const AboutProduct: React.FC<ChildProps> = ({ pId }) => {

  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  interface aboutProductDataType {
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

  const [aboutProduct, setAboutProduct] = useState<aboutProductDataType | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  const fetchAboutProduct = async (productId: string) => {
    // Requesting data from NextJs backend
    console.log("request sending to fetch about product API");

    // sending request
    const res = await fetch(
      `${BASE_URL}/api/product/productProfile/aboutProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    // printing response
    if (res.ok) {
      console.log("res" + res);
      const responseData = await res.json();
      setAboutProduct(responseData[0]);
      console.log(responseData[0]);
    } else {
      console.log("Fetching Error!");
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    fetchAboutProduct(pId + ""); // convert pid(number) to string just to match the function param datatypes
    console.log("pId > " + pId);
  }, [pId]);

  if (!aboutProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Product Image */}
      <div className="w-full md:w-2/3">
        <div className="relative h-96 md:h-full">
          <Image
            src={aboutProduct.productMainImage}
            alt={aboutProduct.productName}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </div>

      {/* Product details */}
      <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {aboutProduct.productName}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {aboutProduct.productDescription}
          </p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            ${aboutProduct.productPrice}
          </p>
          <div className="flex items-center mb-4">
          <p className="text-xl my-1">Quantity:</p>
                  <div className="flex items-center">
                    <button onClick={handleDecreaseQuantity} className=" text-black py-1 px-3 rounded-lg bg-gray-400 text-xl font-bold">-</button>
                    <span className="px-3">{quantity}</span>
                    <button onClick={handleIncreaseQuantity} className=" text-black py-1 px-3 rounded-lg bg-gray-400 text-xl font-bold">+</button>
                  </div>
          </div>
          <p className="text-sm text-gray-500 mb-6 font-semibold">
            Available: {aboutProduct.productAvailableStocks}
          </p>
          <p className="text-sm text-gray-500 mb-6 font-semibold">
            Total items sold: {aboutProduct.productTotalItemSold}
          </p>
        </div>
        <div className="space-y-3">

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" variant="default">
            Buy It Now
          </Button>

          {/* add to cart button */}
          <div>
            <AddToCartButton pid={pId} />
          </div>

          <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800" variant="outline">
            Wholesale Mode
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;