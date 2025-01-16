export const dynamic = "force-dynamic"; // no cache

import { cookies } from "next/headers";

/**
 * this API use to change seller verification in admin dashboard
 * email is taken from the cookies.
 * ==============================================================
 * === Following step 1,2,3 are common for all Auth requests  ===
 * === so we only need to change step 4. keep others UNCHANGE ===
 * ==============================================================
 * 1.get email from cookies.
 * 2.get refresh token from cookies
 * 3.get access token from the /api/get-access-token
 * 4.send the request to backend to fetch sales summery
 */

export async function POST(request: Request) {
  // decalare global variables
  const cookieStore = cookies();
  let email = null;
  let refreshToken = null;
  let accessToken = null;
  let emailValueString = null;
  let refreshTokenString = null;

  console.log(
    "\n update-seller-verification > update seller verification in admin dashboard : Nextjs API has Called"
  );

  // ***************************************************************
  // ******************* 1. Get email From Cookies *****************
  // ***************************************************************

  if (cookieStore.has("email")) {
    email = cookieStore.get("email");
    // console.log("salesSummery >  > email :" + JSON.stringify(email));
    //output :
    //get-access-token > email :{"name":"email","value":"s19093@sci.pdn.ac.lk","path":"/"}
  } else {
    console.log("get-access-token > email not found");
    return new Response(
      JSON.stringify({
        error: {
          message: "get-access-token > email found",
        },
      }),
      { status: 403 }
    );
  }

  //get email from the JSON object which taken from cookies
  const emailValue = email?.value ?? "";
  emailValueString = JSON.stringify(emailValue);

  //refreshTokenString has double quotes in it like "sjsdkjaklf"
  //so those duble quotes should be removed before send to the backend.
  //otherwise undetectable malfunctions can occures
  emailValueString = emailValueString.replace(/"/g, "");
  console.log(
    "update-seller-private-details  > email >>>: " + emailValueString
  );

  // *************************************************************
  // ************* 2. Get Refresh-Token From Cookies *************
  // *************************************************************

  if (cookieStore.has("refreshToken")) {
    refreshToken = cookieStore.get("refreshToken");
    console.log(
      "update-seller-private-details > refresh token :" +
        JSON.stringify(refreshToken)
    );
  } else {
    console.log("update-seller-private-details > refresh token not found");
    return new Response(
      JSON.stringify({
        error: {
          message: "get-access-token > Token not found",
        },
      }),
      { status: 403 }
    );
  }

  const refreshTokenValue = refreshToken?.value ?? ""; // get the refresh token and store
  refreshTokenString = JSON.stringify(refreshTokenValue); // stringify the refresh token

  //refreshTokenString has double quotes in it like "sjsdkjaklf"
  //so those duble quotes should be removed before send to the backend.
  //otherwise undetectable malfunctions can occures
  refreshTokenString = refreshTokenString.replace(/"/g, "");
  console.log("logout > refresh token line24:" + refreshTokenString);
  const credential = `Bearer ${refreshTokenString}`;

  // *************************************************************
  // ********* 3. Get a New Access-Token from Refresh-Token ******
  // *************************************************************

  try {
    const response = await fetch(`http://localhost:8080/api/v1/refresh-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshTokenString}`, // pass refresh token under authentication
        "accept-encoding": "gzip, deflate, br",
      },
    });

    console.log(
      "update-seller-private-details >>> get-access-token request Sent"
    );

    // Handle the response as needed
    if (response.ok) {
      console.log("**** get-access-token by refresh-token is Success ****");

      // console.log(response)

      const data = await response.json();
      console.log(data.access_token);
      console.log("access-token response : " + data);
      accessToken = data.access_token; // store access token in a variable
    } else {
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
      return new Response(
        JSON.stringify({
          error: {
            message: "Un Expected Error. get-access-token",
          },
        }),
        { status: 403 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Un Expected Error. get-access-token",
        },
      }),
      { status: 500 }
    );
  }

  // *************************************************************
  // **************** 4. update seller verification  *******************
  // *************************************************************

  console.log("update-seller-verification Nextjs API has Called");
  try {
    //get the sellerId here
    // Get the request body containing verification Update
    const requestBody = await request.json();
    const sellerId = requestBody.sellerId;
    const sellerVerification = requestBody.sellerStatus;

    const url = new URL(`${process.env.NEXT_PUBLIC_SPRING_BOOT_SERVER_URL}/api/v1/auth/update-seller-verification?adminEmail=${emailValueString}&sellerId=${sellerId}`);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sellerVerification: sellerVerification, 
        ...(sellerVerification === "NOT_APPROVED" && { mailText: requestBody.reason })
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return new Response(
          JSON.stringify({
            error: {
              message: errorText || "Failed to update seller verification",
            },
          }),
          { status: response.status }
        );
      }
  
      const responseData = await response.text();
      return new Response(JSON.stringify({ message: responseData }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
    } catch (error) {
      console.error("Error in update-seller-verification:", error);
      return new Response(
        JSON.stringify({
          error: {
            message: "Unexpected error occurred",
          },
        }),
        { status: 500 }
      );
    }
  
}
