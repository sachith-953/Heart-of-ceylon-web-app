export const dynamic = "force-dynamic"; // no cache


/**
 * this API use to get sellers product for seller-store
 */

export async function POST(request: Request) {

    try {

        const body = await request.json();
        const sellerId = body.sellerId;

        console.log("sellerId >> " + sellerId)
        console.log("body >> " + body)


        const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_SERVER_URL}/api/v1/pBuyer/getSellerProducts?sellerId=${sellerId}`, {
            cache: 'no-store'
        });

        // console.log("getSalesSummery request Sent");

        if (response.ok) {
            const data = await response.json();
            console.log("seller product > fetched successfully:", data);
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