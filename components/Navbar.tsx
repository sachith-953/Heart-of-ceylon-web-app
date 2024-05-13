import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";


const Navbar = () => {

    const user = null

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
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
                                    {/* if user is not null, then we give them Link */}
                                    {user ? null : (<Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
                                        Sign in</Link>)}

                                    {/* for decoration purpose*/}
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

                                    {/* cart */}
                                    <div className="ml-4 flow-root md:ml-6 ">
                                        <Cart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    );
}

export default Navbar