"use client"

import { ArrowDownNarrowWide } from "lucide-react"
import ProductSkeliton from "../ProductSkeliton"
import SearchProductSortDropDown from "../SearchProductSortDropDown"
import Product from "../Product"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast"

interface ChildProps {
    sellerId: number;
}

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

const SellerProductDetails: React.FC<ChildProps> = ({ sellerId }) => {

    const router = useRouter()
    const { toast } = useToast()
    const BASE_URL = process.env.NEXT_PUBLIC_URL;

    const [errorMessage, setErrorMessage] = useState("");
    const [dataFetchError, setDataFetchError] = useState(false);
    const [sortMethod, setSortMethod] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<dataDataType[]>([]);



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

    };

    const fetchSellerDetails = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/api/seller-store/get-seller-products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sellerId: sellerId,
                })
            });

            if (res.ok) {
                const ResponseData = await res.json()
                console.log(ResponseData)
                console.log("successfully fetched seller info")
                setData(ResponseData)
            }
            else if (res.status === 404) {
                setData([])  // handle the error when product are not available for the seller
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Plase Try Again. There was a problem with your request."
                })
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "Oh! Something Unexpected Happend.",
                description: "There was a problem with your request. Please Check the internet Connection",
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSellerDetails();
    }, []);



    return (
        <>
            <div className="bg-white">
                <div className="w-full mx-2 sm:mx-0 min-h-svh">

                    {/* sort option */}
                    <div className="flex flex-col sm:flex-row justify-between bg-gray-300 py-1 content-center px-2">

                        {/* totoal search results */}
                        <div className="mr-3 content-center text-sm sm:text-base">
                            <p>{ } : 230 Results Found</p>
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
                    <div className="border-t border-gray-700 my-2"></div>

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
        </>
    )
}
export default SellerProductDetails