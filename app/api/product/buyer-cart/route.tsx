import { cookies } from "next/headers";
/**
 * this API use toorder deatails in admin dashboard
 * email is taken from the cookies.
 * ==============================================================
 * === Following step 1,2,3 are common for all Auth requests  ===
 * === so we only need to change step 4. keep others UNCHANGE ===
 * ==============================================================
 * 1.get email from cookies.
 * 2.get refresh token from cookies
 * 3.get access token from the /api/get-access-token
 * 4.send the request to backend to fetch order details for admin dashboard --->All Orders---> orders
 */


export async function GET() {
    // decalare global variables 
    const cookieStore = cookies();
    let email = null;
    let refreshToken = null;
    let accessToken = null;
    let emailValueString = null;
    let refreshTokenString = null;

   
    console.log("\nBuyer cart  -->  fetch cart products: Nextjs API has Called");

    // ***************************************************************
    // ******************* 1. Get email From Cookies *****************
    // ***************************************************************

    if (cookieStore.has('email')) {
        email = cookieStore.get('email');
        console.log("Buyer cart  -->  fetch cart products   > email :" + JSON.stringify(email));
        //output : 
        //get-access-token > email :{"name":"email","value":"s19093@sci.pdn.ac.lk","path":"/"}
    } else {
        console.log("get-access-token > email not found");
        return new Response(JSON.stringify({
            error: { message: "Session expired. Redirecting to login." }
        }), { status: 403, headers: { 'X-Redirect': '/log-in' } });
         // if the email not in cookies again login
    }

    //get email from the JSON object which taken from cookies
    const emailValue = email?.value ?? '';
    emailValueString = JSON.stringify(emailValue);

    //refreshTokenString has double quotes in it like "sjsdkjaklf"
    //so those duble quotes should be removed before send to the backend. 
    //otherwise undetectable malfunctions can occures 
    emailValueString = emailValueString.replace(/"/g, "")
    console.log("Buyer cart  -->  fetch cart products  > email >>>: " + emailValueString);

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
        }), { status: 403 }); // if the email not in cookies again login
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_SERVER_URL}/api/v1/refresh-token`, {
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
            }), { status: 403 }); // refresh token has expires
        }
    } catch (error) {
        return new Response(JSON.stringify({
            error: {
                message: "Un Expected Error. get-access-token"
            }
        }), { status: 500 });
    }


    // *************************************************************
    // **************4. Get cart items *****************************
    // ************************************************************* 

    console.log("Buyer cart  -->  fetch cart products--> Nextjs API has Called");

    try{

        const response = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_SERVER_URL}/api/v1/auth/get-cart-items?email=${emailValueString}`, {
           // default it is GET
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // no body to send
            },
        });
    console.log("Buyer cart  -->  fetch cart products -----> request Sent");
    if (response.ok) {
        const data = await response.json(); // .json() since backend service class return DTO 
        // if the backend return a string this should response.text()
        console.log("Buyer cart  -->  fetch cart products---> details fetched successfully:", data);
        return new Response(
            JSON.stringify(data), 
            {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      }
      else{
        const responseBodyText = await response.text(); // .text() because backend return string messages
        const resData = {message: responseBodyText};
        console.warn(response.status + " >> Buyer cart  -->  fetch cart products---> details fetching >> " + responseBodyText)
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
                message: "Un-Expected Error"
            }
        }), { status: 500 });
    }
}


