import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';
import AllSellerDetailsPopupButton from '../../POPUPwindows/AllSellerDetailsPopupButton/AllSellerDetailsPopupButton';
import { Button } from '@/components/ui/button';

interface dataDataType {
    profilePicture: string;
    storeName: string;
    sellerID: number;
    categories: string;
    sellerStatus: string;
    badges: string;
    ratings: number;
}

interface SellerCardProps {
    seller: dataDataType;
}

const SellerDetailsCard: React.FC<SellerCardProps> = ({ seller }) => {
    return (
        <div className='bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-shadow flex flex-col
         sm:flex-row gap-2 sm:gap-6 w-full mx-auto max-w-screen-lg'>

            {/* Profile Image Container */}
            <div className='w-1/6'>
                <div className='relative w-24 h-24 sm:w-32 sm:h-32 m-2'>
                    {seller.profilePicture ? (
                        <Image
                            src={seller.profilePicture}
                            alt='seller profile image'
                            className='object-cover'
                            fill
                        />
                    ) : (
                        <Image
                            src='my_prof_img.svg'
                            alt='Default profile image'
                            width={128}
                            height={128}
                            className='object-cover bg-gray-100'
                        />
                    )}
                </div>
            </div>

            {/* Seller Information Container */}
            <div className='w-3/6 space-y-3 text-center sm:text-left'>
                {/* Store Name */}
                <h1 className='text-xl sm:text-2xl font-bold text-gray-800 truncate'>
                    {seller.storeName}
                </h1>

                {/* Seller Details */}
                <div className='space-y-2 text-sm sm:text-base'>
                    {/* Seller ID */}
                    <p className='flex items-center justify-center sm:justify-start gap-2 text-gray-600'>
                        <span className='font-semibold'>Seller ID:</span>
                        <span>{seller.sellerID}</span>
                    </p>

                    {/* Categories */}
                    <p className='flex items-center justify-center sm:justify-start gap-2 text-gray-600'>
                        <span className='font-semibold'>Categories:</span>
                        <span className='truncate'>{seller.categories}</span>
                    </p>

                    {/* Status */}
                    <div className='flex items-center justify-center sm:justify-start gap-2'>
                        <span className='font-semibold text-gray-600'>Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${seller.sellerStatus.toLowerCase() === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-red-700'
                            }`}>
                            {seller.sellerStatus}
                        </span>

                        {/* Ratings and Badges Section */}
                        <div className="flex flex-col md:flex-row mt-0 md:mt-1 ">

                            <div className="flex flex-row bg-white pr-1 justify-center sm:justify-normal">

                                <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm">Ratings :</p>
                                <div className="flex flex-row">
                                    {Array.from({ length: seller.ratings }, (_, index) => (
                                        <Star key={index} fill="#FFD254" strokeWidth={0} />
                                    ))}
                                    {Array.from({ length: 5 - seller.ratings }, (_, index) => (
                                        <Star key={5 * seller.ratings + index} fill="#111" strokeWidth={0} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* buttons */}
            <div className='w-2/6 flex flex-row'>
                
                {/* left column of buttons */}
                <div className='flex flex-col justify-evenly w-1/2 '>
                    
                    {/* view shop btn */}
                    <div className='w-full flex text-center'>
                        <Link
                            className="w-full px-4 py-2 mx-3 my-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
                            href={{
                                pathname: '/seller-store',
                                query: { sellerId: `${seller.sellerID}` },
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Store
                        </Link>
                    </div>

                    {/* assign badge : not active currently */}
                    <div className='w-full flex justify-center'>
                        <Button
                        disabled={true}
                        className='w-full mx-3 bg-blue-600 hover:bg-blue-800 text-white'
                        >
                            Assign Badges
                        </Button>
                    </div>
                </div>

                {/* right column of buttons */}
                <div className='flex flex-col justify-evenly w-1/2 mr-2'>
                    
                    {/* view all data */}
                    <div className='w-full my-2 flex text-center'>
                            <AllSellerDetailsPopupButton sellerID={seller.sellerID} />
                    </div>

                    {/* suspend / un-suspend seller */}
                    <div className='w-full flex justify-center'>
                        <Button
                        className='w-full mx-3 bg-red-500 hover:bg-red-800 text-white'
                        >
                            Suspend
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SellerDetailsCard;
