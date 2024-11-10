import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2, Store, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import AllSellerDetailsPopupButton from "../AllSellerDetailsPopupButton/AllSellerDetailsPopupButton";
import { FC, useState } from "react";
import ApproveProductPOPUPButton from "../ApproveProductPOPUPButton/ApproveProductPOPUPButton";
import RejectProductPOPUPButton from "../RejectProductPOPUPButton/RejectProductPOPUPButton";
import UpdateProfitMarginPOPUPButton from "../UpdateProfitMarginPOPUPButton/UpdateProfitMarginPOPUPButton";

interface ProductApprovalProps {
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

const ProceedTOApproveProductPOPUPButton: React.FC<ChildProps> = ({
  productID,
}) => {
  const [product, setProduct] = React.useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sellerId, setSellerId] = React.useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const [reloadPage, setReloadPage] = useState(false);

  const fetchProductDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        "http://localhost:3000/api/admin-dashboard/POPUPwindows/POPUP-product-approval-Window",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productID }),
          credentials: "include",
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        setProduct(responseData);
        setSellerId(responseData.sellerID);
        console.log("responseData.sellerID" + responseData.sellerID);
      } else if (res.status === 403) {
        setProduct(null);
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
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

  const onProductApprove = async () => {
    // Refresh the data after a product is suspended
    setReloadPage((prev) => !prev); // This will trigger a re-fetch of data
    toast({
      title: "Product List Updated",
      description: "The product list has been refreshed after Approve product",
    });
  };

  const onProductUpdateProfitMargin = async () => {
    setReloadPage((prev) => !prev); // Toggling reloadPage to trigger useEffect
    toast({
      title: "Page Updated",
      description: "The page has been refreshed after Updating Profit margin",
    });
  };

  const onProductReject = async () => {
    // Refresh the data after a product is suspended
    setReloadPage((prev) => !prev); // This will trigger a re-fetch of data
    toast({
      title: "Product List Updated",
      description: "The product list has been refreshed after Reject product",
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
          className="bg-green-600 w-full hover:bg-green-800 text-white hover:text-black"
        >
          Proceed To Approve
        </Button>
      </DialogTrigger>

      <DialogContent className="w-11/12 max-w-full h-full p-6">
        {/*overflow-y-auto is the scroll bar */}
        <DialogHeader className="">
          <DialogTitle className="text-4xl font-bold text-black text-center rounded-md mt-5">
            Product Approval
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : product ? (
          <div className="flex h-full overflow-y-auto">
            {/* Left Sidebar - 1/4 width */}
            <div className="w-1/4 border-r border-gray-300 flex flex-col rounded-md ml-1 mr-1 mb-1 mt-0 p-2">
              {/* Profile Picture */}
              <div className="flex justify-center w-full p-1">
                {product.productMainImage ? (
                  <img
                    src={product.productMainImage}
                    alt="Product Image"
                    className="w-42 h-60 object-cover rounded-3xl"
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
                <AllSellerDetailsPopupButton sellerID={sellerId} />
              </div>
            </div>

            {/* Right Content - 3/4 width */}
            <div className="w-3/4 p-4 mr-1 mb-1 rounded-md overflow-y-auto">
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
                  {/* product caregories not there in coming data from backend */}
                  <div className="text-lg font-bold text-black mt-5 p-1">
                    Unit Price: ${product.productPrice}
                  </div>
                  <div className="text-lg font-bold text-black mt-1 p-1">
                    Available Stock: {product.productAvailableStokes}
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4  pl-2">
                <div className="text-lg text-black ">
                  <strong>Description:</strong>
                  <p className="bg-gray-400 mt-1 p-1 rounded-md">
                    {product.productDescription}
                  </p>
                </div>

                <div className="text-lg text-black flex">
                  <strong className="mr-1">Listed Date & Time:</strong>
                  <p>
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
                    <strong>Total Items Sold:</strong>{" "}
                    {product.productTotalItemSold}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-lg text-black">
                    <strong>Profit Margin:</strong>{" "}
                    {product.productProfitMarginPercentage}%
                  </div>
                  {/* update profit margin button */}
                  <UpdateProfitMarginPOPUPButton
                    productID={product.productID}
                    ProfitMarginPercentage={
                      product.productProfitMarginPercentage
                    }
                    onProductUpdateProfitMargin={onProductUpdateProfitMargin}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-lg font-bold text-black">
                    Additonal Details Email Should Have
                  </div>
                  <div className="text-lg text-black bg-gray-400 rounded-md p-1 pl-3">
                    <p className="text-red-600">
                      THIS IS NOT CONSIDERED YET WITH THE TEAM
                    </p>
                  </div>
                </div>
                <div className=" flex">
                  <div className="w-1/5 mr-10">
                    {product.productStatus === "TO_BE_VERIFIED" && (
                      <div className="w-full">
                        <ApproveProductPOPUPButton
                          productID={product.productID}
                          onProductApprove={onProductApprove}
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-1/5">
                    <RejectProductPOPUPButton
                      productID={product.productID}
                      onProductReject={onProductReject}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ProceedTOApproveProductPOPUPButton;
