import { Star } from "lucide-react";
import Image from "next/image";


const Product = () => {

    return (
        <>
            {/* product cart */}
            <div className="flex flex-row h-40 sm:h-60 bg-gray-200">

                {/* image */}
                <div className="border-2 border-green-500 rounded-2xl w-2/5 overflow-hidden m-2">
                    <Image
                        src= 'https://www.srilankabusiness.com/images/export_categories/fruits-vegetables.jpg'
                        width={2000}
                        height={2000}
                        alt="sample image"

                        style={{
                            objectFit: "cover",
                            // maxWidth: "auto%",
                            height: "100%",
                        }}
                    />
                </div>

                {/* content */}
                <div className="border-2 border-green-500 w-3/5 m-3">
                    <p className="font-bold text-2xl leading-none">        
                         {/* limit number of charactor in here */}
                        High Quality Green Tea Packent with special green tea mixing
                    </p>
                    <p className="font-serif font-medium mt-1">
                        Watawela Tea Pvt Ltd
                    </p>
                    <div className="flex flex-row">
                        {/* rating start */}
                        <div className="flex flex-row">
                            <p>Ratings</p>
                            <div className="flex flex-row">
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                        </div>

                        {/* number of product ratings */}
                        <div>
                            <p>100 product ratings</p>
                        </div>
                    </div>
                    <p>$10.20</p>
                    <p>Available</p>
                    <p>Shipping Cost $3.20</p>
                    <p>200 sold</p>

                </div>

                {/* horizontal black line  */}
                <div className="border-t border-gray-700 my-2">

                </div>

            </div>

        </>
    )
}

export default Product;