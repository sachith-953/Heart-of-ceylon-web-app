"use client"

import React, { FC, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";

interface RatingStarsProps {
    rating: number;
}

// ************ commented this part by rashmika due to addition of new start code *************
// const RatingStars: FC<RatingStarsProps> = ({ rating }) => {
//     const totalStars = 10;
//     const filledStars = Math.min(rating, totalStars);
    
//     return (
//         <div className="flex gap-0.5">
//             {[...Array(totalStars)].map((_, index) => (
//                 <Star
//                     key={index}
//                     size={16}
//                     className={index < filledStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//                 />
//             ))}
//         </div>
//     );
// };

export enum ProductStatusEnum {
    PRODUCT_IS_ACTIVE = 'PRODUCT_IS_ACTIVE',
    SUSPEND = 'SUSPEND',
    DISCONTINUED = 'DISCONTINUED',
    VERIFIED = 'VERIFIED',
    TO_BE_VERIFIED = 'TO_BE_VERIFIED',
    DELETED = 'DELETED'
}

export enum ProductVisibilityEnum {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
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

    const fetchProducts = async (pageNumber: number) => {
        try {
            setIsLoading(true);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/get-top-selling-products', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ requestedPage: pageNumber }),
            });

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
                    description: "Please Try Again. There was a problem with your request. " + errorData.message,
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
    }, [currentPage]);

    const handleNextPage = () => {
        if (hasMorePages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
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
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        // <div>
        //     search products component here
        // </div>
        <div className="container mx-auto p-4 ml-1 rounded-md">
            <h1 className="text-2xl font-bold mb-6">Top Selling Products</h1>
            
            <div className="space-y-4 ml-0">
                {data.map((product) => (
                    <Card key={product.productID} className="p-1">
                        <div className="flex gap-4 hover:bg-gray-100 rounded-md">
                            {/* Section 1: Product Image */}
                            <div className="w-48 h-48 flex-shrink-0">
                                <img
                                    src={product.productMainImage}
                                    alt={product.productName}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>

                            {/* Section 2: Product Details */}
                            <div className="flex-grow space-y-2">
                                <h2 className="font-semibold text-lg">{product.productName}</h2>
                                {/* make backend API to get product category */}
                                {/* <p className="text-sm text-gray-600">Category: {product.productCategory}</p> */}
                                <p className="text-md">Unit Price: ${product.productPrice.toFixed(2)}</p>
                                <p className="text-sm">Profit Margin: {product.productProfitMarginPercentage}%</p>
                                <p className="text-sm">Available Stock: {product.productAvailableStokes}</p>
                                <div className="space-y-1">

                                    {/* commented by rashmika since ratings add from new star code */}
                                    {/* <p className="text-sm">Ratings ({product.productNoOfRatings})</p> */}
                                    
                                    {/* commented this part by rashmika due to addition of new code */}
                                    {/* <RatingStars rating={product.productNoOfRatings} /> */}
                                    
                                    {/* ratings : rashmika*/}
                                    <div className="flex flex-col md:flex-row mt-0 md:mt-1 ">

                                        <div className="flex flex-row bg-white pr-1 justify-center sm:justify-normal">

                                            <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm">Ratings :</p>
                                            <div className="flex flex-row">
                                                {Array.from({ length: product.productRatings }, (_, index) => (
                                                    <Star key={index} fill="#FFD254" strokeWidth={0} />
                                                ))}
                                                {Array.from({ length: 5 - product.productRatings }, (_, index) => (
                                                    <Star key={5 * product.productRatings + index} fill="#111" strokeWidth={0} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* number of product ratings */}
                                        <div className="sm:pl-0 md:pl-2">
                                            <p className="underline text-xs">{product.productNoOfRatings} product ratings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Seller Info & Status */}
                            <div className="w-48 space-y-2">
                                {/* Product Manufacture */}
                                <p className="text-sm font-medium">Manuf. : {product.productManufacture}</p>
                                <div className="space-y-1">
                                    <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                                        {product.productVisibility}
                                    </span>
                                    <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                                        {product.productStatus}
                                    </span>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Comments
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Ratings
                                    </Button>
                                </div>
                            </div>

                            {/* Section 4: Action Buttons */}
                            <div className="w-40 space-y-2">
                                <Button variant="default" size="sm" className="w-full">
                                    View Seller Details
                                </Button>
                                <Button variant="destructive" size="sm" className="w-full">
                                    Suspend
                                </Button>
                                <Button variant="outline" size="sm" className="w-full">
                                    All Details
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <Button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                >
                    Previous Page
                </Button>
                <span className="py-2">Page {currentPage}</span>
                <Button 
                    onClick={handleNextPage}
                    disabled={!hasMorePages}
                    variant="outline"
                >
                    Next Page
                </Button>
            </div>
        </div>
    );
};

export default TopSellingProductDetails;