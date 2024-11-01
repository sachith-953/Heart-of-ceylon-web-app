export const dynamic = "force-dynamic"; // no cache

import { cookies } from "next/headers";

/**
 * this API use to get sellers cover image, profile image, store name for seller-store
 */

export async function POST(request: Request) {

    try {

        const body = await request.json();
        const sellerId = body.sellerId;

        console.log("sellerId >> " + sellerId)
        console.log("body >> " + body)

        /** note:
         * const { sellerId, name, email } = body;
         * This is equivalent to:
         * const sellerId = body.sellerId;
         * const name = body.name;
         * const email = body.email;
         */

        const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_SERVER_URL}/api/v1/pBuyer/get-seller-info-for-manageAccount-sellerStore?sellerId=${sellerId}`, {
            cache: 'no-store'
        });

        // console.log("getSalesSummery request Sent");

        if (response.ok) {
            const data = await response.json();
            console.log("get cover,profile image > fetched successfully:", data);
            return new Response(
                JSON.stringify(data),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        }
        else {
            const responseBodyText = await response.text(); // .text() because backend return string messages
            const resData = { message: responseBodyText };
            console.warn(response.status + " >> Error from seller:get-seller-private-details >> " + responseBodyText)
            return new Response(
                JSON.stringify(resData),
                { status: response.status }
            );
        }

    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: {
                message: "Un-Expected Error : seller:get-seller-private-details"
            }
        }), { status: 500 });
    }
}