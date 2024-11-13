"use client";

import { useEffect, useState } from "react";

export default function EmailVerifyTokenAccept({
  params,
}: {
  params: { token: string };
}) {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("start");

  //this part triggers when component mounted
  useEffect(() => {
    const handleTokenVerification = async () => {
      console.log("sending token to Next.js API");

      const signToken = params.token;
      console.log("token: " + signToken);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/signup/confirm-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signToken),
        }
      );

      const responseData = await res.json();

      console.log(responseData);

      console.log(responseData.message);

      if (responseData.success === true) {
        console.log("responseData.success === true");
        setIsTokenValid(true);
      } else {
        setErrorMessage(responseData.message);
      }
    };

    handleTokenVerification();
  }, [params.token]);

  return (
    <>
      <div className="h-dvh">
        {/*  this has following structure. if isTokenvalid is false, then please wait part shows */}
        {/* {!isTokenValid ? <div>please wait part</div> : <div>greeting part</div> */}

        {!isTokenValid ? (
          // ***********************************
          // if token is not valid this display
          // ***********************************
          <div className="mx-60 text-center mt-20">
            {/* display if there is no error and token still not valid */}
            {errorMessage === "" ? (
              <h1 className="text-3xl">
                Please Wait... checking your verification link
              </h1>
            ) : (
              <p></p>
            )}

            {/* display if there is error and token not valid */}
            {errorMessage === "" ? <p></p> : <p className="text-3xl">Sorry</p>}
            <h1 className="text-red-600">{errorMessage}</h1>
          </div>
        ) : (
          // ***********************************
          // if token is valid this display
          // ***********************************
          <div className="mx-20 my-20 text-center space-y-6 py-5 px-4 sm:max-2xl:bg-blue-50">
            <h1 className="text-3xl my-6 font-medium">
              Congratulations! Your Email is Verified.
            </h1>
            <h2 className="text-2xl my-5 font-normal">
              Ayubowan! 🙏🏻 Heartfelt greetings from Heart of Ceylon, where Sri
              Lanka{"'"}s diverse offerings come alive.
            </h2>
            <p className="text-lg mt-4">
              Thank you for verifying your email address. Your account is now
              fully activated, and you can start exploring all the amazing
              features and services we have to offer. We{"'"}re thrilled to have
              you on board, and we can{"'"}t wait to see what you{"'"}ll
              accomplish with Heart Of Ceylon.
            </p>

            <button className="bg-sky-500 hover:bg-sky-700 rounded-md px-2 py-1 mt-2 text-white font-semibold">
              <a href="http://localhost:3000">Get Started</a>
            </button>

            <p className="text-base mt-4">
              If you have any questions or need assistance, our support team is
              always ready to help. Thank you for choosing us, and happy
              Shopping!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
