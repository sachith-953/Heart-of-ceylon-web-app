'use client'

import React from 'react';
import { CheckCircle, Clock, Store, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AddNewProductSuccessMessage() {

    const router = useRouter()

    // const navigateTo = (path) => {
    //     window.location.href = path;
    // };

    return (

        <>
            <Navbar />

            <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 pt-4">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                    {/* Success Icon and Header */}
                    <div className="text-center mb-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Product Successfully Listed!
                        </h1>
                        <p className="text-gray-600">
                            Thank you for listing your product with Heart of Ceylon
                        </p>
                    </div>

                    {/* Status Timeline */}
                    <div className="border-l-2 border-green-500 pl-4 mb-8 ml-4">
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                <h3 className="font-semibold text-gray-900">Product Submitted</h3>
                            </div>
                            <p className="text-gray-600 text-sm ml-7">
                                Your product has been successfully submitted to our system
                            </p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                                <h3 className="font-semibold text-gray-900">Under Review</h3>
                            </div>
                            <p className="text-gray-600 text-sm ml-7">
                                Our team will review your product within 24 hours to ensure it meets our quality standards
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center mb-2">
                                <Store className="w-5 h-5 text-gray-400 mr-2" />
                                <h3 className="font-semibold text-gray-900">Ready for Sale</h3>
                            </div>
                            <p className="text-gray-600 text-sm ml-7">
                                Once approved, your product will be visible to customers
                            </p>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-8">
                        <div className="flex items-start">
                            <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-1">What happens next?</h4>
                                <ul className="text-blue-800 text-sm space-y-1">
                                    <li>• Our team will review your product details and images</li>
                                    <li>• You{"'"}ll receive an email notification once approved</li>
                                    <li>• You can check your product status in the seller dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => router.push("/seller-dashboard")}
                            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                        <button
                            onClick={() => router.push("/seller-dashboard/add-new-product")}
                            className="bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            List Another Product
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}