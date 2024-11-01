"use client"

import UploadProfilePicture from "@/components/dashboard/sellerDashboard/ManageAccount/UploadProfilePicture"
import UploadCoverImage from "./ManageAccount/UploadCoverImage"
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
import ChangePassword from "../buyerDashboard/ChangePassword"
import { useEffect, useState } from "react"
import ChangeSellerPasswordButton from "./ManageAccount/ChangeSellerPasswordButton"
import ChangeSellerAccountDetails from "./ManageAccount/ChangeSellerAccountDetails"


const ManageAccount = () => {

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
            <div className="bg-white">
                {/* Upload seller profile picture */}
                <UploadProfilePicture />

                {/* Upload Seller Cover image */}
                <UploadCoverImage />

                {/* Change Accound Details */}
                <ChangeSellerAccountDetails />

                {/* Change Password */}
                <ChangeSellerPasswordButton />
                


            </div>
        </>
    )
}
export default ManageAccount