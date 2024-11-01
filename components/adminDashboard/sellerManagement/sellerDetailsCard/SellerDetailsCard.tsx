import React from 'react';
import Image from 'next/image';

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
        <div className='bg-slate-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 flex flex-col
         sm:flex-row gap-4 sm:gap-6 w-full mx-auto max-w-screen-lg m-0.5'>
            {/* Profile Image Container */}
            <div className='flex-shrink-0'>
                <div className='relative rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32 mx-auto sm:mx-0'>
                    {seller.profilePicture ? (
                        <Image
                            src={seller.profilePicture}
                            alt='seller profile image'
                            width={128}
                            height={128}
                            className='object-cover'
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
            <div className='flex-grow space-y-3 text-center sm:text-left'>
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            seller.sellerStatus.toLowerCase() === 'active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-red-700'
                        }`}>
                            {seller.sellerStatus}
                        </span>
                    </div>
                </div>

                {/* Ratings and Badges Section */}
                {/* {(seller.ratings || seller.badges) && (
                    <div className='flex items-center justify-center sm:justify-start gap-4 pt-2'>
                        {seller.ratings && (
                            <div className='flex items-center gap-1'>
                                <span className='text-yellow-400'>★</span>
                                <span className='font-medium'>{seller.ratings}</span>
                            </div>
                        )}
                        {seller.badges && (
                            <span className='text-blue-600 font-medium'>
                                {seller.badges}
                            </span>
                        )}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default SellerDetailsCard;
