"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {

    //get parameters
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query");

    console.log("data recived : " + searchQuery)

    //for response handling 
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    interface dataDataType {
        productAvailableStokes: number
        productID: number
        productMainImage: string
        productName: string
        productNoOfRatings: number
        productPrice: number
        productRatings: number
        productTotalItemSold: number
        //todo : add seller details
    }

    const [data, setData] = useState<dataDataType[]>([]);

    console.log("start Search Page");

    const [searchKey, setSearchKey] = useState("");

    const handleSearch = () => {
        console.log(searchKey)
        handleProductSearch()
    };

    const handleProductSearch = async () => {

        console.log("sending keyword to Next.js Search Product API");

        const res = await fetch(
            "http://localhost:3000/api/product/search",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchKey),
            }
        );

        if (res.ok) {
            const responseData = await res.json();
            console.log(responseData);
            setData(responseData)

        } else {
            const responseData = await res.json();
            setErrorMessage(responseData.message);
        }
    };


    //this part triggers when component mounted. 
    // so this should work when user comming from the home page
    useEffect(() => {

        setSearchKey(searchQuery || "")
        handleProductSearch();

    }, []); // without [] this run unstop

    return (

        <>
            {/* <Navbar /> */}

            <MaxWidthWrapper>
                <div className="flex flex-col gap-10 items-center p-6">
                    <div className="flex justify-center w-2/3">
                        <input
                            className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none"
                            placeholder="What are you looking for? "
                            onChange={(e) => setSearchKey(e.target.value)}
                        ></input>
                        <button className="bg-gray-200 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover hover:text-white"
                            onClick={handleSearch}
                        >Search</button>
                    </div>
                </div>
            </MaxWidthWrapper>

            <div>
                <h1>Search Results for : {searchQuery}</h1>
                {/* Render search results */}
            </div>

            <div className="container mx-auto px-4">
                {data.map((d) => (
                    <div key={d.productID}>
                        <p>{d.productName}</p>
                        <p>{d.productPrice}</p>
                    </div>

                ))}
            </div>
        </>

    );
}
