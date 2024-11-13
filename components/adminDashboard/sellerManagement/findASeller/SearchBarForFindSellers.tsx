"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { useToast } from "@/components/ui/use-toast";
import { Cross, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SellerData {
    profilePicture: string;
    storeName: string;
    sellerID: number;
    categories: string;
    sellerStatus: string;
    badges: string;
    ratings: number;
  }

interface ChildProps {
  onChildDataChange: (newChildData: SellerData[]) => void;
  clearSearchResults: () => void
}

const SearchBarForFindSellers: React.FC<ChildProps> = ({ onChildDataChange, clearSearchResults}) => {

  const router = useRouter()
  // display messages
  const { toast } = useToast()
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [requestedPageNo, setRequestedPageNo] = useState(1);// use this to add pages (pagination)

  const [searchData, setSearchData] = useState<SellerData[]>([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);


  const handleSearch = async () => {

    try {

      const res = await fetch(`${BASE_URL}/api/admin-dashboard/seller-managment/search-any-seller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery, requestedPageNo }),
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData.sellers)
        console.log(responseData.totalCount)
        //set data to this component
        setSearchData(responseData.sellers)
        setTotalSearchResults(responseData.totalCount)
        //pass data to parent component
        onChildDataChange(responseData.sellers)
      }
      else if (res.status === 403) {
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
          description: "Please Try Again. There was a problem with your request." + errorData.message,
        });
      }
    } catch (error) {
      console.error("Error searching orders:", error);
      toast({
        variant: "destructive",
        title: "Search failed",
        description: "Failed to search orders. Please try again.",
      });
    } finally {
      //setIsLoading(false);
    }
  };


  return (
    <>
      <MaxWidthWrapper>

{/* if we need to add pages, then that should be in this component */}

<div className="flex flex-col gap-10 items-center my-2">
  <div className="items-start flex flex-row w-full">
    <div className="relative flex flex-col w-full">
      <div className="flex flex-row w-full">
        <input
          type="text"
          className="px-5 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none focus:bg-gray-300"
          placeholder="Search products by Seller Id, Seller Name, or Status"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-gray-300 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover:text-white"
          onClick={() => handleSearch()}
        >
          Search
        </button>

        {/* reset button */}
        <div className="">
        <button
          className="flex flex-row items-center bg-gray-300 h-full ml-3 px-6 rounded-3xl hover:bg-red-600 hover:text-white"
          onClick={() => clearSearchResults()}
        >
          Clear
          <X />
        </button>
        
      </div>
      </div>
      
    </div>
  </div>
</div>
</MaxWidthWrapper>

    </>
  )
}
export default SearchBarForFindSellers


