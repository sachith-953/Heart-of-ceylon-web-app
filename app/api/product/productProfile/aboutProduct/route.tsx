
export const dynamic = "force-dynamic";

export async function POST(request: Request) {

    console.log("Review comment API started")

    const reqParam = await request.json()
    const productId = reqParam.productId
    console.log("***********reqParams ********" + reqParam)
    console.log("***********Product id ********" + productId)
    //console.log("reqParams.searchKeyParam :" + reqParams.searchKeyParam)
    //console.log("reqParams.requestedPage :" + reqParams.requestedPage)

    try {

        const response = await fetch(
            `http://localhost:8080/api/v1/pBuyer/getProductDetails?productId=${productId}`,
            { cache: 'no-store' }
        );

        console.log("Request has send to backend api")

        // Handle the response 
        if (response.ok) {

            console.log("response OK")


            // Get the response body as JSON
            const responseData = await response.json();
            console.log(responseData);

            // Return the response data
            return new Response(JSON.stringify(responseData));

        }
        else {
            console.log("server res status : " + response.status)
            // Get the response body as text
            const responseBodyText = await response.text();

            // TODO : handle errors thrown by server side
            console.log(responseBodyText)

            // return the response 
            const resData = { success: false, message: responseBodyText }
            return new Response(JSON.stringify(resData));
        }
    }
    catch (error) {
        console.log(error)
    }

}