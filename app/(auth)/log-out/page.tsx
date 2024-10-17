"use client"

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export default function HandleLogout() {

    const router = useRouter()

    const [serverError, setServerError] = useState("")
    const [success, setSuccess] = useState("")

    //test
    const buttonRef = useRef<HTMLAnchorElement>(null);


    useEffect(() => {

        const handleLogOut = async () => {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/log-out`, {
                method: 'GET',
            })

            const ResponseData = await res.json()

            console.log(ResponseData)

            router.push(`${process.env.NEXT_PUBLIC_URL}/`)

            if (ResponseData.success === true) {
                const shouldClickButton = true;
                if (shouldClickButton && buttonRef.current) {
                    buttonRef.current.click();
                }
            }
            else {
                setSuccess(ResponseData.success)
                setServerError("Email or Password is not Correct")
            }
        }

        handleLogOut()

    });



    return (
        <>
            <div className="hidden">
                <Link ref={buttonRef} href={`${process.env.NEXT_PUBLIC_URL}/`}>
                </Link>
            </div>

        </>
    );
}





