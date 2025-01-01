
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-8 text-center md:text-left">
                    {/* Selling Section */}
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

                    {/* Buying Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Buying</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">Start Buying</li>
                            <li className="mb-2 hover:font-bold">How to Buy</li>
                            <li className="mb-2 hover:font-bold">Get Offers</li>
                            <li className="mb-2 hover:font-bold">Request a new product</li>
                        </ul>
                    </div>

                    {/* About Us Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">About Us</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">Learn About Us</li>
                            <li className="mb-2 hover:font-bold">Mother Company</li>
                            <li className="mb-2 hover:font-bold">Terms & Conditions</li>
                            <li className="mb-2 hover:font-bold">Trading and Supply Policy</li>
                        </ul>
                    </div>

                    {/* Help and Support Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Help and Support</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">Order Tracking</li>
                            <li className="mb-2 hover:font-bold">Payment Methods</li>
                            <li className="mb-2 hover:font-bold">Return and Exchange Policies</li>
                            <li className="mb-2 hover:font-bold">Shipping and Delivery</li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Follow us</h2>
                        <ul className="text-center">
                            <li className="mb-2 hover:font-bold">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    Facebook
                                </a>
                            </li>
                            <li className="mb-2 hover:font-bold">
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                            <li className="mb-2 hover:font-bold">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                            <li className="mb-2 hover:font-bold">
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Copyright Section */}
                <div className="border-t border-gray-400 mt-8 pt-4 text-center">
                    <p>Copyright © all rights reserved Heart-Of-Ceylon</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
