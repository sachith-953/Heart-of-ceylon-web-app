import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {


    try {
        // delte all cookies
        const cookieStore = cookies()
        cookieStore.getAll().map((cookie) => (
            cookies().delete(cookie.name)
        ))

        console.log("Cookies deleted from Next Js Server");

        const resData = { success: false, message: "Cookies Deleted" }
        return new Response(JSON.stringify(resData), { 
            status: 200
        });



    }
    catch (error) {
        return new Response(JSON.stringify({
            error: {
                message: "Un Expected Error"
            }
        }), { status: 500 });
    }
}







