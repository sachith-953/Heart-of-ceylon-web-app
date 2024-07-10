"use client"

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import ChangeAccountInformation from "../ChangeAccountInformation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import ChangePassword from "./ChangePassword";
import ChangePassword1 from "@/app/accountChange/changePassword1/page";

/**
 * if fetching login has error with refresh token,
 * we push user to the login page.
 * in there, user cookies will deleted.
 * user can login again
 */

const BuyerAccountInformation = () => {

    const router = useRouter()
    const { toast } = useToast()

    interface buyerDataType {
        email: string
        firstName: string
        lastName: string
        phoneNo: string
        shippingAddress: string
    }

    const [buyerDetails, setBuyerDetails] = useState<buyerDataType>()

    // store the screen size 
    const [isMobile, setIsMobile] = useState(false);

    const [isError, setIsError] = useState(false)

    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const pushToLogin = () => {
        console.log("pushed to login////////////////")
        router.push("/log-in");
    };

    //this handle by child <ChangeAccountInformation />
    const handleChildDataChange = (isDataUpdated: boolean) => {
        setIsDataUpdated(isDataUpdated)
        console.log("child is calling")
    };


    const dataFetching = async () => {

        try {
            console.log("fetch All Orders start");

            const res = await fetch(
                "http://localhost:3000/api/buyer/dashboard/get-buyer-account-info",
                { cache: 'no-store' }
            );

            if (res.ok) {
                const responseData = await res.json();
                setBuyerDetails(responseData)
                console.log(responseData);
            }
            else if (res.status === 403) {
                // this trigger when referesh token has issure. 
                // if token is expired this will trigger
                toast({
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("****403****************")
                console.log("Redirectiong to login. RT error")
                setIsError(true)
                pushToLogin()
            }
            else {
                const responseData = await res.json();
                console.log(responseData)
                console.log("********failed********")
            }

        }
        catch (error) {
            return new Response(JSON.stringify({
                error: {
                    message: "Un Expected Error"
                }
            }), { status: 500 });
        }
    };

    useEffect(() => {

        if (isDataUpdated) {
            setIsDataUpdated(false)
        }
        dataFetching()

    }, [isDataUpdated]);


    // use for detect screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust this breakpoint as needed
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);


    return (
        <>
            {/* Containter parent */}
            <div>

                <div className="flex flex-row justify-between items-cente mb-3 bg-gray-200 sm:bg-white rounded-md pl-2">
                    <p className="text-2xl font-bold">Account Information</p>

                    {isMobile
                        ?
                        (
                            <div>
                                <Drawer>
                                    <DrawerTrigger>
                                        <span className="text-sm text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer">Edit</span>
                                    </DrawerTrigger>
                                    <DrawerContent>

                                        <ChangeAccountInformation onChildDataChange={handleChildDataChange} />

                                        <DrawerFooter>
                                            {/* <Button>Submit</Button> */}
                                            <DrawerClose>
                                                {/* <Button variant="outline">Cancel</Button> */}
                                            </DrawerClose>
                                        </DrawerFooter>

                                    </DrawerContent>
                                </Drawer>
                            </div>
                        )
                        :
                        (
                            <div>
                                <Dialog>
                                    <DialogTrigger>
                                        <span className="text-sm text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer">Edit</span>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <ChangeAccountInformation onChildDataChange={handleChildDataChange} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )
                    }


                </div>

                {/* Buyer info */}
                <div className="grid grid-cols-1 md:grid-cols-2 pl-4">

                    {/* contact info */}
                    <div className="mr-2 mb-3">

                        <p className="text-lg font-semibold">Account Details</p>

                        {buyerDetails !== undefined
                            ?
                            (
                                <div>
                                    {/* full name */}
                                    <p className="pl-2">{buyerDetails?.firstName + " " + buyerDetails?.lastName}</p>

                                    {/* email */}
                                    <p className="pl-2">{buyerDetails?.email}</p>

                                    {/* phone no */}
                                    <p className="pl-2">{buyerDetails?.phoneNo}</p>
                                </div>
                            )
                            :
                            (
                                <p>Data not found</p>
                            )}

                    </div>

                    {/* Shipping address */}
                    <div className="">

                        <p className="text-lg font-semibold">Shipping Address</p>

                        {buyerDetails?.shippingAddress !== null
                            ?
                            (
                                /* address */
                                <p className="pl-2">
                                    {buyerDetails?.shippingAddress.split(",").map((line, index) => (
                                        <span key={index}>
                                            {index > 0 && <br />}
                                            {line.trim()}
                                            {buyerDetails?.shippingAddress.split(",").length - 1 == index ? <span>.</span> : <span>,</span>}
                                        </span>
                                    ))}
                                </p>
                            )
                            :
                            (
                                <p>Data not found</p>
                            )
                        }
                    </div>

                    {/* Change Password */}
                    <div className="">

                        <p className="text-lg font-semibold">Security</p>


                        {isMobile
                            ?
                            (
                                <div>
                                    <Drawer>
                                        <DrawerTrigger>
                                            <span className="py-1 text-sm text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer">
                                                Change Password
                                            </span>
                                        </DrawerTrigger>
                                        <DrawerContent>

                                            <ChangePassword />

                                            <DrawerFooter>
                                                {/* <Button>Submit</Button> */}
                                                <DrawerClose>
                                                    {/* <Button variant="outline">Cancel</Button> */}
                                                </DrawerClose>
                                            </DrawerFooter>

                                        </DrawerContent>
                                    </Drawer>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <span className="py-1 text-sm text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer">
                                                Change Password
                                            </span>
                                        </DialogTrigger>
                                        <DialogContent>

                                            <ChangePassword />

                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )
                        }


                    </div>

                </div>

            </div >
        </>
    )
}

export default BuyerAccountInformation