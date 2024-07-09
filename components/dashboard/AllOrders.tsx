"use client"

import { useEffect, useState } from "react";
import MaxWidthLg from "../MaxWidthLg";
import ErrorForCatch from "../ErrorForCatch";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * if fetching login has error with refresh token,
 * we push user to the login page.
 * in there, user cookies will deleted.
 * user can login again
 */

const AllOrders = () => {

    const router = useRouter()

    interface dataDataType {
        expectedDeliveryDate: string
        orderDateTime: string
        orderId: number
        orderStatus: string
        productID: number
        productMainImage: string
        productName: string
        quantity: number
        sellerId: number
        shippingCost: number
        totalPrice: number
    }

    const [data, setData] = useState<dataDataType[]>([]);

    const [isLoading, setIsLoading] = useState(true)

    const [isViewAll, setIsViewAll] = useState(false)

    const [isMobile, setIsMobile] = useState(false);

    const [isError, setIsError] = useState(false)

    const pushToLogin = () => {
        console.log("pushed to login////////////////")
        router.push("/log-in");
    };


    const dataFetching = async () => {

        try {

            console.log("fetch All Orders start");

            const res = await fetch(
                "http://localhost:3000/api/buyer/dashboard/get-all-orders",
                { cache: 'no-store' }
            );

            if (res.ok) {
                const responseData = await res.json();
                console.log(responseData);

                // Sort the array based on orderDateTime
                const sortedData = responseData.sort((a: dataDataType, b: dataDataType) => {
                    return new Date(b.orderDateTime).getTime() - new Date(a.orderDateTime).getTime();
                });

                setData(responseData)
                setIsLoading(false)
            }
            else if (res.status === 403) {
                // this trigger when referesh token has issure. 
                // if token is expired this will trigger
                console.log("****403****************")
                console.log("Redirectiong to login. RT error")
                setIsError(true)
                pushToLogin()
            }
            else {
                const responseData = await res.json();
                console.log(responseData)
                console.log("********failed********")
                setIsLoading(true)
            }
        }
        catch (error) {
            return (
                <>
                    <ErrorForCatch />
                </>
            )
        }
    };


    useEffect(() => {

        dataFetching()

    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust this breakpoint as needed
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            {/* Parent Containter */}
            <div className="mt-4">
                {/* header and View all button */}
                <div className="flex flex-row justify-between mb-3">

                    <span className="text-2xl font-bold">Recent Orders</span>

                    <span onClick={() => {
                        setIsViewAll(!isViewAll)
                    }}
                        className={`text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer ${isViewAll ? "bg-gray-200" : ""}`}>
                        View All
                    </span>
                </div>

                {/* order cart holder */}
                <div>

                    {
                        data && Array.isArray(data) && data.length > 0
                            ?
                            (
                                data.slice(0, isViewAll ? data.length : 1).map((order: dataDataType) => (
                                    <div key={order.orderId}>

                                        {/* order cart */}
                                        <div className="flex flex-row bg-gray-200 hover:bg-gray-300 p-2 items-center">

                                            {/* product image */}
                                            <div className="w-2/5 sm:w-1/3 md:w-1/5">
                                                <Image
                                                    src={order.productMainImage}
                                                    width={2000}
                                                    height={2000}
                                                    alt="sample image"

                                                    style={{
                                                        objectFit: "cover",
                                                        maxWidth: "auto%",
                                                        height: "100%",
                                                    }}
                                                />
                                            </div>

                                            {/* order details */}
                                            <div className="w-4/5 pl-2 md:p-3">
                                                <p className="text-lg md:text-xl font-semibold sm:font-semibold leading-none sm:leading-normal">
                                                    
                                                    { isMobile 
                                                    ?
                                                    (
                                                        // for mobile versions
                                                        order.productName.length > 50
                                                        ? `${order.productName.substring(0, 41)}...`
                                                        : order.productName
                                                    )
                                                    :
                                                    (
                                                        // for non-mobile verisons
                                                        order.productName.length > 50
                                                        ? `${order.productName.substring(0, 85)}.`
                                                        : order.productName
                                                    )
                                                    }
                                                    
                                                    
                                                </p>
                                                <p className="text-base md:text-lg font-medium text-blue-700">
                                                    Seller Name
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                                    <p className="text-sm md:text-base my-0 md:my-2 font-semibold">Order Number : {order.orderId}</p>
                                                    <p className="text-sm md:text-base my-0 md:my-2 font-semibold">Order Date : {order.orderDateTime.split("T")[0]}</p>
                                                    <p className="text-sm md:text-base my-0 md:my-2 font-semibold">Quantity : {order.quantity}</p>
                                                    <p className="text-sm md:text-base my-0 md:my-2 font-semibold">Total Price : ${order.totalPrice}</p>
                                                    <p className="text-sm md:text-base my-0 md:my-2 font-semibold">Status : <span className="text-red-600">{order.orderStatus}</span></p>
                                                </div>
                                            </div>
                                        </div>

                                        {isViewAll &&
                                            /* horizontal black line  */
                                            <div className="border-t border-gray-700 my-2"></div>
                                        }

                                    </div>
                                ))
                            )
                            :
                            (<p className="font-bold text-lg justify-center text-center h-40 content-center">
                                No Orders found!
                            </p>)
                    }







                </div>


            </div>
        </>
    )
}

export default AllOrders