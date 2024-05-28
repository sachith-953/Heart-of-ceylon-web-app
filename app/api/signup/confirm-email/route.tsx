import { cookies } from "next/headers";


export async function POST(request: Request) {

    const token = await request.json()
    console.log(token)

    try {

        const response = await fetch(`http://localhost:8080/api/v1/pBuyer/confirm?token=${token}`, {
            method: 'GET',
        });
        console.log("Request has send to backend api")

        // Handle the response 
        if (response.ok) {

            console.log("response OK")

            // response
            const responseBodyText = "Success"

            const resData = { success: true, message: responseBodyText }
            return new Response(JSON.stringify(resData))

        }
        else {
            console.log("server res status : "+response.status)
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