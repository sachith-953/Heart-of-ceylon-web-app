
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // no cache

/**
 * this API use to get all Orders from backend for dashboard
 * email is taken from the cookies.
 * 1.get email from cookies.
 * 2.get access token from the /api/get-access-token
 * 3.send the request to backend to get order details
 * 4.send response to page()
 */

export async function GET() {

    console.log("\ngetAllOrders > Get All Orders for buyer dashboard : Nextjs API has Called");

    // ******************* 1. Get email From Cookies *****************
    const cookieStore = cookies();
    let email = null;

    if (cookieStore.has('email')) {
        email = cookieStore.get('email');
        // console.log("getAllOrders >  > email :" + JSON.stringify(email));
        //output : 
        //get-access-token > email :{"name":"email","value":"s19003@sci.pdn.ac.lk","path":"/"}
    } else {
        console.log("get-access-token > email not found");
        return new Response(JSON.stringify({
            error: {
                message: "get-access-token > email found"
            }
        }), { status: 404 });
    }

    //get email from the JSON object which taken from cookies
    const emailValue = email?.value ?? '';
    let emailValueString = JSON.stringify(emailValue);

    //refreshTokenString has double quotes in it like "sjsdkjaklf"
    //so those duble quotes should be removed before send to the backend. 
    //otherwise undetectable malfunctions can occures 
    emailValueString = emailValueString.replace(/"/g, "")
    console.log("getAllOrders  > email >>>: " + emailValueString);

    // **************** 2. Get Access Token ******************

    let accessToken = null

    try {
        const response = await fetch(`http://localhost:3000/api/get-access-token`, {
            cache: 'no-store',
        });

        console.log("getAllOrders > get-access-token request Sent to Next js API");

        // Handle the response as needed
        if (response.ok) {

            console.log('getAllOrders > get-access-token Success');

            console.log(response)

            const data = await response.json();

            console.log(data.access_token)
            accessToken = data.access_token

            console.log("getAllOrders > access-token response : " + data)
        }
        else {
            console.log("getAllOrders > NextJs API failed : code " + response.status);
            // TODO : handle errors thrown by server side
            console.log("getAllOrders > Error in server API");

            const data = await response.json();

            console.log("getAllOrders > Error in server API. manage this >> ", data);

            return new Response(JSON.stringify({
                error: {
                    message: "Un Expected Error"
                }
            }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({
            error: {
                message: "Un Expected Error. getAllOrders"
            }
        }), { status: 500 });
    }


    // **************** 3. Get All Order Details ******************

    try {

        const credential = `Bearer ${accessToken}`;
        console.log("getAllOrders > credential : " + credential)

        const response = await fetch(`http://localhost:8080/api/v1/auth/getAccountInfomation?email=${emailValueString}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept-encoding': 'gzip, deflate, br'
            },
        });

        console.log("logout request Sent");

        // Handle the response as needed
        if (response.ok) {

            const data = await response.json();
            console.log("getAllOrders > data : "+data)
            return new Response(JSON.stringify(data))
        }
        else {
            console.log("getAllOrders > ***** Error ******")
            const data = await response.json();
            console.log("getAllOrders > data : "+data)

        }

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            error: {
                message: "Un Expected Error. getAllOrders"
            }
        }), { status: 500 });
    }


}

