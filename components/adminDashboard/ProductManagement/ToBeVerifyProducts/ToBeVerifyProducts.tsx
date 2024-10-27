"use client"

import React, { FC, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface RatingStarsProps {
    rating: number;
}

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
    sellerID: number
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

    const fetchProducts = async (pageNumber: number) => {
        try {
            setIsLoading(true);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/verify-product', {
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
    return(
        // <div>
        //     search products component here
        // </div>
        <div className="pl-0 rounded-md ml-1 mr-1">
            <MaxWidthWrapper>
                <div className="flex flex-col gap-10 items-center p-6 ">
                <div className="items-start flex flex-row w-full sm:w-2/3 max-w-96 sm:max-w-screen-md">
                    <div className="relative flex flex-col w-full">
                    <div className="flex flex-row w-full">
                        <input 
                        type="text" 
                        className="z-40 px-5 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none focus:bg-gray-300"
                        placeholder="Search orders..."
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button 
                        className="z-40 bg-gray-300 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover:text-white"
                        // onClick={handleSearch}
                        >
                        Search
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </MaxWidthWrapper>
            {/* display products component here */}

            <div className="pl-0 rounded-md ml-1 mr-1">
                <div className='h-9 pb-1'>
                    <h1 className="text-lg font-bold ml-2">Products To Verify</h1>
                </div>
                    {data.map((product) => (
                        <Card key={product.productID} className="mb-2">
                            {/* div tag for each product */}
                            <div className="flex hover:bg-gray-200 rounded-md">
                                {/* Section 1: Product Image */}
                                <div className="w-1/5 h-44 rounded-md ml-0">
                                    <img
                                        src={product.productMainImage || "https://www.chilipeppermadness.com/wp-content/uploads/2024/02/Bell-Peppers1.jpg"} // Use a fallback image path
                                        alt={product.productName}
                                        className="w-full h-full object-cover rounded"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://www.chilipeppermadness.com/wp-content/uploads/2024/02/Bell-Peppers1.jpg"; // Path to fallback image
                                        }}
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
                                            Submitted on : {new Date(product.productCreatedDate).toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            }).replace(/\//g, '.')} {new Date(product.productCreatedDate).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </h2>
                                </div>

                                {/* Section 3: Seller Info & Status */}
                                <div className="w-48 space-y-2">
                                    <p className="text-sm font-medium">Seller ID : {product.sellerID}</p>
                                    {/* Product Manufacture */}
                                    <p className="text-sm font-medium">Manuf. : {product.productManufacture}</p>
                                </div>

                                {/* Section 4: Action Buttons */}
                                <div className="w-1/5 rounded-md p-1 space-y-6">
                                    <Button variant="default" size="sm" className="bg-blue-500 w-full hover:bg-blue-700 text-white">
                                        View Seller Details
                                    </Button>
                                    <Button variant="outline" size="sm" className="bg-green-500 w-full hover:bg-green-700 text-white">
                                        Proceed To Approval
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}

                <div className="flex justify-center mt-6">
                    <Button 
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        variant="outline"
                        className='hover:bg-gray-600 text-black pl-2 bg-gray-400'
                    >
                        Previous Page
                    </Button>
                    <span className="py-2">Page {currentPage}</span>
                    <Button 
                        onClick={handleNextPage}
                        disabled={!hasMorePages}
                        variant="outline"
                        className='hover:bg-gray-600 text-black pr-2 bg-gray-400'
                    >
                        Next Page
                    </Button>
                </div>
            </div> 
        </div>    
    );
};

export default ToBeVerifyProducts;



