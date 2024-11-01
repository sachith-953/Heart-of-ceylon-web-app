import { cookies } from "next/headers";

/**
 * ==============================================================
 * 1.get email from cookies.
 * 2.get refresh token from cookies
 * 3.get access token from the /api/get-access-token
 * 4.send the request to backend to update sorder status >> My sales
 */

export async function POST(request: Request) {
    // decalare global variables 
    const cookieStore = cookies();
    let email = null;
    let refreshToken = null;
    let accessToken = null;
    let emailValueString = null;
    let refreshTokenString = null;
      
    console.log("\nSellerDashboardMySalesController > Get sales summery for sellar dashboard : Nextjs API has Called");

     // ***************************************************************
    // ******************* 1. Get email From Cookies *****************
    // ***************************************************************

    if (cookieStore.has('email')) {
        email = cookieStore.get('email');
        console.log("sellerSales   > email :" + JSON.stringify(email));
        //output : 
        //get-access-token > email :{"name":"email","value":"s19093@sci.pdn.ac.lk","path":"/"}
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
    console.log("getSalesSummery  > email >>>: " + emailValueString);

     // *************************************************************
    // ************* 2. Get Refresh-Token From Cookies *************
    // *************************************************************

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

    const refreshTokenValue = refreshToken?.value ?? ''; // get the refresh token and store
    refreshTokenString = JSON.stringify(refreshTokenValue); // stringify the refresh token

    //refreshTokenString has double quotes in it like "sjsdkjaklf"
    //so those duble quotes should be removed before send to the backend. 
    //otherwise undetectable malfunctions can occures 
    refreshTokenString = refreshTokenString.replace(/"/g, "") 
    console.log("logout > refresh token line24:" + refreshTokenString);
    const credential = `Bearer ${refreshTokenString}`;


    // *************************************************************
    // ********* 3. Get a New Access-Token from Refresh-Token ******
    // *************************************************************

    try {
        
        const response = await fetch(`http://localhost:8080/api/v1/refresh-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${refreshTokenString}`, // pass refresh token under authentication
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
            accessToken = data.access_token // store access token in a variable
        }
        else {
            console.log("NextJs API failed : code " + response.status);
            // TODO : handle errors thrown by server side
            console.log("Error in server API");
            console.log(response.status);
            const responseBodyText = "something not right";
            // return the response
            // use if else if conditions and check 
            // import and add "const router = useRouter()"
            /**
             * <<Check the AllOrders.tsx for full example code>>
             * else if (res.status === 403) {
             *  //detele cookies
                router.push("/log-in");
            }
             */
            return new Response(JSON.stringify({
                error: {
                    message: "Un Expected Error. get-access-token"
                }
            }), { status: 403 });
        }
    } catch (error) {
        return new Response(JSON.stringify({
            error: {
                message: "Un Expected Error. get-access-token"
            }
        }), { status: 500 });
    }

    // *************************************************************
    // **************** 4. Update Order Status  *******************
    // *************************************************************
    console.log("update order status Nextjs API has Called");

    try {
        // Get orderId and newStatus from request body
        const { orderId, newStatus } = await request.json();
        console.log(`Updating orderId: ${orderId} to status: ${newStatus}`);
        
        const userData = {
            orderStatus: newStatus
        };
        const updateResponse = await fetch(`http://localhost:8080/api/v1/auth/update-order-status-by-seller?sellerEmail=${emailValueString}&orderId=${orderId}`, {
           method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept-encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    
        let responseData;
        const contentType = updateResponse.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            responseData = await updateResponse.json();
        } else {
            responseData = await updateResponse.text();
        }
    
        if (updateResponse.ok) {
            console.log("Order status updated successfully:", responseData);
            return new Response(JSON.stringify({ message: "Order status updated successfully", data: responseData }), { 
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            console.warn(`${updateResponse.status} >> Error updating order status:`, responseData);
            return new Response(JSON.stringify({ error: { message: responseData } }), { status: updateResponse.status });
        }
    }
    catch (error) {
        console.error("Unexpected error:", error);
        return new Response(JSON.stringify({
            error: {
                message: "Unexpected Error",
                details: error instanceof Error ? error.message : String(error)
            }
        }), { status: 500 });
    }
}