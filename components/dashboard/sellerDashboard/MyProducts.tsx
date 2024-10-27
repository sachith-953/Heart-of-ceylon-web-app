"use client";

import { useEffect, useState } from "react";
import ListNewProduct from "./MyProducts/ListNewProduct";
import SingleProduct from "./MyProducts/SingleProduct";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

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

const MyProducts = () => {
  const router = useRouter();
  const { toast } = useToast();
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const [data, setData] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchSellerProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/seller-dashboard/get-seller-products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Add cache: 'no-store' to prevent caching
          cache: 'no-store'
        }
      );

      if (res.ok) {
        const responseData: ProductData[] = await res.json();
        setData(responseData);
      } else if (res.status === 403) {
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Please login again to continue.",
        });
        router.push("/seller-log-in");
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.message || "Failed to fetch products",
        });
      }
    } catch (error) {
      console.error("Error fetching seller products:", error);
      setError("Failed to load data. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, [refreshTrigger]); // Add refreshTrigger to dependency array

  // Function to trigger a refresh
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-white">
      <ListNewProduct />

      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 p-4">{error}</div>
      ) : data && data.length > 0 ? (
        <div className="space-y-2 p-4">
          {data.map((product: ProductData) => (
            <SingleProduct
              key={product.productID}
              parentData={product}
              onProductRemoved={handleRefresh}
              onVisibilityStatusUpdate={handleRefresh}
              onProductStockUpdate={handleRefresh}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-4">
          No products found. Add some products to get started!
        </div>
      )}
    </div>
  );
};

export default MyProducts;