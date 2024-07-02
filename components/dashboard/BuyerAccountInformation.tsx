"use client"

import { useEffect } from "react";


const BuyerAccountInformation = () => {

    const dataFetching = async () => {

        try {
            console.log("fetch All Orders start");

            const res = await fetch(
                "http://localhost:3000/api/buyer/dashboard/get-buyer-account-info", 
                { cache: 'no-store' }
            );

            if (res.ok) {
                const responseData = await res.json();
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
            <p>Buyer Account Information</p>
        </>
    )
}

export default BuyerAccountInformation