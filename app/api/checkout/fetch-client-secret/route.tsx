export const dynamic = "force-dynamic";


export async function GET() {

    console.log("fetch-all client secret from backend has called");

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_SERVER_URL}/api/v1/pBuyer/create-payment-intent`,
            { cache: 'no-store' }
        );

        // Handle the response as needed
        if (response.ok) {

            const responseBodyText = await response.text();
            console.log("***** Success ********: " + responseBodyText)
            const resData = {message: responseBodyText};
            return new Response(JSON.stringify(resData));

        } else {

            const responseBodyText = await response.text(); // .text() because backend return string messages
            const resData = {message: responseBodyText};
            console.warn(response.status + " >> Error from add new admin >> " + responseBodyText)
            return new Response(
                JSON.stringify(resData),
                { status: response.status }
            );
        }

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: {
                message: "Un-Expected Error"
            }
        }), { status: 500 });
    }
}