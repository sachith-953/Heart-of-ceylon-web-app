import { cookies } from "next/headers";

export async function GET() {
  console.log("logout Nextjs API has Called");
  const cookieStore = cookies();
  let refreshToken = null;

  if (cookieStore.has('refreshToken')) {
    refreshToken = cookieStore.get('refreshToken');
    console.log("logout > refresh token :" + JSON.stringify(refreshToken));
  } else {
    console.log("logout > refresh token not found");
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

    const response = await fetch(`http://localhost:8080/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshTokenString}`,
        'accept-encoding' : 'gzip, deflate, br'
      },
    });

    console.log("logout request Sent");

    // Handle the response as needed
    if (response.ok) {
      console.log('logout Success');
      // Get the HTTP-Only cookie
      // delete cookies
      cookies().delete('accessToken');
      cookies().delete('refreshToken');
      cookies().delete('userName');
      cookies().delete('tokenType');
      cookies().delete('email');
      console.log("cookies deleted");
      // response
      const responseBodyText = "Success";
      console.log(responseBodyText);
      const resData = { success: true, message: responseBodyText };
      return new Response(JSON.stringify(resData));
    } else {
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
    console.log(error);
  }
}