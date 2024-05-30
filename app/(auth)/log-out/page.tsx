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

            const res = await fetch('http://localhost:3000/api/log-out', {
                method: 'GET',
            })

            const ResponseData = await res.json()

            console.log(ResponseData)

            router.push('http://localhost:3000/')

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
                <Link ref={buttonRef} href="http://localhost:3000/">
                </Link>
            </div>

        </>
    );
}





