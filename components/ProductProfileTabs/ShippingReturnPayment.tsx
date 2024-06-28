import PaymentDetails from "./PaymentDetails";
import ReturnDetails from "./ReturnDetails";
import ShippingDetails from "./ShippingDetails";

export default function ShippingReturnPayment(){
    return(
        <>
        {/* Parent */}
        <div className="flex flex-col ">
            {/* Shipping */}
            <div className="">
                <h3 className="text-xl font-semibold">Shipping</h3>
                {/* Shipping content */}
                <ShippingDetails/>
            </div>
            <div className="">
                <h3 className="text-xl font-semibold">Return</h3>
                {/* Return content */}
                <ReturnDetails/>
            </div>
            <div className="">
                <h3 className="text-xl font-semibold">Payments</h3>
                {/* Payments content */}
                <PaymentDetails/>
            </div>
        </div>
        </>
    )
}