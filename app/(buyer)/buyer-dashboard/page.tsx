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
                <div className="bg-white border-2 border-red-500 mt-5">

                    <span className="border-2 border-green-500 text-4xl font-bold">
                        My Dashboard
                    </span>

                    {/* Recent Orders */}
                    <div className="border-2 border-pink-500 mt-2">
                        <AllOrders />
                    </div>

                    {/* text informations */}
                    <div className="border-2 border-blue-500 flex flex-row">

                        {/* Recently Viewd */}
                        <div className="border-2 border-yellow-500 w-1/2">
                            <RecentViewdProducts />
                        </div>

                        {/* Account Information */}
                        <div className="border-2 border-orange-500 w-1/2">
                            <BuyerAccountInformation />
                        </div>

                    </div>


                </div>
            </MaxWidthLg>

        </>
    )

}