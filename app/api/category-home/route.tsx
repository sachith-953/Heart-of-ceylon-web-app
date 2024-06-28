export const dynamic = "force-dynamic";

export async function POST(request: Request) {

    const parentId = await request.json()
    console.log("category-home API reqParams :" + parentId)


    console.log("Sub categories for parent category fetching Nextjs API has Called");

    try {

      const response = await fetch(`http://localhost:8081/api/v1/pBuyer/getSubCategories?parentCategoryId=${parentId}`, { cache: 'no-store' });
  
      console.log("getSubCategories request Sent");
  
      // Handle the response as needed
      if (response.ok) {

        console.log('fetching SubCategories Success');

        const data = await response.json();

        console.log(data)

        return new Response(JSON.stringify(data));

      } else {

        console.log("NextJs API failed : code " + response.status);

        const responseBodyText = await response.text();
        const status =  response.status;

        // return the response
        const resData = { success: false, message: responseBodyText };
        return new Response(JSON.stringify(resData), {
          status: status, // or any other appropriate status code
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

    } catch (error) {
      console.log(error);
      //TODO : handle the error
    }
  }