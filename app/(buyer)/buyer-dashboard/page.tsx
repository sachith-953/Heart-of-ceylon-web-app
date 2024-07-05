import MaxWidthLg from "@/components/MaxWidthLg";
import Navbar from "@/components/Navbar";
import AllOrders from "@/components/dashboard/AllOrders";
import BuyerAccountInformation from "@/components/dashboard/BuyerAccountInformation";
import RecentViewdProducts from "@/components/dashboard/RecentViewdProducts";


export default function Page() {

    return (
        <>
            <Navbar />

            {/* parent component */}
            <MaxWidthLg>
                <div className="bg-white mt-5">

                    <span className="text-4xl font-bold">
                        My Dashboard
                    </span>

                    {/* Recent Orders */}
                    <div className="mt-2">
                        <AllOrders />
                    </div>

                    {/* text informations */}
                    <div className="flex flex-row mt-5">

                        {/* Recently Viewd */}
                        <div className="border-2 border-yellow-500 w-1/2 p-1">
                            <RecentViewdProducts />
                        </div>

                        {/* Account Information */}
                        <div className="w-1/2 p-1">
                            <BuyerAccountInformation />
                        </div>

                    </div>


                </div>
            </MaxWidthLg>

        </>
    )

}