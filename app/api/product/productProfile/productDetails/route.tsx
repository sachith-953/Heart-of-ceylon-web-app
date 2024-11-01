// export const dynamic = "force-dynamic";

// export async function POST(request: Request) {
//     const reqParam = await request.json();
//     const productId = reqParam.productId;
   
//     console.log("Get product details for product profile API has been called");
//     try {
//         const response = await fetch(`http://localhost:8080/api/v1/pBuyer/getProductDetails?productId=${productId}`, {
//             method: 'GET', // Explicitly set method
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         console.log("Get-product-details > product profile -----> request sent to backend");
        
//         if (response.ok) {
//             const data = await response.json();  
//             console.log("Product data fetched successfully:", data);
            
//             return new Response(
//                 JSON.stringify(data),
//                 {
//                     status: 200,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//         } else {
//             const responseBodyText = await response.text();
//             const resData = { message: responseBodyText };
//             console.warn(`${response.status} >> product details fetching >> ${responseBodyText}`);
            
//             return new Response(
//                 JSON.stringify(resData),
//                 { 
//                     status: response.status,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//         }
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return new Response(
//             JSON.stringify({
//                 error: {
//                     message: "Unexpected Error",
//                     details: error instanceof Error ? error.message : "Unknown error"
//                 }
//             }), 
//             { 
//                 status: 500,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//     }
// }

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const reqParams = await request.json();
    const productId = reqParams.productId;
    console.log("sachithge id........." + productId)
    console.log(productId)
    console.log("productId is ADOOOOOOOOOOOOOO :" + productId);

    try {
        const response = await fetch('http://localhost:8080/api/v1/pBuyer/get-details-of-a-product?productId=402', { cache: 'no-store' });
  
        console.log("Sachithge request send to backend");
    
        // Handle the response as needed
        if (response.ok) {
  
          // console.log('fetching topSelling Success');
          // console.log('fetching topSelling Success');
  
          const data = await response.json();
  
          console.log("sachithge data")
          console.log(data)
  
          return new Response(JSON.stringify(data));
            console.log("sachithge request dent to client side")
        } else {
  
          console.log("sachithge request failed " + response.status);
  
          const responseBodyText = "something not right";
          // return the response
  
          const resData = { success: false, message: responseBodyText };
          return new Response(JSON.stringify(resData));
        }
  
      } catch (error) {
        console.log(error);
        //TODO : handle the error
      }
}
