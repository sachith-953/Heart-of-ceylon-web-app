import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {

    // decalare global variables 
    const cookieStore = cookies();
    let email = null;
    let refreshToken = null;
    let accessToken = null;
    let emailValueString = null;
    let refreshTokenString = null;

    // TODO : change all console.log fiels.  
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
        }), { status: 403 }); // if the email not in cookies again login
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
    // ********* 3. Fetch request using search keaywords. ******
    // *************************************************************

    const reqParams = await request.json()
    // console.log("reqParams.searchKeyParam :" + reqParams.searchKeyParam)
    // console.log("reqParams.requestedPage :" + reqParams.requestedPage)

    const searchKey = reqParams.searchKeyParam
    const requestedPageNo = reqParams.requestedPage

    //if searchKey is not entered or empty spaces has entered, we return an error
    if (searchKey === null || searchKey === undefined || searchKey.trim() === '') {
        // return a response for a error
        const resData = { success: false, message: "Enter a Search-Key word" }
        return new Response(JSON.stringify(resData));
    }

    // console.log("request URL :" + `http://localhost:8080/api/v1/pBuyer/getSearchResults?searchWord=${searchKey}&pageNumber=${requestedPageNo}`)

    // http://localhost:8080/api/v1/auth/get-sellers-by-search?adminEmail=abeyrathna095@gmail.com&searchWord=wood&pageNumber=1
    try {

        const response = await fetch(
            `http://localhost:8080/api/v1/auth/get-sellers-by-search?adminEmail=${emailValueString}&searchWord=${searchKey}&pageNumber=${requestedPageNo}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    // no body to send
                },
            }
        );

        // console.log("Request has send to backend api")

        // Handle the response 
        if (response.ok) {

            // console.log("response OK")


            // Get the response body as JSON
            const responseData = await response.json();
            // console.log(responseData);

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