'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


const Page = () => {

    const searchParams = useSearchParams();
    const sellerId = searchParams.get('sellerId');

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

            {sellerId !== null ?
                (
                    <Link href={sellerId}>
                        click
                    </Link>
                ) : (<p></p>)}


        </div>
    );
}

const TestWholePage = () => {
  return (
    <>
      <div className="bg-white">
        <Suspense>
          <Page />
        </Suspense>
      </div>
    </>
  )
}

export default TestWholePage;

