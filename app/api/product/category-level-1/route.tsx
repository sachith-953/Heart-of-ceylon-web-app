import { removeRequestMeta } from "next/dist/server/request-meta";

export const dynamic = "force-dynamic";

export async function GET() {
    
    // console.log("top selling Nextjs API has Called");

    try {

      const response = await fetch('http://localhost:8080/api/v1/pBuyer/getAllLevel1Categories', { cache: 'no-store' });
  
      // console.log("topselling request Sent");
  
      // Handle the response as needed
      if (response.ok) {

        // console.log('fetching topSelling Success');

        const data = await response.json();

        // console.log(data)

        return new Response(JSON.stringify(data));

      } else {

        console.log("[category-level-1] NextJs API failed : code " + response.status);

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