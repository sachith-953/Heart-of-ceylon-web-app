
import { cookies } from "next/headers";

/**
 * this API use to update buyer info from backend form dashboard
 * email is taken from the cookies.
 * ==============================================================
 * === Following step 1,2,3 are common for all Auth requests  ===
 * === so we only need to change step 4. keep others UNCHANGE ===
 * ==============================================================
 * 1.get email from cookies.
 * 2.get refresh token from cookies
 * 3.get access token from the /api/get-access-token
 * 4.send the request to backend to update buyer info
 */



export async function POST(request: Request) {


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

    const refreshTokenValue = refreshToken?.value ?? '';
    refreshTokenString = JSON.stringify(refreshTokenValue);

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
    // **************** 4. Update Buyer Datails  *******************
    // *************************************************************
    // ========= CHANGE ONLY THIS AS NEED FOR OTHER APIs ===========


    let formData = await request.formData()

    // get the email as string
    // let userEmail = formData.get('email')?.toString() || '';

    console.log("FORM RECIEVED TO THE NEXT JS ENDPOINT")

    try {
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phoneNo: formData.get('phoneNo'),
            shippingAddress: formData.get('shippingAddress'),
        };

        console.log(JSON.stringify(userData));

        const response = await fetch(`http://localhost:8080/api/v1/auth/update-buyer-details?email=${emailValueString}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept-encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Handle the response as needed

        if (response.ok) {

            // server return ResponseEntity with 200 Ok. not a json.

            const responseBodyText = await response.text();

            console.log("***** Success ********: " + responseBodyText)

            const resData = {message: responseBodyText};
            return new Response(JSON.stringify(resData));
        }
        else {
            const data = await response.json();
            console.log(response.status + " >> Error from update buyer info")
            console.log("getAllOrders > data Error : " + data)
            return new Response(JSON.stringify(data), { status: 500 })
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