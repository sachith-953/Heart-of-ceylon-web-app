
export const dynamic = "force-dynamic";

export async function GET(request: Request) {

    console.log("Review comment API started");

    // Extract query params from the URL
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    console.log("***********Product id ********" + productId);

    try {
        // Fetch the product details from the backend API
        const response = await fetch(
            `http://localhost:3000/api/v1/pBuyer/getProductDetails?productId=${productId}`,
            { cache: 'no-store' }
        );

        console.log("Request has been sent to backend API");

        // Handle the response
        if (response.ok) {
            console.log("Response OK");

            // Get the response body as JSON
            const responseData = await response.json();
            console.log(responseData);

            // Return the response data
            return new Response(JSON.stringify(responseData), { status: 200 });
        } else {
            console.log("Server response status: " + response.status);

            // Get the response body as text
            const responseBodyText = await response.text();
            console.log(responseBodyText);

            // Return the error response
            const resData = { success: false, message: responseBodyText };
            return new Response(JSON.stringify(resData), { status: response.status });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        const resData = { success: false, message: "An error occurred: " + error.message };
        return new Response(JSON.stringify(resData), { status: 500 });
    }
}
