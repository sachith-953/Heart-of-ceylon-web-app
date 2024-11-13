"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "@/lib/utils";

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchAboutProduct = async (productId: string) => {
    setIsLoading(true);
    console.log("request sending to fetch about product API");

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

    if (res.ok) {
      console.log("res" + res);
      const responseData = await res.json();
      setAboutProduct(responseData[0]);
      setIsLoading(false);
      console.log(responseData[0]);
    } else {
      setIsLoading(false);
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
    fetchAboutProduct(pId + "");
    console.log("pId > " + pId);
  }, [pId]);

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Product Image >> ration : width=>800 : height=>600*/}
      <div className="w-full md:w-3/5 px-2 md:px-0">
        {isLoading ? (
          <div className="relative h-60 sm:h-96 w-full bg-gray-200 animate-pulse" />
        ) : (
          <div className="relative w-full h-60 sm:h-96 md:h-full">
            <Image
              src={aboutProduct?.productMainImage || ""}
              alt={aboutProduct?.productName || ""}
              fill
              className="rounded-md object-cover z-10"
            />
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="w-full md:w-2/5 p-6 flex flex-col justify-between">
        {isLoading ? (
          <div>
            <div className="h-8 w-3/4 bg-gray-200 animate-pulse mb-4" />
            <div className="h-6 w-1/2 bg-gray-200 animate-pulse mb-4" />
            <div className="h-4 w-full bg-gray-200 animate-pulse mb-4" />
            <div className="h-4 w-full bg-gray-200 animate-pulse mb-4" />
            <div className="flex space-x-3">
              <div className="h-8 w-16 bg-gray-200 animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 animate-pulse" />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {aboutProduct?.productName}
            </h2>
            <p className="text-xl font-semibold text-green-600 mb-4">
              {formatPrice(aboutProduct?.productPrice || 0)}
            </p>
            <div className="flex items-center mb-4">
              <p className="text-xl my-1">Quantity:</p>
              <div className="flex items-center">
                <button
                  onClick={handleDecreaseQuantity}
                  className=" text-black py-1 px-3 rounded-lg bg-gray-400 text-xl font-bold"
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className=" text-black py-1 px-3 rounded-lg bg-gray-400 text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6 font-semibold">
              Available: {aboutProduct?.productAvailableStocks}
            </p>
            <p className="text-sm text-gray-500 mb-6 font-semibold">
              Total items sold: {aboutProduct?.productTotalItemSold}
            </p>
          </div>
        )}

        {isLoading ? (
          <p></p>
        ) : (
          <div className="space-y-3">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              variant="default"
            >
              Buy It Now
            </Button>

            {/* add to cart button */}
            <div>
              <AddToCartButton pid={pId} />
            </div>

            <Button
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800"
              variant="outline"
            >
              Wholesale Mode
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AboutProduct;