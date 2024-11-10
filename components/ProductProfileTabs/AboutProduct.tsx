"use client";

import { useEffect, useState } from "react";
import ItemsDesc from "./ItemDesc";
import ItemSpecifics from "./ItemSpecifics";

interface ChildProps {
  pId: number;
}

const AboutProduct : React.FC<ChildProps> = ({ pId,}) => {

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

//   If you always expect only one item in the aboutProduct array, you can update your state to hold a single object instead of an array:
  const [aboutProduct, setAboutProduct] = useState<aboutProductDataType | null>(null);

  const fetchAboutProduct = async (productId: string) => {
    // Requesting data from NextJs backend
    console.log("request sending to fetch about product API");

    //sending request
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

    //printing response
    if (res.ok) {
      console.log("res" + res);
      const responseData = await res.json();
      setAboutProduct(responseData[0]);
      console.log(responseData[0]);
    } else {
      console.log("Fetching Error!");
    }
  };

  useEffect(() => {
    fetchAboutProduct(pId+""); // convert pid(number) to string just to match the function param datatypes
  }, []);

  return (
    <>
      {/* Parent */}
      <div className="flex flex-col">
        <p className="text-sm">
          Seller assumes all responsibility for this listing.
        </p>
        {/* Item specifications space*/}
        <div className="my-4">
          <h3 className="text-xl font-semibold mb-2">Item specifications</h3>
          {/* Specifications */}
          {/* dealing with a single product's details. */}
          {aboutProduct && <ItemSpecifics specification={aboutProduct}/>}
        </div>

        {/* Item description space */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Item description from the seller
          </h3>
          {/* Description */}
          {/* dealing with a single product's details. */}
          {aboutProduct && <ItemsDesc description={aboutProduct}/>}
        </div>
      </div>
    </>
  );
}

export default AboutProduct
