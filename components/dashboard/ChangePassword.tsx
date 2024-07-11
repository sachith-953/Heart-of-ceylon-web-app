"use client"

import { useState } from "react";
import ValidatePassword from "../ValidatePassword";
import SetNewPasswordCom from "../SetNewPasswordCom";


const ChangePassword = () => {

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
                    <ValidatePassword onChildDataChange={handleChildDataChange} />
                )
                :
                (
                    <SetNewPasswordCom verifiesPasswordFromParent={validatedPassword} />
                )
            }




        </>
    )
}

export default ChangePassword;