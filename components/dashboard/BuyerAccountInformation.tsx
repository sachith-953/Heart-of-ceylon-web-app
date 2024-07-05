"use client"

import { useEffect, useState } from "react";


const BuyerAccountInformation = () => {

    const addressHardcord = "124, Hurikaduwa East, Menikhinna"

    interface buyerDataType {
        email: string
        firstName: string
        lastName: string
        phoneNo: string
        shippingAddress: string
    }

    const [buyerDetails, setBuyerDetails] = useState<buyerDataType>()

    const dataFetching = async () => {

        try {
            console.log("fetch All Orders start");

            const res = await fetch(
                "http://localhost:3000/api/buyer/dashboard/get-buyer-account-info",
                { cache: 'no-store' }
            );

            if (res.ok) {
                const responseData = await res.json();
                setBuyerDetails(responseData)
                console.log(responseData);
            } else {
                const responseData = await res.json();
                console.log(responseData)
                console.log("********failed********")
            }

        }
        catch (error) {
            return new Response(JSON.stringify({
                error: {
                    message: "Un Expected Error"
                }
            }), { status: 500 });
        }
    };

    useEffect(() => {

        dataFetching()

    }, []);

    return (
        <>
            {/* Containter parent */}
            <div>

                <p className="text-2xl font-bold mb-3">Account Information</p>

                {/* Buyer info */}
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* contact info */}
                    <div className="mr-2 mb-3">
                        
                        <div className="flex flex-row items-center justify-between">
                            <p className="text-lg font-semibold">
                                Account Details
                            </p>
                            <span className="text-sm text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer">Edit</span>
                        </div>

                        {buyerDetails !== undefined
                            ?
                            (
                                <div>
                                    {/* full name */}
                                    <p className="pl-2">{buyerDetails?.firstName + " " + buyerDetails?.lastName}</p>

                                    {/* email */}
                                    <p className="pl-2">{buyerDetails?.email}</p>

                                    {/* phone no */}
                                    <p className="pl-2">{buyerDetails?.phoneNo}</p>
                                </div>
                            )
                            :
                            (
                                <p>Data not found</p>
                            )}


                    </div>

                    {/* Shipping address */}
                    <div className="">
                        
                        <div className="flex flex-row items-center justify-between">
                            <p className="text-lg font-semibold">
                                Shipping Address
                            </p>
                            <span className="text-sm text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer">Edit</span>
                        </div>

                        {buyerDetails?.shippingAddress !== null
                            ?
                            (
                                /* address */
                                <p className="pl-2">
                                    {addressHardcord.split(",").map((line, index) => (
                                        <span key={index}>
                                            {index > 0 && <br />}
                                            {line.trim()}
                                            {addressHardcord.split(",").length - 1 == index ? <span>.</span> : <span>,</span>}
                                        </span>
                                    ))}
                                </p>
                            )
                            :
                            (
                                <p>Data not found</p>
                            )
                        }
                    </div>

                </div>

                {/* change password */}
                <div></div>
            </div >
        </>
    )
}

export default BuyerAccountInformation