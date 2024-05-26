"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupSachith() {

  const router = useRouter()

  const [serverError, setServerError] = useState("")
  const [success, setSuccess] = useState("")

  const handleFormSubmit = async (formData: FormData) => {

    console.log("sending form data to Next js API")

    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      body: formData
    })

    const ResponseData = await res.json()
    console.log(ResponseData)
    console.log(ResponseData.message)


    if (ResponseData.success === true) {
      router.push('/')
    }
    else {
      // if not success, show the error message
      setSuccess(ResponseData.success)
      setServerError(ResponseData.message)
    }

  }

  return (
    <>

      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign-Up to your account
          </h2>
          <p className='text-center mt-3 text-red-600'>
            {!success && serverError}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <form className="space-y-3" action={handleFormSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  placeholder="Kevin"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  placeholder="Peterson"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="example@gmail.com"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone number
              </label>
              <div className="">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  autoComplete="phoneNumber"
                  required
                  placeholder="011-1234567"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  placeholder="Street address"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 mt-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    required
                    placeholder="Kandy"
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                  State/Province
                </label>
                <div className="">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="address-level1"
                    required
                    placeholder="Central Province"
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 mt-4">

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                  Postal Code
                </label>
                <div className="">
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    required
                    placeholder="00000"
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <div className="">
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country"
                    required
                    placeholder="Sri lanka"
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

