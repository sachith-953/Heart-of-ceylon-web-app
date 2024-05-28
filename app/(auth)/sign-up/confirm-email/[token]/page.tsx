import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";



export default function EmailVerifyTokenAccept({ params, }: { params: { token: string } }) {
    return (
        <>

            <div className="h-dvh">
                <div className="mx-60 text-center mt-20">
                    <h1 className="text-3xl">Please Wait... checking you token</h1>
                    <h1>Token : {params.token}</h1>

                    <h1 className="text-3xl mt-5">Congratulations! Your Email is Verified.</h1>
                    <h2 className="text-2xl mt-5">
                        Ayubowan! 🙏🏻 Heartfelt greetings from Heart of Ceylon, where Sri Lanka{"'"}s diverse offerings come alive.
                    </h2>
                    <p className="text-lg mt-4">
                        Thank you for verifying your email address. Your account is now fully activated, and you can start exploring all the amazing features and services we have to offer.
                        We{"'"}re thrilled to have you on board, and we can{"'"}t wait to see what you{"'"}ll accomplish with Heart Of Ceylon. 
                    </p>

                    <button className="bg-sky-500 hover:bg-sky-700 rounded-md px-2 py-1 mt-2">
                        Get Started
                    </button>

                    <p className="text-base mt-4">
                        If you have any questions or need assistance, our support team is always ready to help.
                        Thank you for choosing us, and happy Shopping!
                    </p>
                </div>
            </div>

        </>
    )
}