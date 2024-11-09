"use client";

import { useEffect, useState } from "react";
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from "next/navigation";
import SingleSellerToBeVerified from "./SellerVerificationComponents/SingleSellerToBeVerified";

interface ToBeVerifySellerData{
  sellerId: number;
  profilePicture: string;
  storeName: string;
  categories: string;
  accountCreatedDate: string;
}

const SellerVerificationCmp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const [data, setData] = useState<ToBeVerifySellerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchToBeVerifiedSellers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/admin-dashboard/seller-verification/get-to-be-verified-sellers`,
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
        const responseData = await res.json();
        setData(responseData);
        console.log("fetch from SellerVerificationCmp >>>" + responseData[0])
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
          description: errorData.message || "Failed to fetch to be verified sellers",
        });
      }
    } catch (error) {
      console.error("Error fetching to be verified sellers:", error);
      setError("Failed to load data. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch to be verified sellers. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToBeVerifiedSellers();
  }, [refreshTrigger])// Add refreshTrigger to dependency array
  
   // Function to trigger a refresh
  const handleRefresh =() => {
    setRefreshTrigger(prev => prev + 1);
  }

  return (
    <div className="bg-white">

      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 p-4">{error}</div>
      ) : data && data.length > 0 ? (
        <div className="space-y-2 p-4">
          {data.map((seller: ToBeVerifySellerData) => (
            <SingleSellerToBeVerified
              key={seller.sellerId}
              parentData={seller}
              onSellerApproval={handleRefresh}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-4">
          No to be verified found. Potential Sellers should be registered to get started!
        </div>
      )}
    </div>
  );
}

export default SellerVerificationCmp
