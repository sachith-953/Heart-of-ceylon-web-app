"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import React from 'react'
import ErrorForCatch from "@/components/ErrorForCatch";
import SellerDetailsCard from "../sellerDetailsCard/SellerDetailsCard";
import SearchBarForSearchSellerCom from "../SearchBarForSearchSeller/SearchBarForSearchSellerCom";
import SearchBarForSearchSellerCom2 from "../SearchBarForSearchSellerCom/searchBarForSearchSellerCom2";

interface SellerData {
  profilePicture: string;
  storeName: string;
  sellerID: number;
  categories: string;
  sellerStatus: string;
  badges: string;
  ratings: number;
}

const FindASellerCmp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Initialize with explicit type
  const [data, setData] = useState<SellerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalResultFound, setTotalResultFound] = useState(0);
  const [currentPage, setCurrentPage] = useState("1");
  const [isMobile, setIsMobile] = useState(false);

  const [parentData, setParentData] = useState('Initial Parent Data');
  const [childData, setChildData] = useState('');
  


  const searchQuery = searchParams.get("query");

  const pushToLogin = () => {
    console.log("pushed to login");
    router.push("/log-in");
  };

  const fetchAllSellers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:3000/api/admin-dashboard/get-find-a-seller",
        { cache: 'no-store' }
      );

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Please login again. Your session has expired.",
          });
          pushToLogin();
          return;
        }
        throw new Error('Failed to fetch sellers');
      }

      const responseData = await res.json();
      console.log('Fetch All Sellers Response:', responseData);
      console.log('Response Type:', typeof responseData);
      console.log('Is Array?', Array.isArray(responseData));

      // Handle different response formats
      let processedData: SellerData[] = [];

      if (Array.isArray(responseData)) {
        processedData = responseData;
      } else if (typeof responseData === 'object' && responseData !== null) {
        // Check for common wrapper properties
        if (Array.isArray(responseData.data)) {
          processedData = responseData.data;
        } else if (Array.isArray(responseData.sellers)) {
          processedData = responseData.sellers;
        } else if (Array.isArray(responseData.results)) {
          processedData = responseData.results;
        }
      }

      console.log('Processed Seller Data:', processedData);

      // Validate the processed data
      if (!Array.isArray(processedData)) {
        throw new Error('Failed to process seller data into valid format');
      }

      setData(processedData);

    } catch (error) {
      console.error('Error in fetchAllSellers:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setIsError(true);
      setData([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const page = searchParams.get("page") || "1";
  //   setCurrentPage(page);

  //   if (searchQuery) {
  //     handleProductSearch(searchQuery, page);
  //   } else {
  //     fetchAllSellers();
  //   }
  // }, [searchParams, searchQuery]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Debug log the current state of data
  console.log('Render - Current data:', data);
  console.log('Render - Data type:', typeof data);
  console.log('Render - Is Array?', Array.isArray(data));

  if (isError) {
    return <ErrorForCatch />;
  }

  if (isLoading) {
    return <div className="p-4">Loading sellers...</div>;
  }

  // Ensure data is an array before rendering
  const sellers = Array.isArray(data) ? data : [];

  // This use for get search word from search child component


  const handleChildDataChange = (newChildData: string) => {
    setChildData(newChildData);
    console.log("child is calling" + newChildData)
  };


  return (
    <>
      <div className="w-full">
        <SearchBarForSearchSellerCom2 
          parentData={parentData} 
          onChildDataChange={handleChildDataChange}
        />
        {sellers.length === 0 ? (
          <div className="p-4">No sellers found</div>
        ) : (
          sellers.map((seller) => (
            // ************************* added this dev, so i can style SellerDetailsCard ******************
            <div 
            className="my-2"
             key={seller.sellerID}> 
              <SellerDetailsCard
              seller={seller}
            />
            </div>
            
          ))
        )}
      </div>

    </>
  );
};

export default FindASellerCmp;