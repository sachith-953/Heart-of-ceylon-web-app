import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <MaxWidthWrapper>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Discover the <span className="text-blue-600">Heart of Ceylon</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Experience the artistry and craftsmanship that define Sri Lanka. 
              Every product we offer carries the essence of tradition and authenticity.
            </p>
          </div>

          <div className="space-y-20">
            <section className="bg-white shadow-lg rounded-3xl p-10 hover:scale-[1.02] transition-transform duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Heart of Ceylon began with a mission to connect the world to the beauty of Sri Lankan heritage. 
                Our curated selection showcases the finest handwoven textiles, artisanal goods, and unique crafts. 
                Each piece tells a story of tradition and dedication.
              </p>
            </section>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              {/* Dialog: Product Stories */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:scale-105 hover:bg-blue-700 transition-all text-white flex items-center px-6 py-3 rounded-full shadow-lg">
                    Explore Product Stories
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="backdrop-blur-lg bg-white/80 rounded-2xl p-8 sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold mb-6">Authentic Product Stories</DialogTitle>
                  </DialogHeader>
                  <p className="text-gray-700 mb-6">
                    Each product at Heart of Ceylon reflects the vibrant culture and craftsmanship of Sri Lanka. 
                    Our artisans pour their passion into every detail, ensuring authenticity and quality.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-lg shadow-inner hover:shadow-lg transition-shadow">
                      <h3 className="font-medium mb-2">Artisan Partnerships</h3>
                      <p className="text-sm text-gray-600">
                        We collaborate closely with artisans to preserve heritage and bring their skills to the forefront.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg shadow-inner hover:shadow-lg transition-shadow">
                      <h3 className="font-medium mb-2">Uncompromised Quality</h3>
                      <p className="text-sm text-gray-600">
                        Every item undergoes strict quality checks, guaranteeing excellence and authenticity.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Dialog: Our Story */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:scale-105 px-6 py-3 rounded-full transition-transform shadow-lg">
                    Our Mission
                  </Button>
                </DialogTrigger>
                <DialogContent className="backdrop-blur-lg bg-white/80 rounded-2xl p-8 sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold mb-6">Our Mission</DialogTitle>
                  </DialogHeader>
                  <p className="text-gray-700">
                    Our goal is to preserve the cultural legacy of Sri Lanka while empowering local artisans. 
                    Every purchase you make contributes directly to sustaining traditional crafts and communities.
                  </p>
                </DialogContent>
              </Dialog>
            </div>

            {/* Values Section */}
            <section className="bg-white shadow-lg rounded-3xl p-10 hover:scale-[1.02] transition-transform duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Values</h2>
              <p className="text-gray-600 leading-relaxed">
                Sustainability, ethical sourcing, and supporting small businesses are at the core of our values. 
                We believe in creating opportunities for local artisans while honoring our island{"'"}s rich heritage.
              </p>
            </section>
          </div>

          <div className="text-center mt-24">
            <p className="text-2xl mb-8 text-gray-800">Ready to experience authentic Sri Lankan craftsmanship?</p>
            <Link href="/shop">
              <div className="inline-flex items-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Discover Our Products
              </div>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default About;
