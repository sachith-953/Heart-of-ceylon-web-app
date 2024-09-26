// //Real Code
// "use client"
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Button } from "../ui/button";

// interface Product {
//     title?: string;
//     description?: string;
//     price?: number;
//     stock?: number;
//     image?: string;
// }

// interface ProductProfileProps {
//     image?: string;
//     product?: Product;
// }

// const ProductProfile: React.FC<ProductProfileProps> = ({ image: propImage, product: propProduct }) => {
//     const [product, setProduct] = useState<Product | null>(propProduct || null);
//     const [loading, setLoading] = useState<boolean>(!propProduct);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (!propProduct) {
//             const fetchProductDetails = async () => {
//                 try {
//                     const res = await fetch('http://localhost:3000/api/v1/pBuyer/getProductDetails');
//                     if (!res.ok) {
//                         throw new Error('Failed to fetch product details');
//                     }
//                     const data = await res.json();
//                     setProduct(data);
//                 } catch (err) {
//                     setError('Error fetching product details. Please try again later.');
//                     console.error(err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchProductDetails();
//         }
//     }, [propProduct]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!product) return <div>No product data available.</div>;

//     return (
//         <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//             {/* Product Image */}
//             <div className="w-full md:w-2/3">
//                 <div className="relative h-96 md:h-full">
//                     <Image 
//                         src={propImage || product.image || './Images/ceylon-Tea.jpg'}
//                         alt={product.title || "Product"}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
//                     />
//                 </div>
//             </div>
            
//             {/* Product details */}
//             <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title || "Ceylon tea"}</h2>
//                     <p className="text-gray-600 text-sm mb-4">{product.description || "100% sri lankan product"}</p>
//                     <p className="text-xl font-semibold text-green-600 mb-4">
//                         LKR {product.price} / ${((product.price || 0) / 3.2).toFixed(2)}
//                     </p>
//                     <div className="flex items-center mb-4">
//                         <span className="mr-2 text-gray-700">Quantity:</span>
//                         <input 
//                             type="number" 
//                             min="1" 
//                             max={product.stock} 
//                             defaultValue="1"
//                             className="w-16 px-2 py-1 border rounded"
//                         />
//                     </div>
//                     <p className="text-sm text-gray-500 mb-6">Available: {product.stock}</p>
//                 </div>
//                 <div className="space-y-3">
//                     <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" variant="default">
//                         Buy It Now
//                     </Button>
//                     <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800" variant="outline">
//                         Add To Cart
//                     </Button>
//                     <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800" variant="outline">
//                         Wholesale Mode
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductProfile;


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
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Ceylon tea {product?.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">100% sri lankan product {product?.description}</p>
                    <p className="text-xl font-semibold text-green-600 mb-4">
                        LKR {product?.price} / ${((product?.price || 0) / 3.2).toFixed(2)}
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

