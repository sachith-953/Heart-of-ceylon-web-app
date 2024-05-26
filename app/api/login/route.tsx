import { cookies } from "next/headers";


export async function POST(request: Request) {

    let formData = await request.formData()

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

            // Handle the response data as needed
            console.log('Access Token:', accessToken);
            console.log('Access Token Expiry:', accessTokenExpiry);
            console.log('Token Type:', tokenType);
            console.log('User Name:', userName);

            // set cookies
            cookies().set('accessToken', accessToken)
            cookies().set('userName', userName)
            cookies().set('tokenType', tokenType)

            // response
            const responseBodyText = "Success"

            console.log(response.status)
            console.log(responseBodyText)

            const resData = { success: true, message: responseBodyText }
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