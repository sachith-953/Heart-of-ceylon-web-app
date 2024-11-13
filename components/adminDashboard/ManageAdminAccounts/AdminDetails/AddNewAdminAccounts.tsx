"use client";

import MaxWidthLg from "@/components/MaxWidthLg";
import { error } from "console";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const AddNewAdminAccounts = () => {
  //for track loading states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For password confirmation error
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("W@lid1234");
  const [password, setPassword] = useState("W@lid1234"); //set default values so initially it not trigger error text

  const router = useRouter();

  // display messages
  const { toast } = useToast();

  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  //*************REGEX*************
  // Use for show errors
  const nameRegex = /^[a-zA-Z\s]+$/; // Regular expression pattern for names (only letters and spaces allowed)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const atleastOneDigitRegex = /^(?=.*\d)/; // password should contain atleas one digit
  const specialCharRegex =
    /^(?=.*?[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]+$/;
  const oneSimpleAndOneCapitalRegex =
    /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]+$/; // password should contain atleas one simple and capital letters
  const eightCharRegex = /^.{8,}$/;
  const numericRegex = /^[0-9]+$/;

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin-dashboard/ManageAdminAccounts/add-new-admin`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const ResponseData = await res.json();
        console.log(ResponseData);
        console.log("successfully changed acc info");
        toast({
          title: "Success..",
          description: "Please remind new admin to confirm the email !",
        });
      } else if (res.status === 403) {
        // this trigger when referesh token has issure.
        // if token is expired this will trigger
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        console.log("****403****************");
        console.log("Redirectiong to login. RT error");
        router.push("/log-in");
      } else {
        const ResponseData = await res.json();
        console.log(ResponseData);
        // show error notification in red color
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description:
            "Plase Try Again. There was a problem with your request." +
            ResponseData.message,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "UnExpected Error",
        description: "Please Try again.",
      });
    } finally {
      // Always reset submitting state
      setIsSubmitting(false);
    }
  };

  const buttonIsClicked = () => {
    setIsSubmitting(true);
  };

  // check the password and confirmPassword each time confirmPassword change
  useEffect(() => {
    confirmPassword !== password
      ? setPasswordError("Password not Matching...")
      : setPasswordError("");
  }, [confirmPassword, password]);

  return (
    <>
      <MaxWidthLg>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-screen-sm bg-gray-100 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Create New Admin Account
            </h2>
            <form
              action={handleFormSubmit}
              onSubmit={buttonIsClicked}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Primary Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber1"
                  name="phoneNumber1"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Secondary Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phoneNumber2"
                  name="phoneNumber2"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {!eightCharRegex.test(password.trim()) ? (
                  <p className="text-sm text-red-600">
                    Password must contain at least 8 Characters
                  </p>
                ) : (
                  <p></p>
                )}
                {!atleastOneDigitRegex.test(password.trim()) ||
                !specialCharRegex.test(password.trim()) ||
                !oneSimpleAndOneCapitalRegex.test(password.trim()) ? (
                  <p className="text-sm text-red-600">Please add at least:</p>
                ) : (
                  <p></p>
                )}
                {!atleastOneDigitRegex.test(password.trim()) ? (
                  <p className="text-sm text-red-600 ml-2">One Number</p>
                ) : (
                  <p></p>
                )}
                {!specialCharRegex.test(password.trim()) ? (
                  <p className="text-sm text-red-600 ml-2">
                    One Special character
                  </p>
                ) : (
                  <p></p>
                )}
                {!oneSimpleAndOneCapitalRegex.test(password.trim()) ? (
                  <p className="text-sm text-red-600 ml-2">
                    One Simple Letter and One Capital Letter
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed 
                ${passwordError ? "border-red-500" : ""}`}
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
              disabled:opacity-50 disabled:cursor-not-allowed 
              flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Create Admin Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </MaxWidthLg>
    </>
  );
};

export default AddNewAdminAccounts;
