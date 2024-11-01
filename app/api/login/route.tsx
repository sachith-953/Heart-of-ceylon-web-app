import { cookies } from "next/headers";


export async function POST(request: Request) {

    let formData = await request.formData()

    // get the email as string
    let userEmail = formData.get('email')?.toString() || '';

    try {
        const email = formData.get('email')
        const password = formData.get('password')

        const credentials = `Basic ${btoa(`${email}:${password}`)}`;

        const response = await fetch(`http://localhost:8080/api/v1/log-in`, {
            method: 'POST',
            headers: {
                'Authorization': credentials,
            },
        });

        // Handle the response as needed

        if (response.ok) {

            //get the response 
            const data = await response.json();

            const accessToken = data.access_token;
            const accessTokenExpiry = data.access_token_expiry;
            const tokenType = data.token_type;
            const userName = data.user_name;
            const userRole  = data.user_role;

            // Handle the response data as needed
            console.log('Access Token:', accessToken);
            console.log('Access Token Expiry:', accessTokenExpiry);
            console.log('Token Type:', tokenType);
            console.log('User Name:', userName);
            console.log('user Role:', userRole);

            // Get the HTTP-Only cookie
            let httpOnlyCookie = ""
            const setCookieHeader = response.headers.get('Set-Cookie');
            if (setCookieHeader) {
                const httpOnlyCookie1 = setCookieHeader.split(';')[0];
                httpOnlyCookie = httpOnlyCookie1.split('=')[1];
                console.log('HTTP-Only Cookie:', httpOnlyCookie);
            } else {
                console.log('No HTTP-Only cookie found in the response.');
            }

            // set cookies
            cookies().set('accessToken', accessToken)
            cookies().set('refreshToken', httpOnlyCookie)
            cookies().set('userName', userName)
            cookies().set('tokenType', tokenType)
            cookies().set('email', userEmail)
            cookies().set('userRole', userRole)

            // response
            const responseBodyText = "Success"

            console.log(response.status)
            console.log(responseBodyText)

            const resData = { success: true, message: responseBodyText, role: userRole }
            return new Response(JSON.stringify(resData))

        }
        else {
            console.log(response.status)
            // Get the response body as text
            const responseBodyText = await response.text();

            // TODO : handle errors thrown by server side
            console.log("Error in server API")
            console.log(response.status)
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