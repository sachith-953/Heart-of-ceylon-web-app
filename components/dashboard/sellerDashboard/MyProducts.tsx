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
        }
      );

      if (res.ok) {
        const responseData: ProductData[] = await res.json();
        setData(responseData);
      } else if (res.status === 403) {
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        console.log("**** FetchSellerProducts >> 403 ****************");
        console.log("Redirectiong to login. RT error");
        router.push("/seller-log-in");
      } else {
        const data = await res.json();
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description:
            "Please Try Again. There was a problem with your request." +
            data.message,
        });
        console.error("Error fetching seller products!:", res.status);
      }
    } catch (error) {
      console.error("Error fetching seller products:", error);
      setError("Failed to load data. Please try again.");
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "Please Try Again. There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  // Function to handle product removal refresh
  const handleProductRemoved = () => {
    fetchSellerProducts(); // Refresh the products list
  };

  return (
    <div className="bg-white">
      <ListNewProduct />

      {/* Products list */}
      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="ml-2">
          {data.map((d: ProductData) => (
            <div key={d.productID}>
              <SingleProduct
                parentData={d}
                onProductRemoved={handleProductRemoved}
              />
            </div>
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
