"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import RemoveProduct from "./RemoveProduct";

interface ProductData {
  productID: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productProfitMarginPercentage: number;
  productAvailableStokes: number;
  productRatings: number;
  product_visibility: string;
}

interface ChildProps {
  parentData: ProductData;
}

const SingleProduct: React.FC<{
  parentData: ProductData;
  onProductRemoved: () => void;
}> = ({ parentData, onProductRemoved }) => {
  return (
    <div className="bg-gray-200 flex flex-row my-1 border-2 border-red-600">
      {/* Image */}
      <div className="w-1/5 p-2 border-2 border-green-600 flex justify-center items-center">
        <div className="relative w-32 h-32 overflow-hidden">
          <Image
            src={parentData.productImage}
            alt="Product image"
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-3/5 border-2 border-blue-600">
        <p>{parentData.productName}</p>
        {/* ratings */}
        <div className="flex flex-col md:flex-row mt-0 md:mt-1">
          <div className="flex flex-row bg-white pr-1 justify-center sm:justify-normal">
            <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm">Ratings :</p>
            <div className="flex flex-row">
              {Array.from({ length: parentData.productRatings }, (_, index) => (
                <Star key={index} fill="#FFD254" strokeWidth={0} />
              ))}
              {Array.from(
                { length: 5 - parentData.productRatings },
                (_, index) => (
                  <Star
                    key={5 * parentData.productRatings + index}
                    fill="#111"
                    strokeWidth={0}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* remove and visibility */}
      <div className="w-1/5 border-2 border-yellow-600">
        <div>
          <RemoveProduct
            productId={parentData.productID}
            onProductRemoved={onProductRemoved}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
