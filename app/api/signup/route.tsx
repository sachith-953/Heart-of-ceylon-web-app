import { cookies } from "next/headers";


export async function POST(request : Request) {
    let formData = await request.formData()

    console.log("in post api")

    try {
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phoneNumber: formData.get('phoneNumber'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            postalCode: formData.get('postalCode'),
            country: formData.get('country'),
            email: formData.get('email'),
            password: formData.get('password'),
          };
    
          // const userName = formData.get('uname');
          console.log(JSON.stringify(userData));
    
          const response = await fetch(`http://localhost:8080/api/v1/sign-up/buyer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
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
            const resData = {redirect : true}
            return new Response(JSON.stringify(resData))

        }
        else {
            // TODO : handle errors thrown by server side
            console.log("Error in server API")
            console.log(response.status)
            // console.log(response.message)
            const resData = {redirect : false}
            return new Response(JSON.stringify(resData))
        }
    }
    catch (error) {
        console.log(error)
    }

}