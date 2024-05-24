import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Selling</h2>
                        <ul className="text-center">
                            <li className="mb-2">Start Selling</li>
                            <li className="mb-2">Learn to Sell</li>
                            <li className="mb-2">Ask Questions</li>
                            <li className="mb-2">bala bal</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Buying</h2>
                        <ul  className="text-center">
                            <li className="mb-2">Start Buying</li>
                            <li className="mb-2">How to Buy</li>
                            <li className="mb-2">Get Offers</li>
                            <li className="mb-2">Request a new product</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">About Us</h2>
                        <ul  className="text-center">
                            <li className="mb-2">Main Company</li>
                            <li className="mb-2">Learn to Sell</li>
                            <li className="mb-2">Policies</li>
                            <li className="mb-2">Terms And Conditions</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Help and Support</h2>
                        <ul  className="text-center">
                            <li className="mb-2">Start Selling</li>
                            <li className="mb-2">Learn to Sell</li>
                            <li className="mb-2">Ask Questions</li>
                            <li className="mb-2">bala bal</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-center">Follow us</h2>
                        <ul  className="text-center">
                            <li className="mb-2">Facebook</li>
                            <li className="mb-2">Youtube</li>
                            <li className="mb-2">Pinterest</li>
                            <li className="mb-2">Instagram</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-400 mt-8 pt-4 text-center">
                    <p>Copyright © whateverOurTeamName</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
