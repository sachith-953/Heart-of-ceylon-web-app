'use client';


import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutForm from '@/components/paymentGateway/CheckoutForm';
import CheckOutCart from '@/components/checkoutCart/CheckOutCart';
import CompletePage from './success/page';
import { Loader2, } from 'lucide-react';
import Navbar from "@/components/Navbar";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {

    const [clientSecret, setClientSecret] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const appearance = {
        theme: "stripe" as "stripe" | "night" | "flat",
    };
    const options = {
        clientSecret,
        appearance,
    };



    const fetchClientSecret = async () => {

        try {
            console.log("fetching client secret start");
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/checkout/fetch-client-secret`, {
                cache: 'no-store'
            });

            // const responseData = await res.json()
            // console.log("responseData")
            // console.log(responseData.message)

            if (res.ok) {
                const ResponseData = await res.json()
                console.log(ResponseData.message)
                setClientSecret(ResponseData.message);
            }
            else if (res.status === 403) {

                console.log("****403****************")
                console.log("Redirectiong to login. RT error")
            }
            else {
                const ResponseData = await res.json()
                console.error("Error fetching client secret: ", ResponseData.message);
                console.log(ResponseData)
            }
        }

        catch (error) {
            console.error('Error fetching client secret:', error);
        } finally {

        }
    }



    useEffect(() => {
        fetchClientSecret();
    }, []);

    return (

        <>
            <Navbar />
            <div className="flex flex-col min-h-screen sm:flex-row w-full bg-white">

                {/* ************ product details goes ************ */}
                <div className="w-full md:w-3/5 border-2 ">
                    {/* !!!!! just modify this componet and add new modified compoent */}
                    {/* <BuyerCartOrderDetails /> */}
                    <CheckOutCart />
                </div>

                {/* ************ payemt gateway form ************* */}
                <div className="w-full h-full md:w-2/5">
                    {/* <span>client Secret : {clientSecret}</span> */}
                    {/* <p>test visa card : 4242424242424242 , any expire date and CVV</p> */}
                    {
                        clientSecret === ""
                            ?
                            // spinning animation
                            <div className='flex flex-col min-h-screen items-center justify-center'>
                                <div className="text-center space-y-4">
                                    <Loader2 className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
                                    <h2 className="text-xl font-semibold text-gray-900">Loading</h2>
                                    <p className="text-gray-600">Please wait while we prepare your transaction...</p>
                                </div>
                            </div>
                            :
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                    }
                </div>
            </div>


        </>



    );
}
