import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Store,
  Star,
} from "lucide-react";

interface SellerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerID: number;
}

interface SellerDetails {
  sellerID: number;
  storeName: string;
  sellerStatus: string;
  ratings: number;
  noOfRatings: number;
  badges: string;
  accountCreatedDate: string;
  accountCreatedTime: string;
  categories: string;
  storeDescription: string;
  totalSales: number;
  phoneNo: string;
  sellerAddress: string;
  sellerEmail: string;
  profilePicture: string | null;
}

const SellerDetailsModal: React.FC<SellerDetailsModalProps> = ({
  isOpen,
  onClose,
  sellerID,
}) => {
  const [seller, setSeller] = React.useState<SellerDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSellerDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/admin-dashboard/POP-view-seller-details-by-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sellerID }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch seller details');
      }

      const data = await response.json();
      setSeller(data);
    } catch (err) {
      setError('Failed to load seller details');
      console.error('Error fetching seller details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && sellerID) {
      fetchSellerDetails();
    }
  }, [isOpen, sellerID]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[85vw] max-w-[85vw] h-[85vh] max-h-[85vh] p-0">
      <DialogHeader className="bg-gray-300 p-4">
        <DialogTitle className="text-xl font-bold text-black text-center">Seller All Details</DialogTitle>
      </DialogHeader>
                
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : seller ? (
          <div className="flex h-full bg-gray-200">
            {/* Left Sidebar - 1/4 width */}
            <div className="w-1/4 p-6 border-r border-gray-200 flex flex-col">
              {/* Profile Picture */}
              <div className="flex justify-center">
                {seller.profilePicture ? (
                  <img 
                    src={seller.profilePicture} 
                    alt="Store Profile" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <Store className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Ratings */}
              <div className="flex flex-col mt-4">
                <div className="flex flex-row bg-white pr-1 justify-center">
                  <p className="mr-1 text-sm">Ratings :</p>
                  <div className="flex flex-row">
                    {Array.from({ length: seller.ratings }, (_, index) => (
                      <Star key={index} fill="#FFD254" strokeWidth={0} className="w-4 h-4" />
                    ))}
                    {Array.from({ length: 5 - seller.ratings }, (_, index) => (
                      <Star key={5 * seller.ratings + index} fill="#111" strokeWidth={0} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                <div className="text-center mt-1">
                  <p className="underline text-xs">{seller.noOfRatings} product ratings</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex justify-center">
                <Badge className="bg-green-100 text-green-800 px-4 py-1">
                    <p>status:</p><br/>
                  {seller.sellerStatus}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Shop
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Assign badges
                </button>
              </div>

              {/* Bottom Buttons */}
              <div className="mt-auto flex flex-col gap-3">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Suspend
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Remove account
                </button>
              </div>
            </div>

            {/* Right Content - 3/4 width */}
            <div className="w-3/4 p-6">
              {/* Store Name and ID */}
              <h2 className="text-2xl font-bold">{seller.storeName}</h2>
              <p className="text-sm text-gray-600 mt-1 mr-5">Seller ID: {seller.sellerID}</p>

              {/* Categories and Sales */}
              <div className="flex justify-between mt-4">
                <p className="text-gray-700">Product Categories: {seller.categories} Sales: {seller.totalSales}</p>
                {/* <p className="text-gray-700">Sales: {seller.totalSales}</p> */}
              </div>

              {/* Store Description */}
              <div className="mt-4">
                <p>Store description :</p>
                <p className="text-gray-700">{seller.storeDescription}</p>
              </div>

              {/* Account Details */}
              <div className="mt-6 space-y-3">
                <p>Account Created Date & Time : {seller.accountCreatedDate}</p>
                
                <div className="flex items-center">
                    <p>Moble numbers:</p>
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{seller.phoneNo}</span>
                </div>

                <div className="flex items-center">
                    <p>email:</p>
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{seller.sellerEmail}</span>
                </div>

                <div className="flex items-center">
                    <p>Address:</p>
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{seller.sellerAddress}</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold">Documents :</h3>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default SellerDetailsModal;