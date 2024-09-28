
//For Testing Purpose
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import teaImage from "../Images/ceylon-Tea.jpg"; // Imported image

interface Product {
    title?: string;
    description?: string;
    price?: number;
    stock?: number;
    image?: string;
}

interface ProductProfileProps {
    product?: Product;
}

const ProductProfile: React.FC<ProductProfileProps> = ({ product }) => {
    return (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Product Image */}
            <div className="w-full md:w-2/3">
                <div className="relative h-96 md:h-full">
                    <Image 
                        src={teaImage} // Directly using imported image
                        alt={product?.title || "Ceylon Tea"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                </div>
            </div>
            
            {/* Product details */}
            <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Ceylon Tea {product?.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">The finest cup of tea,the name Ceylon had become synonymous with the world{"'"}s finest tea. {product?.description}</p>
                    <p className="text-xl font-semibold text-green-600 mb-4">
                        LKR {product?.price} / ${((product?.price || 3499.00)).toFixed(2)}
                    </p>
                    <div className="flex items-center mb-4">
                        <span className="mr-2 text-gray-700">Quantity:</span>
                        <input 
                            type="number" 
                            min="1" 
                            max={product?.stock} 
                            defaultValue="1"
                            className="w-16 px-2 py-1 border rounded"
                        />
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Available: 5Kg {product?.stock}</p>
                </div>
                <div className="space-y-3">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" variant="default">
                        Buy It Now
                    </Button>
                    <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800" variant="outline">
                        Add To Cart
                    </Button>
                    <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800" variant="outline">
                        Wholesale Mode
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductProfile;



