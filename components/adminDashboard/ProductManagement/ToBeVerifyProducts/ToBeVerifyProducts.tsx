"use client";

import React, { FC, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import SearchBarForToBeVerifiedProducts from "./SearchBarForToBeVerifiedProducts";
import AllSellerDetailsPopupButton from "../../POPUPwindows/AllSellerDetailsPopupButton/AllSellerDetailsPopupButton";
import ProceedTOApproveProductPOPUPButton from "@/components/adminDashboard/POPUPwindows/ProceedTOApproveProductPOPUPButton/ProceedTOApproveProductPOPUPButton";

interface RatingStarsProps {
  rating: number;
}

export enum ProductStatusEnum {
  PRODUCT_IS_ACTIVE = "PRODUCT_IS_ACTIVE",
  SUSPEND = "SUSPEND",
  DISCONTINUED = "DISCONTINUED",
  VERIFIED = "VERIFIED",
  TO_BE_VERIFIED = "TO_BE_VERIFIED",
  DELETED = "DELETED",
}

export enum ProductVisibilityEnum {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export interface ToBeVerifyProductsData {
  productID: number;
  productName: string;
  productAvailableStokes: number;
  productDescription: string;
  productPrice: number;
  productMainImage: string;
  productWeight: number;
  productDimensions: string;
  productCreatedDate: string;
  productStatus: ProductStatusEnum;
  productNoOfRatings: number;
  productVisibility: ProductVisibilityEnum;
  productRatings: number;
  productTotalItemSold: number;
  productNotes: string;
  productProfitMarginPercentage: number;
  productManufacture: string;
  deleted: boolean;
  sellerID: number;
  productDiscountPrice: number;
}

const ToBeVerifyProducts: FC = () => {
  const [data, setData] = useState<ToBeVerifyProductsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null); // pop up for seller view
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null); // popup product details window
  const [reloadPage, setReloadPage] = useState(false);

  //this handle by child component >> SearchBarForAllOrderDetails
  const handleChildDataChange = (newChildData: ToBeVerifyProductsData[]) => {
    setData(newChildData);
    console.log("child data updated to parent data");
  };

  //this handle by child component >> SearchBarForAllOrderDetails
  const reloadParentFromChild = () => {
    // if reloadPage is ture, them make it false. do this to chenge the useState, se useEffect will re-run
    setReloadPage(!reloadPage);
  };

  const fetchProducts = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/ProductManagement/ToBeVerifyProducts/verify-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestedPage: pageNumber }),
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        if (Array.isArray(responseData) && responseData.length > 0) {
          setData(responseData);
          setHasMorePages(responseData.length >= 10); // Assuming 10 items per page
        } else {
          setHasMorePages(false);
        }
      } else if (res.status === 403) {
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        router.push("/seller-log-in");
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description:
            "Please Try Again. There was a problem with your request. " +
            errorData.message,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load product data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(() => {
        fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

  const handleNextPage = () => {
    if (hasMorePages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  // handle view seller button click
  const handleViewSellerDetails = (sellerID: number) => {
    setSelectedSeller(sellerID);
  };
  // handle proceed to approve button
  const handleViewProductDetails = (productID: number) => {
    setSelectedProduct(productID);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    // <div>
    //     search products component here
    // </div>
    <div className="pl-0 rounded-md ml-1 mr-1">
      <SearchBarForToBeVerifiedProducts
        onChildDataChange={handleChildDataChange}
        clearSearchResults={reloadParentFromChild}
      />

      {/* display products component here */}

      <div className="pl-0 rounded-md ml-1 mr-1">
        <div className="h-9 pb-1">
          <h1 className="text-lg font-bold ml-2">Products To Verify</h1>
        </div>
        {data.map((product) => (
          <Card key={product.productID} className="mb-2">
            {/* div tag for each product */}
            <div className="flex hover:bg-gray-200 rounded-md">
              {/* Section 1: Product Image */}
              <div className="w-1/5 h-44 rounded-md ml-0 relative">
                {/* <img
                                        src={product.productMainImage || "https://www.chilipeppermadness.com/wp-content/uploads/2024/02/Bell-Peppers1.jpg"} // Use a fallback image path
                                        alt={product.productName}
                                        className="w-full h-full object-cover rounded"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://www.chilipeppermadness.com/wp-content/uploads/2024/02/Bell-Peppers1.jpg"; // Path to fallback image
                                        }}
                                    /> */}
                <Image
                  src={product.productMainImage}
                  fill // add 'relative' style to parent element: otherwise images fill whole screen
                  className="object-cover"
                  alt={product.productName}
                />
              </div>

              {/* Section 2: Product Details */}
              <div className="w-2/5 rounded-md p-1 flex flex-col justify-between space-y-4">
                <h2 className="font-semibold text-lg mt-1">
                  {product.productName.length > 70
                    ? `${product.productName.slice(0, 70)}...`
                    : product.productName}
                </h2>

                <p className="text-md">
                  Unit Price: ${product.productPrice.toFixed(2)}
                </p>

                <p className="text-sm">
                  Available Stock: {product.productAvailableStokes}
                </p>

                <h2 className="font-semibold text-lg bg-yellow-200 mb-1">
                  Submitted on :{" "}
                  {new Date(product.productCreatedDate)
                    .toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, ".")}{" "}
                  {new Date(product.productCreatedDate).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </h2>
              </div>

              {/* Section 3: Seller Info & Status */}
              <div className="w-48 space-y-2">
                <p className="text-sm font-medium">
                  Seller ID : {product.sellerID}
                </p>
                {/* Product Manufacture */}
                <p className="text-sm font-medium">
                  Manuf. : {product.productManufacture}
                </p>
                <div className="flex mt-1">
                  <p className="mr-2 text-sm mt-1 font-medium">Status :</p>
                  <Badge className="bg-green-300 text-black px-3 py-1 mt-1">
                    <p className="text-sm ">{product.productStatus}</p>
                  </Badge>
                </div>
              </div>

              {/* Section 4: Action Buttons */}
              <div className="w-1/5 rounded-md p-1 space-y-6">
                <AllSellerDetailsPopupButton sellerID={product.sellerID} />

                <ProceedTOApproveProductPOPUPButton
                  productID={product.productID}
                />
              </div>
            </div>
          </Card>
        ))}

        <div className="flex justify-center mt-6">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            variant="outline"
            className="hover:bg-gray-600 text-black pl-2 bg-gray-400"
          >
            Previous Page
          </Button>
          <span className="py-2">Page {currentPage}</span>
          <Button
            onClick={handleNextPage}
            disabled={!hasMorePages}
            variant="outline"
            className="hover:bg-gray-600 text-black pr-2 bg-gray-400"
          >
            Next Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToBeVerifyProducts;
