
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // no cache

/**
 * this API use to get buyer account infomation from backend for dashboard
 * email is taken from the cookies.
 * ==============================================================
 * === Following step 1,2,3 are common for all Auth requests  ===
 * === so we only need to change step 4. keep others UNCHANGE ===
 * ==============================================================
 * 1.get email from cookies.
 * 2.get refresh token from cookies
 * 3.get access token from the /api/get-access-token
 * 4.send the request to backend to get Buyer Account Details
 */

export async function GET() {

    // decalare global variables 
    const cookieStore = cookies();
    let email = null;
    let refreshToken = null;
    let accessToken = null;
    let emailValueString = null
    let refreshTokenString = null


    console.log("\ngetAllOrders > Get All Orders for buyer dashboard : Nextjs API has Called");


    // ***************************************************************
    // ******************* 1. Get email From Cookies *****************
    // ***************************************************************

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
    emailValueString = JSON.stringify(emailValue);

    //refreshTokenString has double quotes in it like "sjsdkjaklf"
    //so those duble quotes should be removed before send to the backend. 
    //otherwise undetectable malfunctions can occures 
    emailValueString = emailValueString.replace(/"/g, "")
    console.log("getAllOrders  > email >>>: " + emailValueString);


    // ***************************************************************
    // ************* 2. Get Refresh-Token From Cookies ***************
    // ***************************************************************

    if (cookieStore.has('refreshToken')) {
        refreshToken = cookieStore.get('refreshToken');
        console.log("get-access-token > refresh token :" + JSON.stringify(refreshToken));
    }
    else {
        console.log("get-access-token > refresh token not found");
        return new Response(JSON.stringify({
            error: {
                message: "get-access-token > Token not found"
            }
        }), { status: 404 });
    }

    const refreshTokenValue = refreshToken?.value ?? '';
    refreshTokenString = JSON.stringify(refreshTokenValue);

    //refreshTokenString has double quotes in it like "sjsdkjaklf"
    //so those duble quotes should be removed before send to the backend. 
    //otherwise undetectable malfunctions can occures 
    refreshTokenString = refreshTokenString.replace(/"/g, "")
    console.log("logout > refresh token line24:" + refreshTokenString);
    const credential = `Bearer ${refreshTokenString}`;


    // ****************************************************************
    // ********* 3. Get a New Access-Token from Refresh-Token *********
    // ****************************************************************

    try {

        const response = await fetch(`http://localhost:8080/api/v1/refresh-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${refreshTokenString}`,
                'accept-encoding': 'gzip, deflate, br'
            },
        });

        console.log("get-access-token request Sent");

        // Handle the response as needed
        if (response.ok) {
            console.log('**** get-access-token by refresh-token is Success ****');

            // console.log(response)

            const data = await response.json();
            console.log(data.access_token)
            console.log("access-token response : " + data)
            accessToken = data.access_token
        }
        else {
            console.log("NextJs API failed : code " + response.status);
            // TODO : handle errors thrown by server side
            console.log("Error in server API");
            console.log(response.status);
            const responseBodyText = "something not right";
            // return the response
            const resData = { success: false, message: responseBodyText };
            return new Response(JSON.stringify(resData));
        }
    } catch (error) {
        return new Response(JSON.stringify({
            error: {
                message: "Un Expected Error. get-access-token"
            }
        }), { status: 500 });
    }


    // ***************************************************************
    // **************** 4. Get Buyer Account Details *****************
    // ***************************************************************
    // ========== CHANGE ONLY THIS AS NEED FOR OTHER APIs ============

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
            console.log("getAllOrders > data : " + data)
            return new Response(JSON.stringify(data))
        }
        else {
            console.log("getAllOrders > ***** Error ******")
            const data = await response.json();
            console.log("getAllOrders > data : " + data)

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

