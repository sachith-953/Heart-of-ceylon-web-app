import SalesSummery from "@/components/dashboard/sellerDashboard/MySales/salesSummery"
import SellerSales from "@/components/dashboard/sellerDashboard/MySales/sallerSales"


 
const MySales = () => {
    return (
        <>
            <div className="bg-white">
                <div>
                    <SellerSales />
                </div>
                <div>
                    <SalesSummery />
                </div>
            </div>
        </>
    )
}
export default MySales






