// app/testing/page.tsx
import { NextRequest } from 'next/server';

export default function Page() {
    
  async function handleFormSubmit(formData: FormData) {
    'use server';

    const req = new NextRequest(
      new Request(new URL('/testing', 'http://localhost:8080/api/v1/pBuyer/').toString())
    );

    const createInvoice = async (formData: FormData, req: NextRequest) => {
      'use server';

      const userName = formData.get('uname');
      console.log(JSON.stringify(userName));

      const response = await fetch(`http://localhost:8080/api/v1/pBuyer/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uname: userName }),
      });

      // Handle the response as needed
      // ...
      console.log("response is" + response.json())
    };

    await createInvoice(formData, req);
  }

  return (
    <form action={handleFormSubmit}>
      <input
        type="text"
        name="uname"
        placeholder="user name"
        className="bg-green-400"
      />
      <button type="submit" className="bg-red-600">
        submit
      </button>
    </form>
  );
}