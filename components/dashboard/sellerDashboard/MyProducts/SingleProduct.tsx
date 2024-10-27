"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import RemoveProduct from "./RemoveProduct";
import UpdateProductVisibility from "./UpdateProductVisibility";

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
  onVisibilityStatusUpdate: () => void;
}> = ({ parentData, onProductRemoved, onVisibilityStatusUpdate}) => {
  return (
    <div className="bg-gray-100 flex flex-row my-1 rounded border-2 border-red-600">
      {/* Image */}
      <div className="w-1/6 p-2 flex justify-center items-center border-2 border-green-600">
        <div className="relative w-32 h-32 overflow-hidden rounded">
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
      <div className="w-3/6 border-2 border-blue-600">
        <p className="text-lg font-bold">{parentData.productName}</p>
        <div className="flex flex-col ms:flex-row mt-0 md:mt-1 border-2 border-black">
          {/* Product details */}
          <div className="border-2 border-orange-600">
            <p>Unit Price: LKR {parentData.productPrice}</p>
            <p>Profit margin: {parentData.productProfitMarginPercentage}%</p>
            <p>Available stocks: {parentData.productAvailableStokes} units</p>
          </div>
          {/* ratings */}
          <div className="flex flex-row w-2/5 bg-white pr-1 justify-center sm:justify-normal">
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
      <div className="flex flex-col w-2/6 border-2 border-yellow-600">
        {/* remove */}
        <div className="basis-1/3">
          <RemoveProduct
            productId={parentData.productID}
            onProductRemoved={onProductRemoved}
          />
        </div>
        {/* upadate stocks */}
        <div className="basis-1/3 border-2 border-green-800">
          <p>Update stock amount</p>
        </div>
        {/* visibility */}
        <div className="basis-1/3 border-2 border-blue-600">
          <UpdateProductVisibility
            productId={parentData.productID}
            productVisibility={parentData.product_visibility}
            onVisibilityStatusUpdate={onVisibilityStatusUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
