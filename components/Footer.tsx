
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Selling</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">
                                <Link href="/app/footer-pages/startSelling/page.tsx">Start Selling</Link>
                            </li>
                            <li className="mb-2 hover:font-bold">
                                <Link href="/app/footer-pages/learnToSell/page.tsx">Learn to Sell</Link>
                            </li>
                            <li className="mb-2 hover:font-bold">
                                <Link href="/app/footer-pages/askQuestions/page.tsx">Ask Questions</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Buying</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">Start Buying</li>
                            <li className="mb-2 hover:font-bold">How to Buy</li>
                            <li className="mb-2 hover:font-bold">Get Offers</li>
                            <li className="mb-2 hover:font-bold">Request a new product</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">About Us</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">Main Company</li>
                            <li className="mb-2 hover:font-bold">Learn to Sell</li>
                            <li className="mb-2 hover:font-bold">Policies</li>
                            <li className="mb-2 hover:font-bold">Terms And Conditions</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Help and Support</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">Start Selling</li>
                            <li className="mb-2 hover:font-bold">Learn to Sell</li>
                            <li className="mb-2 hover:font-bold">Ask Questions</li>
                            <li className="mb-2 hover:font-bold">bala bal</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Follow us</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">Facebook</li>
                            <li className="mb-2 hover:font-bold">Youtube</li>
                            <li className="mb-2 hover:font-bold">Pinterest</li>
                            <li className="mb-2 hover:font-bold">Instagram</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-400 mt-8 pt-4 text-center">
                    <p>Copyright © all rights reserved Heart-Of-Ceylon</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
