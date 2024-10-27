"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import RemoveProduct from "./RemoveProduct";
import UpdateProductVisibility from "./UpdateProductVisibility";
import UpdateProductStock from "./UpdateProductStock";

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
  onProductStockUpdate: () => void;
}> = ({ parentData, onProductRemoved, onVisibilityStatusUpdate, onProductStockUpdate}) => {
  
  return (

    <div className="bg-gray-100 flex flex-row my-1 rounded">
      {/* Image */}
      <div className="w-1/6 p-2 flex justify-center items-center">
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
      <div className="w-3/6 py-1 px-3">
        <p className="text-lg font-bold">{parentData.productName}</p>
        <div className="flex flex-col ms:flex-row mt-0 md:mt-1">
          {/* Product details */}
          <div className="text-slate-700">
            <p>Unit Price: LKR {parentData.productPrice}</p>
            <p>Profit margin: {parentData.productProfitMarginPercentage}%</p>
            <p>Available stocks: {parentData.productAvailableStokes} units</p>
          </div>
          {/* ratings */}
          <div className="flex flex-row w-5/12 bg-white pr-1 justify-center sm:justify-normal">
            <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm text-slate-700">Ratings :</p>
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

      {/* remove, update stocks and visibility */}
      <div className="flex flex-col w-2/6 p-2">
        {/* remove */}
        <div className="basis-1/3">
          <RemoveProduct
            productId={parentData.productID}
            onProductRemoved={onProductRemoved}
          />
        </div>
        {/* upadate stocks */}
        <div className="basis-1/3">
          <UpdateProductStock
            productId={parentData.productID}
            productAvailableStocks={parentData.productAvailableStokes}
            onProductStockUpdate={onProductStockUpdate}
          />
        </div>
        {/* visibility */}
        <div className="basis-1/3">
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
