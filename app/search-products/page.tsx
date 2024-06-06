"use client";

import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import SearchProductSortDropDown from "@/components/SearchProductSortDropDown";
import { ArrowDownNarrowWide } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {

    //get parameters
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query");

    console.log("data recived : " + searchQuery)

    //for response handling 
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

    const [sortMethod, setSortMethod] = useState("")

    //this handle by child component
    const handleChildDataChange = (newChildData: string) => {
        setSortMethod(newChildData);
        console.log("sort method set to :", newChildData)
    };

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
            setErrorMessage("")

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
            <Navbar />

            {/* this is the SEARCH BAR */}
            <MaxWidthWrapper>
                <div className="flex flex-col items-center p-3">
                    <div className="flex justify-center w-full sm:w-2/3 max-w-96 sm:max-w-screen-md">
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
                <h2>{errorMessage === "" ? <p></p> : errorMessage}</h2>
                {/* Render search results */}
            </div>

            {/* <div className="container mx-auto px-4">
                {data.map((d : dataDataType) => (
                    <div key={d.productID}>
                        <p>{d.productName}</p>
                        <p>{d.productPrice}</p>
                    </div>

                ))}
            </div> */}

            {/* ******************************************************** */}

            {/* parent component */}
            <div className="bg-white flex justify-center">
                <div className="flex flex-row  max-w-screen-lg w-full">

                    {/* left side */}
                    <div className="hidden sm:flex sm:w-1/3">
                        
                        
                    </div>

                    {/* right side */}
                    <div className="w-full mx-2 sm:mx-0 sm:w-2/3 min-h-svh">

                        {/* sort option */}
                        <div className="flex flex-row  justify-between bg-gray-300 py-1 content-center px-2">

                            {/* totoal search results */}
                            <div className="mr-3 content-center">
                                <p>tea : 230 Results Found</p>
                            </div>

                            {/* Sort option */}
                            <div className="flex flex-row content-center">
                                <div className="content-center">
                                    <ArrowDownNarrowWide className="mr-2" />
                                </div>

                                <p className="mr-3 content-center">Sort By:</p>
                                {/* add shadcn drop drown here */}
                                {/* https://ui.shadcn.com/docs/components/dropdown-menu */}
                                <SearchProductSortDropDown onChildDataChange={handleChildDataChange} />

                            </div>

                        </div>

                        {/* horizontal black line */}
                        <div className="border-t border-gray-700 my-2">

                        </div>
                            <Product />
                        <div>
                            <p>{sortMethod}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    );
}
