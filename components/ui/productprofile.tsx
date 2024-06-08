"use client";
import { useState } from "react";
import Image from "next/image"; // Import Image from next/image
import Footer from "../Footer";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";

export default function ProductProfile() {
    // Define the imageLink and title variables
    const imageLink = "https://images.pexels.com/photos/2711959/pexels-photo-2711959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const title = "Product Image";

    // State for amount
    const [amount, setAmount] = useState(1);

    return (
        <>
            <Navbar />
            <SearchBar />
            <div className="flex justify-end" style={{ width: '1400px', height: '400px' }}>
                {/* First Container */}
                <div className="image-container">
                    <Image
                        className="rounded-t-xl"
                        src={imageLink}
                        alt={title}
                        width={550}
                        height={550}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            marginRight: "500px",
                            marginBottom:"80px",
                        }}
                    />
                </div>

                {/* Second Container */}
                <div className="group/item border-2 border-white hover:border-gray-400 hover:scale-105">
                    <div className="flex flex-col gap-4 lg:w-3/4 mx-auto">
                        <div className=" bg-gray-200">
                            <h1 className="text-3xl font-bold justify-end">Sri Lankan Coffee Beans</h1>
                            <div>
                            <span className="text-black-600 font-semibold">foodCollect#193(seller)</span>
                            <p>*100%natural *Seller’s other item *Contact seller</p>
                            </div>
                        </div>
                        <h6 className="text-2xl font-semibold">LKR  45000.00</h6>
                        <div className="flex flex-row items-center gap-12">
                            <div className="flex flex-row items-center">
                                <div className="text-black-600 text-sm">
                                    <span>5 Available / 2 sold</span>
                                </div>
                                <button 
                                    className="bg-gray-200 py-1 px-1 rounded-lg text-violet-800 text-lg" 
                                    onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
                                >
                                    -
                                </button>
                                <span className="py-1 px-1 rounded-lg">{amount}</span>
                                <button 
                                    className="bg-gray-200 py-1 px-1 rounded-lg text-violet-800 text-lg" 
                                    onClick={() => setAmount((prev) => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <div>
                            <button className="bg-violet-800 text-white font-semibold py-2 px-5 rounded-lg text-sm" style={{width:'150px', height:'35px',marginRight: '100px', marginBottom: '10px', marginLeft:'10px'}}>
                                Add to Cart
                            </button>
                            <button className="bg-blue-800 text-white font-semibold py-2 px-5 rounded-lg text-sm" style={{width:'150px', height:'35px',marginRight: '100px', marginBottom: '0px', marginLeft:'10px'}}>
                                Buy it now
                            </button>
                            <button className="bg-violet-800 text-white font-semibold py-2 px-5 rounded-lg text-sm" style={{width:'150px', height:'35px',marginRight: '100px', marginBottom: '0px',marginLeft:'10px', marginTop:'10px'}}>
                                Add to watchlist
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
