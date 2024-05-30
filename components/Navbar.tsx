'use client';

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import { getClientSideCookie } from "@/lib/utils";
// import { cookies } from "next/headers";



const Navbar = () => {

    const [user, setUser] = useState(false)


    // uncomment if testing not working

    // let user = null

    // const cookieStore = cookies()

    // if (cookieStore.has('userName')) {
    //     user = cookieStore.get('userName')
    // }else{
    //     user = null
    // }

    //testing
    //https://stackoverflow.com/questions/75225240/accessing-cookie-client-side-with-next-js

    // const user = 

    useEffect(() => {

        const cookieVal = getClientSideCookie("userName")
        console.log("log "+cookieVal)
        
        if(typeof cookieVal === "string"){
            setUser(true)
            console.log("log > user true")
        }
        else{
            setUser(false)
        }


    },[]);


    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 font-sans antialiased">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-x-gray-200">
                        <div className="flex h-16 items-center">

                            {/* TODO : Mobile dev nav */}
                            {/* <MobileNav /> */}

                            {/* logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    {/* <Icons.logo className="h-10 w-10"></Icons.logo> */}
                                </Link>
                            </div>
                            {/* hidden this for non-mobile screens */}
                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                {/* <NavItems /> */}
                            </div>
                            <div className="ml-auto flex items-center">
                                <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
                                    
                                    {/* if user is True, then we hide login btn and show logout btn */}
                                    {user ?

                                        (<Link href="/log-out" className={buttonVariants({ variant: "ghost" })}>
                                            Log-Out</Link>)
                                        :
                                        (<Link href="/log-in" className={buttonVariants({ variant: "ghost" })}>
                                            <p className="">Log-In</p></Link>)}

                                    {/* for decoration purpose => "|" */}
                                    {user ? null : (
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    )}

                                    {/* if user is logged in, then we show drop down for view info and logout */}
                                    {user ? (<p></p>) : (<Link href="/sign-up" className={buttonVariants({ variant: "ghost" })}>Create Account</Link>)}

                                    {/* if user is logged in */}
                                    {user ? (<span className="h-6 w-px bg-gray-200" aria-hidden="true" />) : null}

                                    {user ? null : (
                                        <div className="flex lg:ml-6">
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        </div>
                                    )}



                                </div>
                            </div>

                            {/* cart */}
                            <div className="ml-4 flow-root md:ml-6 ">
                                <Cart />
                            </div>

                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    );
}

export default Navbar