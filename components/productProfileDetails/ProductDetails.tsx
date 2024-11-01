"use client";

import { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import ErrorForCatch from "../ErrorForCatch";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductData {
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

const ProductProfile = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dataFetching = async (productId: number) => {
   
    try {
    
      const res = await fetch('http://localhost:3000/api/product/productProfile/productDetails', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const responseData = await res.json();
        setProduct(responseData);
        console.log("Data Available")
        console.log(responseData)
        setIsLoading(false);
      } else if (res.status === 403) {
        // toast({
        //   title: "Sorry!",
        //   description: "Please Login again. Your Session has Expired!",
        // });
        setIsError(true);
      } else {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to fetch product details",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsError(true);
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    dataFetching(402);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isError || !product) {
    return <ErrorForCatch />;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= product.productAvailableStocks) {
      setQuantity(value);
    }
  };

  const handleBuyNow = () => {
    toast({
      title: "Processing",
      description: "Redirecting to checkout...",
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "Success",
      description: "Added to cart successfully!",
    });
  };

  const handleWholesale = () => {
    toast({
      title: "Wholesale Mode",
      description: "Switching to wholesale pricing...",
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-red-400 shadow-lg rounded-lg overflow-hidden">
      <div className="w-full md:w-2/3">
        <div className="relative h-96 md:h-full">
          <Image
            src={product.productMainImage}
            alt={product.productName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            priority
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.productName}</h2>
          <p className="text-gray-600 text-sm mb-4">{product.productDescription}</p>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xl font-semibold text-green-600">
              {/* LKR {product.productPrice.toLocaleString()} */}
            </p>
            {product.productDiscountPrice > 0 && (
              <p className="text-sm text-gray-500 line-through">
                {/* LKR {product.productDiscountPrice.toLocaleString()} */}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-gray-700">Quantity:</span>
            <input
              type="number"
              min="1"
              max={product.productAvailableStocks}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-2 py-1 border rounded"
            />
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Available: {product.productAvailableStocks} Kg
          </p>
          {product.productRatings > 0 && (
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-700">{product.productRatings.toFixed(1)}</span>
              <span className="text-gray-500 ml-2">
                ({product.productTotalItemSold} sold)
              </span>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Button
            onClick={handleBuyNow}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            variant="default"
          >
            Buy It Now
          </Button>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
            variant="outline"
          >
            Add To Cart
          </Button>
          <Button
            onClick={handleWholesale}
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800"
            variant="outline"
          >
            Wholesale Mode
          </Button>
        </div>
      </div>
    </div>
  );
};


export default ProductProfile;
