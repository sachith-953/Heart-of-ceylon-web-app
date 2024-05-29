"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function HandleLogout() {

    const router = useRouter()

    const [serverError, setServerError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {

        const handleLogOut = async () => {

            const res = await fetch('http://localhost:3000/api/log-out', {
                method: 'GET',
            })

            const ResponseData = await res.json()

            console.log(ResponseData)

            router.push('/')
            if (ResponseData.success === true) {

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


        </>
    );
}





