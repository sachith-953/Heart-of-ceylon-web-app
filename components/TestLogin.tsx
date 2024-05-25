"use-client"

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import React from 'react';

export default function TestLogin() {



    async function handleFormSubmit(formData: FormData) {
        'use server';

        
    
        // TODO : handle the errors. when there is a error, page shows source code. fix that
        

        const req = new NextRequest(
            new Request(new URL('/log-in', 'http://localhost:8080/api/v1').toString())
        );

        const createInvoice = async (formData: FormData, req: NextRequest) => {
            'use server';


            try {
                const email = formData.get('email')
                const password = formData.get('password')

                const credentials = `Basic ${btoa(`${email}:${password}`)}`;

                const response = await fetch(`http://localhost:8080/api/v1/log-in`, {
                    method: 'POST',
                    headers: {
                        'Authorization': credentials,
                    },
                });

                // Handle the response as needed

                if (response.ok) {
                    
                    //get the response 
                    const data = await response.json();

                    const accessToken = data.access_token;
                    const accessTokenExpiry = data.access_token_expiry;
                    const tokenType = data.token_type;
                    const userName = data.user_name;

                    // Handle the response data as needed
                    console.log('Access Token:', accessToken);
                    console.log('Access Token Expiry:', accessTokenExpiry);
                    console.log('Token Type:', tokenType);
                    console.log('User Name:', userName);
                    
                    // set cookies
                    cookies().set('accessToken', accessToken)
                    cookies().set('userName', userName)
                    cookies().set('tokenType', tokenType)

                    // redirect after sucess login
            
                }
                else {
                    // TODO : handle errors thrown by server side
                    console.log(response.status)
                }
            }
            catch (error) {
                console.log(error)
            }




        };

        await createInvoice(formData, req);
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
    )
}