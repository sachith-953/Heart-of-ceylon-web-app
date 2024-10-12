// pages/api/fetchCart.ts
import { cookies } from "next/headers";

export async function GET() {
  console.log("getCartDetails Nextjs API has Called");
  const cookieStore = cookies(); // access cookies
  let email: string | undefined = undefined;

  if (cookieStore.has('email')) {   // check whether email exists
    email = cookieStore.get('email')?.value; // if the email is in the cookies get email value
    console.log("cart data > email :" + email);
  } else {
    console.log("cart data > email not found");
    return new Response(JSON.stringify({ error: "Email not found in cookies" }), { status: 400 });
  }

  if (email === undefined) {
    return new Response(JSON.stringify({ error: "Email not found in cookies" }), { status: 400 });
  }

  try {
    const response = await fetch(`http://localhost:8080/api/v1/pBuyer/get-cart-items?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Request sent to backend with email:", email);

    if (!response.ok) {
      const error = await response.text();
      console.log("Error fetching cart details:", error);
      return new Response(
        JSON.stringify({ error }),
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Cart details fetched successfully:", data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log("Failed to fetch cart details:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cart details" }), { status: 500 });
  }
}
