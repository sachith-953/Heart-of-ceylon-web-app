import { Star } from "lucide-react";
import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface ChildProps {
    productData: productData[];
}

interface productData {
    productAvailableStokes: number
    productID: number
    productMainImage: string
    productName: string
    productNoOfRatings: number
    productPrice: number
    productRatings: number
    productTotalItemSold: number
    //todo : add seller details
    // change this in search-result page.tsx too
}

const Product: React.FC<ChildProps> = ({ productData, }) => {

    return (
        <>
            <div>
                {productData && Array.isArray(productData) && productData.length > 0 ?
                    (<div>
                        {
                            productData.map((pData: productData) => {

                                return (
                                    <div key={pData.productID}>
                                        {/* product cart */}
                                        <div className="flex flex-row h-40 sm:h-60 bg-gray-200 hover:bg-gray-300">

                                            {/* image */}
                                            <div className=" rounded-2xl w-2/5 overflow-hidden m-2">
                                                <Image
                                                    src={pData.productMainImage}
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
                                                    {/* limit number of charactor in here. following text is maximum sample text */}
                                                    {/* High Quality Green Tea Packent with special green tea mixing */}
                                                    {pData.productName}
                                                </p>
                                                <p className="font-serif font-medium mt-0 sm:mt-1 text-sm lg:text-base">
                                                    {/* TODO : get this from the database */}
                                                    Watawela Tea Pvt Ltd
                                                </p>

                                                {/* ratings */}
                                                <div className="flex flex-col md:flex-row mt-0 md:mt-1 ">

                                                    <div className="flex flex-row bg-white pr-1 justify-center sm:justify-normal">

                                                        <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm">Ratings :</p>
                                                        <div className="flex flex-row">
                                                            {Array.from({ length: pData.productRatings }, (_, index) => (
                                                                <Star key={index} fill="#FFD254" strokeWidth={0} />
                                                            ))}
                                                            {Array.from({ length: 5 - pData.productRatings }, (_, index) => (
                                                                <Star key={5 * pData.productRatings + index} fill="#111" strokeWidth={0} />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* number of product ratings */}
                                                    <div className="sm:pl-0 md:pl-2">
                                                        <p className="underline text-xs">{pData.productNoOfRatings} product ratings</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row md:flex-col justify-between">
                                                    <p className="font-bold text-lg sm:text-2xl md:text-3xl">${pData.productPrice}</p>
                                                    {pData.productAvailableStokes > 0
                                                        ?
                                                        <p className="font-mono text-green-600 content-center">Available</p>
                                                        :
                                                        <p className="font-mono text-red-600 content-center">Not-Available</p>
                                                    }

                                                </div>

                                                <div className="flex flex-row md:flex-col justify-between">
                                                    <p className="text-sm sm:text-base">Shipping Cost $3.20</p>
                                                    <p className="font-bold text-sm sm:text-base">{pData.productTotalItemSold} sold</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* horizontal black line  */}
                                        <div className="border-t border-gray-700 my-2"></div>
                                    </div>

                                )
                            })
                        }
                        <div className="m-2 mb-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="">
                                            <span>Previous</span>
                                        </PaginationPrevious>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive >1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" >2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" >
                                            <span>Next</span>
                                        </PaginationNext>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>

                        </div>

                    </div>
                    
                    )
                    :
                    (
                        <p>No products found.</p>
                    )
                }
            </div>
        </>
    )
}

export default Product;