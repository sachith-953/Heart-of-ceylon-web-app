"use client"

import { useRouter } from "next/navigation"

// NOTE : check api/login/route.tsx file for server side codes

export default function TestLogin2() {

  const router = useRouter()

    const handleFormSubmit = async (formData : FormData) => {
        const res = await fetch('http://localhost:3000/api/login',{
            method: 'POST',
            body: formData
        })

        const ResponseData = await res.json()
        console.log(ResponseData)

        // TODO : redirect
        if(ResponseData.redirect === true){
          router.push('/')
        }
    }

  return (
    <>
            <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log-in to your account
                    </h2>
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
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    autoComplete=""
                                    required
                                    placeholder="your password"
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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




