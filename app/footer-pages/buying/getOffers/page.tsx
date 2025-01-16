
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Gift, ClipboardCheck, BadgePercent, UserPlus, LogIn } from 'lucide-react';

interface OfferCardProps {
  icon: React.ComponentType<{ size: number, className?: string }>;
  title: string;
  description: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ icon: Icon, title, description }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow">
    <CardContent className="flex items-start p-6">
      <div className="mr-4">
        <Icon size={28} className="text-green-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const GetOffers: React.FC = () => {
  const offers = [
    {
      icon: Gift,
      title: "Welcome Offer",
      description: "Get 10% off on your first order. Use code WELCOME10 at checkout."
    },
    {
      icon: BadgePercent,
      title: "Holiday Discounts",
      description: "Save up to 30% during our holiday sales. Limited time only!"
    },
    {
      icon: ClipboardCheck,
      title: "Referral Bonus",
      description: "Refer a friend and earn $20 in credits when they make their first purchase."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    
      <Navbar />

      <MaxWidthWrapper>
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Title and description */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Exclusive Offers
            </h1>
            <p className="text-xl text-gray-600">
              Unlock amazing deals and discounts designed just for you
            </p>
          </div>

          {/* List of offers */}
          <div className="space-y-6">
            {offers.map((offer) => (
              <OfferCard key={offer.title} {...offer} />
            ))}
          </div>

          {/* Call-to-action buttons */}
          <div className="text-center mt-12">
            <p className="text-xl mb-6">Want to get more exclusive offers?</p>
            <div className="space-x-4">
              {/* Sign Up button */}
              <Link href="/buyer/signup">
                <div 
                  aria-label="Sign up for exclusive offers"
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Sign Up
                  <UserPlus className="ml-2" size={20} />
                </div>
              </Link>

              {/* Log In button */}
              <Link href="/buyer/login">
                <div 
                  aria-label="Log in to your account"
                  className="inline-flex items-center px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Log In
                  <LogIn className="ml-2" size={20} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GetOffers;
