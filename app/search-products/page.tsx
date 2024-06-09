"use client";

import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import Category_Level_1 from "@/components/fetch-category-level-1";
import SearchProductSortDropDown from "@/components/SearchProductSortDropDown";
import { ArrowDownNarrowWide } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductSkeliton from "@/components/ProductSkeliton";
import CategoryLevel1Skeliton from "@/components/fetch-category-level-1-skeliton";



export default function SearchPage() {

    //get parameters
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query");

    console.log("data recived : " + searchQuery)

    //for response handling 
    const [errorMessage, setErrorMessage] = useState("");
    const [dataFetchError, setDataFetchError] = useState(false);

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
        // change this in product.tsx too
    }

    const [data, setData] = useState<dataDataType[]>([]);


    console.log("start Search Page");

    const [searchKey, setSearchKey] = useState("");

    const [sortMethod, setSortMethod] = useState("")

    const [isLoading, setIsLoading] = useState(true)

    //this handle by child component
    const handleChildDataChange = (newChildData: string) => {
        setSortMethod(newChildData);
        console.log("sort method set to :", newChildData)

        // sorting based on sortingMethod selected
        const sortedData = [...data].sort((a, b) => {
            switch (newChildData) {
                case "Price":
                    return a.productPrice - b.productPrice;
                case "Ratings":
                    return b.productRatings - a.productRatings;
                case "Top Selling":
                    return b.productTotalItemSold - a.productTotalItemSold;
                default:
                    return 0;
            }
        });
        setData(sortedData)
        console.log("******data*******")
        console.log(data)
        console.log("******sortedData*******")
        console.log(sortedData)
    };

    const handleSearch = () => {
        console.log(searchKey)
        setIsLoading(true)
        handleProductSearch(searchKey)
    };

    const handleProductSearch = async (searchKeyParam: string) => {

        console.log("sending keyword to Next.js Search Product API");

        const res = await fetch(
            "http://localhost:3000/api/product/search",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchKeyParam),
            }
        );

        if (res.ok) {
            const responseData = await res.json();
            console.log(responseData);
            setErrorMessage("")
            setDataFetchError(false)
            setData(responseData)
            setIsLoading(false)

        } else {
            const responseData = await res.json();
            setErrorMessage(responseData.message);
            setDataFetchError(true)
        }
    };


    //this part triggers when component mounted. 
    // so this should work when user comming from the home page
    useEffect(() => {
        const searchQuery = searchParams.get("query");
        console.log("inside UseEffect : searchQuery :" + searchQuery)
        setSearchKey(searchQuery || "") //assign "" if searchQuery is null
        console.log("inside UseEffect : searchKey :" + searchKey)


        handleProductSearch(searchQuery || "");


    }, []); // without [] this run non-stop
    // we add variable names inside [] to ensure useEffect re-excecure when theose variable change values


    return (

        <>
            <Navbar />

            {/* ******************** this is the SEARCH BAR ********************/}
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
                <h2>{errorMessage === "" ? <p></p> : errorMessage}</h2>
                {/* Render search results */}
            </div>



            {/* *********************other parts*********************** */}

            {/* parent component */}
            <div className="bg-white flex justify-center">
                <div className="flex flex-row  max-w-screen-lg w-full">

                    {/* left side- coded by madhushan    */}
                    <div className="hidden sm:flex sm:w-1/3 bg-gray-100">
                    <Category_Level_1 />
                    </div>
                    

                    {/* right side */}
                    <div className="w-full mx-2 sm:mx-0 sm:w-2/3 min-h-svh">

                        {/* sort option */}
                        <div className="flex flex-col sm:flex-row justify-between bg-gray-300 py-1 content-center px-2">

                            {/* totoal search results */}
                            <div className="mr-3 content-center text-sm sm:text-base">
                                <p>{searchKey} : 230 Results Found</p>
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

                        {/* Product Card */}
                        {isLoading
                            ?
                            <div>
                                <ProductSkeliton />
                                <ProductSkeliton />
                                <ProductSkeliton />
                                <ProductSkeliton />
                                <ProductSkeliton />
                            </div>
                            :
                            <Product productData={data} />
                        }

                        
                    </div>
                </div>
            </div>

            <Footer />
        </>

    );
}
