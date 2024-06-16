"use client";

import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import Category_Level_1 from "@/components/CategoryLevel1";
import SearchProductSortDropDown from "@/components/SearchProductSortDropDown";
import { ArrowDownNarrowWide, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductSkeliton from "@/components/ProductSkeliton";
import CategoryLevel1Skeliton from "@/components/CategoryLevel1Skeliton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

/**
 * This page call API in two instances 
 * 1. when user redirected to this page, by useState() call API to fetch data according to URL params
 * 2. when user enter search keyword to search input and click the search button, onclick action call the API. 
 * this both actions send requst to backend requesting page 1 data.
 * 
 * when user click in next and previous buttons, user redirect again to this page but with requestedPage url param with (currentPage + 1) or (currentPage - 1)
 * 
 */

export default function SearchPage() {

    //TODO : add this to env file
    const PRODUCTS_PER_PRODUCT_SEARCH_RESULT = 4;


    //get parameters
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query");

    console.log("data recived : " + searchQuery)

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

    //for response handling 
    const [errorMessage, setErrorMessage] = useState("");
    const [dataFetchError, setDataFetchError] = useState(false);

    // store fetched product data
    const [data, setData] = useState<dataDataType[]>([]);

    console.log("start Search Page");

    // store search keyword 
    const [searchKey, setSearchKey] = useState("");

    const [sortMethod, setSortMethod] = useState("")

    const [isLoading, setIsLoading] = useState(true)

    // totoal rows matching for the keyword in database
    const [totoalResultFound, setTotalResultFound] = useState(0)

    // page user currently visited 
    const [currentPage, setCurrentPage] = useState("1")


    //this handle by child component. 
    // use to get sort method selection
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

    // when search button clicked this triggers
    const handleSearch = () => {
        console.log(searchKey)
        setIsLoading(true)
        handleProductSearch(searchKey, "1") // when new keyword added and click serach, we show new results in page 1
    };

    // data fetching handle by this function
    const handleProductSearch = async (searchKeyParam: string, requestedPage: string) => {

        console.log("sending keyword to Next.js Search Product API");

        const res = await fetch(
            "http://localhost:3000/api/product/search",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchKeyParam, requestedPage }),
            }
        );

        if (res.ok) {
            const responseData = await res.json();

            console.log("Data recived sucess");
            console.log(responseData);

            setErrorMessage("") // remove error message 
            setDataFetchError(false)
            setData(responseData.productList) // add data to data useState

            console.log("responseData.productList");

            setTotalResultFound(responseData.totalResults)

            setIsLoading(false) // this stop display skeliton animation

        } else {
            const responseData = await res.json();
            setErrorMessage(responseData.message);
            setDataFetchError(true)
            console.log("********failed********")
        }
    };


    //this part triggers when component mounted. 
    // so this should work when user redirected from the home page
    useEffect(() => {

        // get url parameters
        const searchQuery = searchParams.get("query");
        const page = searchParams.get("page")

        console.log("inside UseEffect : searchQuery :" + searchQuery)
        console.log("inside UseEffect : page :" + page)

        //set vales to use state
        setSearchKey(searchQuery || "") //assign "" if searchQuery is null
        setCurrentPage(page || "1") // if page is null, set 1 as default value

        console.log("inside UseEffect => searchKey :" + searchKey + "page :" + page)


        //send data to to API
        handleProductSearch(searchQuery || "", page || "1");

    }, [searchParams]); // without [] this run non-stop
    // we add variable names inside [] to ensure useEffect re-excecure when theose variable change values


    return (

        <>
            <Navbar />

            <SearchBar />


            {/* parent component */}
            <div className="bg-white flex justify-center">
                <div className="flex flex-row  max-w-screen-lg w-full">

                    {/* left side- coded by madhushan    */}
                    <div className="hidden sm:flex sm:w-1/3 bg-gray-100">
                        <Category_Level_1 />
                    </div>


                    {/* right side */}
                    <div className="w-full mx-2 sm:mx-0 sm:w-2/3 min-h-svh">

                        

                        


                    </div>
                </div>
            </div >

            <Footer />
        </>

    );
}
