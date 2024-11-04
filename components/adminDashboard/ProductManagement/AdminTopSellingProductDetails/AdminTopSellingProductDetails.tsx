"use client";

import React, { FC, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import SearchBarForSearchProductsFromAdminDashboard from "./SearchBarForSearchProductsFromAdminDashboard";
import AllSellerDetailsPopupButton from "../../POPUPwindows/AllSellerDetailsPopupButton/AllSellerDetailsPopupButton";
import AllReviewsAndRatingsPopupButton from "../../POPUPwindows/ProductReviewsAndRatingsPopupButton/ProductReviewsAndRatingsPopupButton";
import ViewAllDetailsOfAProductPOPUPButton from "../../POPUPwindows/ViewAllDetailsOfAProductPOPUPButton/ViewAllDetailsOfAProductPOPUPButton";
import SuspendProductPOPUPWindowButton from "../../POPUPwindows/SuspendProductPOPUPWindowButton/SuspendProductPOPUPWindowButton";
import UnsuspendProductPOPUPWindowButton from "../../POPUPwindows/UnsuspendProductPOPUPWindowButton/UnsuspendProductPOPUPWindowButton";

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

export interface TopSellingProductData {
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

const TopSellingProductDetails: FC = () => {
  const [data, setData] = useState<TopSellingProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null); // pop up for seller view
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null); // pop up for all details of a product
  const [reloadPage, setReloadPage] = useState(false);
  const [reviews, setReviews] = useState<number | null>(null); // pop up for all reviews

  //this handle by child component >> SearchBarForAllOrderDetails
  const handleChildDataChange = (newChildData: TopSellingProductData[]) => {
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
        "http://localhost:3000/api/admin-dashboard/ProductManagement/AdminTopSellingProductDetails/get-top-selling-products",
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
        router.push("/log-in");
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
  }, [currentPage, reloadPage]);

  const handleNextPage = () => {
    if (hasMorePages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onProductSuspend = async () => {
    // Refresh the data after a product is suspended
    setReloadPage((prev) => !prev); // This will trigger a re-fetch of data
    toast({
      title: "Product List Updated",
      description: "The product list has been refreshed after suspension",
    });
  };

  const onProductUnSuspend = async () => {
    // Refresh the data after a product is suspended
    setReloadPage((prev) => !prev); // This will trigger a re-fetch of data
    toast({
      title: "Product List Updated",
      description: "The product list has been refreshed after Unsuspension",
    });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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
    <div className="pl-0 rounded-md ml-1 mr-1">
      <SearchBarForSearchProductsFromAdminDashboard
        onChildDataChange={handleChildDataChange}
        clearSearchResults={reloadParentFromChild}
      />

      <div className="pl-0 rounded-md ml-1 mr-1">
        <div className="h-9 pb-1">
          <h1 className="text-lg font-bold ml-2">Top Selling Products</h1>
        </div>
        {data.map((product) => (
          <Card key={product.productID} className="mb-2">
            {/* div tag for each product */}
            <div className="flex hover:bg-gray-200 rounded-md">
              {/* Section 1: Product Image */}
              <div className="w-1/5 h-44 rounded-md ml-0 relative">
                {/* commented by rashmika to intorduce Image tag which is more optimized */}
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
              <div className="w-2/5 rounded-md p-1">
                <h2 className="font-semibold text-lg">
                  {product.productName.length > 70
                    ? `${product.productName.slice(0, 70)}...`
                    : product.productName}
                </h2>
                {/* make backend API to get product category */}
                {/* <p className="text-sm text-gray-600">Category: {product.productCategory}</p> */}
                <p className="text-md">
                  Unit Price: ${product.productPrice.toFixed(2)}
                </p>
                <p className="text-sm">
                  Profit Margin: {product.productProfitMarginPercentage}%
                </p>
                <p className="text-sm">
                  Available Stock: {product.productAvailableStokes}
                </p>
                <div className="space-y-1">
                  {/* ratings : rashmika*/}
                  <div className="flex flex-col md:flex-row mt-0 md:mt-1 ">
                    <div className="flex flex-row bg-white pr-1 justify-center sm:justify-normal">
                      <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm">
                        Ratings :
                      </p>
                      <div className="flex flex-row">
                        {Array.from(
                          { length: product.productRatings },
                          (_, index) => (
                            <Star key={index} fill="#FFD254" strokeWidth={0} />
                          )
                        )}
                        {Array.from(
                          { length: 5 - product.productRatings },
                          (_, index) => (
                            <Star
                              key={5 * product.productRatings + index}
                              fill="#111"
                              strokeWidth={0}
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* number of product ratings */}
                    <div className="sm:pl-0 md:pl-2">
                      <p className="underline text-xs">
                        {product.productNoOfRatings} product ratings
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Seller Info & Status */}
              <div className="w-48 space-y-2">
                {/* Product Manufacture */}
                <p className="text-sm font-medium">
                  Manuf. : {product.productManufacture}
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium bg-green-300">
                    Product visibility : {product.productVisibility}
                  </p>
                  <p className="text-sm font-medium bg-orange-300">
                    Status : {product.productStatus}
                  </p>
                </div>
                <div className="space-y-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black"
                  >
                    Comments
                  </Button>
                  {/* ratings buton */}
                  <div>
                    <AllReviewsAndRatingsPopupButton
                      productID={product.productID}
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Action Buttons */}
              <div className="w-1/5 rounded-md p-1 space-y-6">
                {/* <Button variant="default" size="sm" className="bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black"
                                    onClick={() => handleViewSellerDetails(product.sellerID)}>
                                    View Seller Details
                                </Button> */}
                <div className="w-full">
                  <AllSellerDetailsPopupButton sellerID={product.sellerID} />
                </div>

                <div>
                  {product.productStatus === ProductStatusEnum.SUSPEND ? (
                    <UnsuspendProductPOPUPWindowButton
                      productID={product.productID}
                      onProductUnSuspend={onProductUnSuspend}
                    />
                  ) : (
                    <SuspendProductPOPUPWindowButton
                      productID={product.productID}
                      onProductSuspend={onProductSuspend}
                    />
                  )}
                </div>
                {/* more details button */}
                <ViewAllDetailsOfAProductPOPUPButton
                  productID={product.productID}
                />
              </div>
            </div>
          </Card>
        ))}
        {/* pagination buttons */}
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

export default TopSellingProductDetails;
