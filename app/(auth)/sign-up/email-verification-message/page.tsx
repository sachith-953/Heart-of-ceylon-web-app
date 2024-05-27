


export default function EmailVerificationMessage() {


    return (
        <>
            <div className=" mx-24 my-10 text-center">

                <h1 className="text-3xl mt-5">Welcome Aboard! Just One More Step...</h1>
                
                <h2 className="text-xl mt-5">Your account is almost ready!</h2>
                
                <p className="text-lg mt-5">
                    Thank you for signing up! Before you can start using our platform, we need to verify your email address.

                We{"'"}ve sent a verification link to the email address you provided during sign-up. 
                
                Please check your inbox (and spam/junk folder, just in case) and click on the link to confirm your email.
                </p>
                


                <p className=" mt-5">
                    Please verify your email within the next 24 hours to complete the registration process. The verification link will expire after that.
                </p>
                

                <a href="" className="text-blue-600 hover:text-indigo-700 font-semibold">Resend Verification Link</a>


                <p className=" mt-5">
                    Still having trouble? Contact our support team at [heartOfCeylon.support@gmail.com].
                </p>
                
                

            </div>
        </>
    )
}