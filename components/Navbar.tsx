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
    const [userRole, setUserRole] = useState("");


    useEffect(() => {

        const cookieVal = getClientSideCookie("userName")
        console.log("log " + cookieVal)

        const cookieVal2 = getClientSideCookie("userRole")
        console.log("log " + cookieVal2)


        if (typeof cookieVal === "string") {
            setUser(true)
            console.log("log > user true" + user)

            if (typeof cookieVal2 === "string") {
                setUserRole(cookieVal2)
            }
        }
        else {
            setUser(false)
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 font-sans antialiased">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-x-gray-200">
                        <div className="flex h-16 items-center">

                            {/* TODO : Mobile dev nav */}
                            {/* <MobileNav /> */}

                            {/* logo */}
                            <div className="ml-4 flex lg:ml-0 p-3 hover:bg-gray-300">
                                <Link href="/">
                                    Home
                                    {/* <Icons.logo className="h-10 w-10"></Icons.logo> */}
                                </Link>
                            </div>

                            {/* hidden this for non-mobile screens */}
                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                {/* <NavItems /> */}
                            </div>

                            <div className="ml-auto flex items-center">
                                <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">

                                    {/* ************** DashBoard button Start ************** */}
                                    {/* if user is logged in, then we show buyer dashboard */}
                                    {/* for sellers */}
                                    {userRole === "ROLE_SELLER"
                                        ?
                                        (<Link href="/seller-dashboard" className={buttonVariants({ variant: "ghost" })}>DashBoard</Link>)
                                        :
                                        (<p></p>)
                                    }

                                    {/* for buyers */}
                                    {userRole === "ROLE_BUYER"
                                        ?
                                        (<Link href="/buyer-dashboard" className={buttonVariants({ variant: "ghost" })}>DashBoard</Link>)
                                        :
                                        (<p></p>)
                                    }

                                    {/* for decoration purpose => "|" */}
                                    {user
                                        ?
                                        (<span className="h-6 w-px bg-gray-200" aria-hidden="true" />)
                                        :
                                        null
                                    }
                                    {/* ************** DashBoard button End ************** */}

                                    {/* if user is True, then we hide login btn and show logout btn */}
                                    {user
                                        ?
                                        (<Link href="/log-out" className={buttonVariants({ variant: "ghost" })}>
                                            Log-Out</Link>)
                                        :
                                        (<Link href="/log-in" className={buttonVariants({ variant: "ghost" })}>
                                            <p className="">Log-In</p></Link>)
                                    }

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

                            {/* sell */}
                            <div className="mx-4">
                                <Link
                                    href="/seller-log-in"
                                    className={buttonVariants({ variant: "ghost" })}
                                >
                                    Sell
                                </Link>
                            </div>
                            <span className=" h-6 w-px bg-gray-200" aria-hidden="true" />

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