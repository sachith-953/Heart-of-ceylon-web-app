'use client';


import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutForm from '@/components/paymentGateway/CheckoutForm';
import CompletePage from './success/page';

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
        <p>client Secret : {clientSecret}</p>
            {
                clientSecret === ""
                    ?
                    <div>Loading...</div>
                    :
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
            }
        </>



    );
}
