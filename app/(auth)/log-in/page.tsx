"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

// NOTE : check api/login/route.tsx file for server side codes

// TODO : handle server not found error in side try catch block. we may be able to return a new html inside catch block

export default function TestLogin2() {

    const router = useRouter()

    const [serverError, setServerError] = useState("")
    const [success, setSuccess] = useState("")

    const handleFormSubmit = async (formData: FormData) => {

        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: formData
        })

        const ResponseData = await res.json()

        console.log(ResponseData)


        if (ResponseData.success === true) {
            router.push('/')
        }
        else {
            setSuccess(ResponseData.success)
            setServerError("Email or Password is not Correct")
        }
    }

    return (
        <>
            <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log-in to your account
                    </h2>
                    <p className='text-center mt-3 text-red-600'>
                        {!success && serverError}
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-3" action={handleFormSubmit}>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="yourEmail@abc.com"
                                    className="pl-3 block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:text-red-600
                                    focus:invalid:border-red-500 focus:invalid:ring-red-500 "
                                />
                                
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    minLength={8}
                                    required
                                    placeholder="your password"
                                    className="pl-3 block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:text-red-600
                                    focus:invalid:border-red-500 focus:invalid:ring-red-500 "
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log-in
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}




