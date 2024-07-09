

import MaxWidthLg from "@/components/MaxWidthLg";
import Navbar from "@/components/Navbar";
import AllOrders from "@/components/dashboard/AllOrders";
import BuyerAccountInformation from "@/components/dashboard/BuyerAccountInformation";
import RecentViewdProducts from "@/components/dashboard/RecentViewdProducts";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default function Page() {

    const cookieStore = cookies()

    if (!cookieStore.has("refreshToken")) {
        redirect("/log-in")
    }

    return (
        <>
            <Navbar />

            {/* parent component */}
            <MaxWidthLg>
                <div className="bg-white mt-5 m-2">

                    <span className="text-4xl font-bold">
                        My Dashboard
                    </span>

                    {/* Recent Orders */}
                    <div className="mt-2">
                        <AllOrders />
                    </div>

                    {/* text informations */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-5">

                        {/* Recently Viewd */}
                        <div className="border-2 border-yellow-500 p-1">
                            <RecentViewdProducts />
                        </div>

                        {/* Account Information */}
                        <div className="p-1">
                            <BuyerAccountInformation />
                        </div>

                    </div>


                </div>
            </MaxWidthLg>

        </>
    )

}