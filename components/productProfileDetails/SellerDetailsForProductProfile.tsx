"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Store, Star } from "lucide-react";
import Link from "next/link"

interface ChildProps {
  pId: number;
}

const SellerDetailsForProductProfile: React.FC<ChildProps> = ({ pId }) => {

  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  interface aboutProductDataType {
    storeName: string;
    sellerStatus: string;
    ratings: string;
    badges: string;
    accountCreatedDate: string;
    categories: string;
    storeDescription: string;
    totalSales: number;
    sellerAddress: string;
    district: string;
    profilePicture: string;
    sellerId: number;
  }

  const [aboutProduct, setAboutProduct] = useState<aboutProductDataType | null>(
    null
  );

  const fetchAboutProduct = async (productId: string) => {
    console.log("Request sending to fetch about product API");

    const res = await fetch(
      `${BASE_URL}/api/product/productProfile/seller-details-for-product-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      setAboutProduct(responseData);
      console.log(responseData);
    } else {
      console.log("Fetching Error!");
    }
  };

  useEffect(() => {
    fetchAboutProduct(String(pId));
    console.log("pId > " + pId);
  }, [pId]);

  return (
    <Card className="w-full bg-gray-300 mb-2">
      <CardHeader>
        <CardTitle className="">Seller of this product</CardTitle>
      </CardHeader>
      <CardContent >
        {aboutProduct ? (
          <div className="flex flex-col lg:flex-row items-start">
            <div className="w-1/4 mr-2 ">
              <Image
                src={aboutProduct.profilePicture}
                alt={aboutProduct.storeName}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
            {/* middle part */}
            <div className="w-3/4 ">
              <div className="flex">
                <Link
                  className="flex"
                  href={{
                    pathname: "/seller-store",
                    query: { sellerId: `${aboutProduct.sellerId}` },
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Store className="mt-1"></Store>
                  <h2 className="text-2xl font-bold ml-2 hover:underline">{aboutProduct.storeName}</h2>
                </Link>

              </div>
              {/* Ratings */}
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="font-medium mt-1">Ratings :</p>
                  <div className="flex flex-row mt-2">
                    {Array.from({ length: Number(aboutProduct.ratings) }, (_, index) => (
                      <Star
                        key={index}
                        fill="#FFD254"
                        strokeWidth={0}
                        className="w-4 h-4"
                      />
                    ))}
                    {Array.from({ length: 5 - Number(aboutProduct.ratings) }, (_, index) => (
                      <Star
                        key={5 * Number(aboutProduct.ratings) + index}
                        fill="#111"
                        strokeWidth={0}
                        className="w-4 h-4"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="">
                <span className="font-medium">Store Description:</span>{" "}
                {aboutProduct.storeDescription}
              </div>
              <div className="">
                <span className="font-medium">Categories:</span>{" "}
                {aboutProduct.categories}
              </div>
              <div className="">
                <span className="font-medium">Total Sales:</span>{" "}
                {aboutProduct.totalSales.toLocaleString()}
              </div>
              <div className="">
                <span className="font-medium">Seller Address:</span>{" "}
                {aboutProduct.sellerAddress}, {aboutProduct.district}
              </div>

            </div>
            <div>
              {/* <div className=" flex">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full ${
                    aboutProduct.sellerStatus === "ACTIVE"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {aboutProduct.sellerStatus}
                </span>
              </div> */}

              {/* <div className="">
                <span className="font-medium">Badges:</span> {aboutProduct.badges}
              </div> */}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SellerDetailsForProductProfile;