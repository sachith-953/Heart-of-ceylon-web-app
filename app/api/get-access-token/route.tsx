import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // no cache

/**
 * this API use to get access token from the refresh token
 * refresh token is taken from the cookies.
 * @returns access token
 */

export async function GET() {

    console.log("Get Refresh Token : Nextjs API has Called");

    // Get Refresh Token From Cookies
    const cookieStore = cookies();
    let refreshToken = null;
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


    try {
        const refreshTokenValue = refreshToken?.value ?? '';
        let refreshTokenString = JSON.stringify(refreshTokenValue);

        //refreshTokenString has double quotes in it like "sjsdkjaklf"
        //so those duble quotes should be removed before send to the backend. 
        //otherwise undetectable malfunctions can occures 
        refreshTokenString = refreshTokenString.replace(/"/g, "")
        console.log("logout > refresh token line24:" + refreshTokenString);
        const credential = `Bearer ${refreshTokenString}`;

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

            return new Response(JSON.stringify(data));

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
}