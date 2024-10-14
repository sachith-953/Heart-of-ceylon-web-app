"use client"

import SetNewPasswordCom from "@/components/SetNewPasswordCom";
import ValidatePassword from "@/components/ValidatePassword";
import { useState } from "react";
import ValidateSellerPassword from "./ValidateSellerPassword";


const ChangeSellerPassword = () => {

    const [validatedPassword, setValidatedPassword] = useState("")

    //this handle by <ValidatePassword />
    const handleChildDataChange = (newChildData: string) => {
        setValidatedPassword(newChildData);
        console.log("ChangePassword.tsx ******* password recived: " )
    };


    return (
        <>

            {validatedPassword === ""
                ?
                (
                    <ValidateSellerPassword onChildDataChange={handleChildDataChange} />
                )
                :
                (
                    <SetNewPasswordCom verifiesPasswordFromParent={validatedPassword} />
                )
            }




        </>
    )
}

export default ChangeSellerPassword;