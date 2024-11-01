import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
  import { Badge } from "@/components/ui/badge";
  import { useToast } from "@/components/ui/use-toast";
  import { useRouter } from "next/navigation";
  import { Button } from "@/components/ui/button";
  import React, { FC, useEffect, useState } from 'react';
  import { 
    Loader2, 
    Store,
    Star,
  } from "lucide-react";
import AllSellerDetailsPopupButton from "../AllSellerDetailsPopupButton/AllSellerDetailsPopupButton";
import AllReviewsAndRatingsPopupButton from "../ProductReviewsAndRatingsPopupButton/ProductReviewsAndRatingsPopupButton";
import SuspendProductPOPUPWindowButton from "../SuspendProductPOPUPWindowButton/SuspendProductPOPUPWindowButton";
import RemoveProductPOPUPButton from "../RemoveProductPOPUPButton/RemoveProductPOPUPButton";
  
  
interface ProductAllDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    productID: number;
}

interface ProductDetails {
    productID: number;
    productName: string;
    productAvailableStokes: number;
    productDescription: string;
    productPrice: number;
    productMainImage: string;
    productWeight: number;
    productDimensions: string;
    productCreatedDate: string;
    productStatus: string;
    productNoOfRatings: number;
    productVisibility: string;
    productRatings: number;
    productTotalItemSold: number;
    productNotes: string;
    productProfitMarginPercentage: number;
    productManufacture: string;
    deleted: boolean;
    sellerID: number;
    productDiscountPrice: number;
}

interface ChildProps {
    productID: number;
}

const ViewAllDetailsOfAProductPOPUPButton:  React.FC<ChildProps> = ({ productID, }) => {

    const [product, setProduct] = React.useState<ProductDetails | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [reloadPage, setReloadPage] = useState(false); // Added reload state

  
    const fetchProductDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUPwindows/POPUP-view-product-all-details-by-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productID }),
                credentials: 'include',
            });
      
            if (res.ok) {
                const responseData = await res.json();
                setProduct(responseData);
            } else if (res.status === 403) {
                setProduct(null);
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                await new Promise(resolve => setTimeout(resolve, 100));
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

    // Updated onProductSuspend function to trigger re-fetching of data
    const onProductSuspend = async () => {
        setReloadPage(prev => !prev); // Toggling reloadPage to trigger useEffect
        toast({
            title: "Page Updated",
            description: "The page has been refreshed after suspension",
        });
    };

      // Updated onProductDeleted function to trigger re-fetching of data
      const onProductDeleted = async () => {
        setReloadPage(prev => !prev); // Toggling reloadPage to trigger useEffect
        toast({
            title: "Page Updated",
            description: "The page has been refreshed after remove product",
        });
    };

   // Updated useEffect to include reloadPage as a dependency
    useEffect(() => {
        if (productID !== null && productID !== 0) {
            fetchProductDetails();
        }
    }, [productID, reloadPage]);

    return (
        <Dialog>

            <DialogTrigger asChild>
                {/* this button is the on which visible to outside */}
                <Button
                    variant="outline"
                    className='bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black'
                >
                    All Details
                </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 max-w-full h-full p-6"> 
            {/*overflow-y-auto is the scroll bar */}
                <DialogHeader className="">
                    <DialogTitle className="text-xl font-bold text-black text-center rounded-md p-2">
                        Product All Details
                    </DialogTitle>
                </DialogHeader>
          
                {isLoading ? (
                    <div className="flex justify-center items-center h-[60vh]">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 p-4">{error}</div>
                ) : product ? (
                    <div className="flex h-full mt-0 overflow-y-auto">
                        {/* Left Sidebar - 1/4 width */}
                        <div className="w-1/4 border-r border-gray-300 flex flex-col bg-gray-300 rounded-md ml-1 mr-1 mb-1 mt-0 p-2">
                            {/* Profile Picture */}
                            <div className="flex justify-center w-full mb-4 p-1">
                                {product.productMainImage ? (
                                    <img 
                                        src={product.productMainImage} 
                                        alt="Product Image" 
                                        className="w-42 h-full object-cover rounded-3xl"
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-md bg-gray-200 flex items-center justify-center">
                                        <Store className="h-20 w-20 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 mt-6 items-center justify-center p-1">
                                 {/* <button
                                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded w-2/3 px-4 hover:text-black">
                                    View Seller Details
                                </button> */}
                                <div className="w-2/3 mx-5">
                                    <AllSellerDetailsPopupButton sellerID={product.sellerID} />
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded w-2/3 px-4 hover:text-black">
                                    Comments
                                </button>
                                {/*ratings button  */}
                                <div className="w-2/3 ">
                                    <AllReviewsAndRatingsPopupButton productID={product.productID} />
                                </div>
                                

                            </div>

                            {/* Bottom Buttons */}
                            <div className="mt-auto flex flex-col gap-3 p-2 mb-4 items-center justify-center">
                                {/* suspend product */}
                                <div>
                                    <SuspendProductPOPUPWindowButton 
                                        productID={product.productID}
                                        onProductSuspend={onProductSuspend}
                                    />
                                </div>
                                {/* remove product button */}
                                <div>
                                    <RemoveProductPOPUPButton
                                        productID={product.productID}
                                        onProductDeleted = {onProductDeleted}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Right Content - 3/4 width */}
                        <div className="w-3/4 p-4 bg-gray-300 mr-1 mb-1 rounded-md overflow-y-auto">
                            {/* Product Name and ID */}
                            <div className="text-4xl font-bold text-black mb-4 rounded-md p-1">
                                {product.productName}
                            </div>

                            {/* Main Product Info */}
                            <div className="grid grid-cols-2 mb-1 rounded-md p-0">
                                <div className=" rounded-md p-1 mr-1">
                                    <div className="text-lg font-bold text-black p-1">
                                        Product ID: {product.productID}
                                    </div>
                                    <div className="text-lg font-bold text-black mt-1 p-1">
                                        Unit Price: ${product.productPrice}
                                    </div>
                                    <div className="text-lg font-bold text-black mt-1 p-1">
                                        Available Stock: {product.productAvailableStokes}
                                    </div>
                                </div>
                                <div className="rounded-md p-1">
                                    {/* Ratings */}
                                    <div className="flex items-center p-1">
                                        <span className="mr-2 text-lg font-bold">Ratings:</span>
                                        <div className="flex mt-1">
                                            {Array.from({ length: product.productRatings }, (_, index) => (
                                                <Star key={index} fill="#FFD254" strokeWidth={0} className="w-4 h-4" />
                                            ))}
                                            {Array.from({ length: 5 - product.productRatings }, (_, index) => (
                                                <Star key={5 * product.productRatings + index} fill="#111" strokeWidth={0} className="w-4 h-4" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex mt-1 p-1">
                                        <p className='mr-2 text-lg font-bold'>Visibility :</p>
                                        <Badge className="bg-orange-300 text-black px-4 py-1 mt-1">
                                        <p className='text-xl '>{product.productVisibility}</p>
                                        </Badge>
                                    </div>
                                    <div className="flex mt-1 p-1">
                                        <p className='mr-6 text-lg font-bold'>Status :</p>
                                        <Badge className="bg-green-300 text-black px-4 py-1 mt-1">
                                        <p className='text-xl '>{product.productStatus}</p>
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-4  pl-2">
                                <div className="text-lg text-black ">
                                    <strong >Description:</strong>
                                    <p className="bg-gray-400 mt-1 p-1 rounded-md">{product.productDescription}</p>
                                </div>

                                <div className="text-lg text-black flex">
                                    <strong className="mr-1">Listed Date & Time:</strong>
                                    <p>
                                        {new Date(product.productCreatedDate).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        }).replace(/\//g, '.')} {new Date(product.productCreatedDate).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-lg text-black">
                                        <strong>Weight:</strong> {product.productWeight}
                                    </div>
                                    <div className="text-lg text-black">
                                        <strong>Dimensions:</strong> {product.productDimensions}
                                    </div>
                                    <div className="text-lg text-black">
                                        <strong>Manufacturer:</strong> {product.productManufacture}
                                    </div>
                                    <div className="text-lg text-black">
                                        <strong>Total Items Sold:</strong> {product.productTotalItemSold}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-lg text-black">
                                        <strong>Profit Margin:</strong> {product.productProfitMarginPercentage}%
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded w-1/5 px-4 hover:text-black">
                                        Update
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-lg font-bold text-black">Notes</div>
                                    <div className="text-lg text-black bg-gray-400 rounded-md p-1 pl-3">
                                        {
                                            (() => {
                                                try {
                                                    return JSON.parse(product.productNotes).newNote || '';
                                                } catch (e) {
                                                    console.error("Invalid JSON format in productNotes:", product.productNotes);
                                                    return 'Invalid Notes Format';
                                                }
                                            })()
                                        }
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded w-1/5 px-4 hover:text-black">
                                        Update Notes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

            </DialogContent>
        </Dialog>
    );
};

export default ViewAllDetailsOfAProductPOPUPButton;