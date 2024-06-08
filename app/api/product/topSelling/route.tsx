
export const dynamic = "force-dynamic";


export async function GET() {
    
    // console.log("top selling Nextjs API has Called");
    // console.log("top selling Nextjs API has Called");
  
    try {

      const response = await fetch('http://localhost:8080/api/v1/pBuyer/TopSellingProducts', { cache: 'no-store' });
  
      // console.log("topselling request Sent");
  
      // Handle the response as needed
      if (response.ok) {

        // console.log('fetching topSelling Success');
        // console.log('fetching topSelling Success');

        const data = await response.json();

        // console.log(data)
        // console.log(data)

        return new Response(JSON.stringify(data));

      } else {

        // console.log("NextJs API failed : code " + response.status);

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