"use client"

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
import { useEffect, useState } from "react"
import ChangePassword from "../../buyerDashboard/ChangePassword"
import ChangeSellerPassword from "./ChangeSellerPassword"


const ChangeSellerPasswordButton = () => {

    const [isMobile, setIsMobile] = useState(false);

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
            <div className="bg-white max-w-2xl mx-auto mt-8 p-4">

                {/* Change Password */}
                <div className="">

                    <p className="text-2xl font-bold mb-4">Change Password</p>
                    <hr className="py-3" />


                    {isMobile
                        ?
                        (
                            <div>
                                <Drawer>
                                    <DrawerTrigger>
                                        <span className="bg-blue-500 text-white py-2 px-5 rounded-3xl hover:bg-blue-700 cursor-pointer">
                                            Change Password
                                        </span>
                                    </DrawerTrigger>
                                    <DrawerContent>

                                        <ChangeSellerPassword />

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
                                        <span className="bg-blue-500 text-white py-2 px-5 rounded-3xl hover:bg-blue-700 cursor-pointer">
                                            Change Password
                                        </span>
                                    </DialogTrigger>
                                    <DialogContent>

                                        <ChangeSellerPassword />

                                    </DialogContent>
                                </Dialog>
                            </div>
                        )
                    }


                </div>


            </div>
        </>
    )
}
export default ChangeSellerPasswordButton