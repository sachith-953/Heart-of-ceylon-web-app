import { Star } from "lucide-react";
import Image from "next/image";


const Product = () => {

    const productStars = 3

    return (
        <>
            {/* product cart */}
            <div className="flex flex-row h-40 sm:h-60 bg-gray-200">

                {/* image */}
                <div className=" rounded-2xl w-2/5 overflow-hidden m-2">
                    <Image
                        src='https://www.srilankabusiness.com/images/export_categories/fruits-vegetables.jpg'
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
                <div className="w-3/5 m-1 sm:m-2">
                    <p className="font-bold text-sm sm:text-lg lg:text-2xl leading-none">
                        {/* limit number of charactor in here */}
                        High Quality Green Tea Packent with special green tea mixing
                    </p>
                    <p className="font-serif font-medium mt-0 sm:mt-1 text-sm lg:text-base">
                        Watawela Tea Pvt Ltd
                    </p>

                    {/* ratings */}
                    <div className="flex flex-col md:flex-row mt-0 md:mt-1 ">

                        <div className="flex flex-row bg-white pr-1 justify-center sm:justify-normal">

                            <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm">Ratings :</p>
                            <div className="flex flex-row ">
                                {Array.from({ length: productStars }, () => (
                                    <Star key={null} fill="#FFD254" strokeWidth={0} />
                                ))}
                                {Array.from({ length: 5 - productStars }, () => (
                                    <Star key={null} fill="#111" strokeWidth={0} />
                                ))}
                            </div>
                        </div>

                        {/* number of product ratings */}
                        <div className="sm:pl-0 md:pl-2">
                            <p className="underline text-xs">100 product ratings</p>
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between">
                        <p className="font-bold text-lg sm:text-2xl md:text-3xl">$10.20</p>
                        <p className="font-mono text-green-600 content-center">Available</p>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between">
                        <p className="text-sm sm:text-base">Shipping Cost $3.20</p>
                        <p className="font-bold text-sm sm:text-base">200 sold</p>
                    </div>



                </div>



            </div>

            {/* horizontal black line  */}
            <div className="border-t border-gray-700 my-2">
            </div>

            make this responsive. we made it responsive for mob versions. check from md size 
        </>
    )
}

export default Product;