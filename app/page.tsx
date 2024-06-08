
// import CustomerService from "@/components/CustomerService";
// import Footer from "@/components/Footer";
// import ImageSlider from "@/components/TopSellingProducts";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import PopularCategories from "@/components/Popular-categories";
// import SearchBar from "@/components/SearchBar";
// import { Button, buttonVariants } from "@/components/ui/button";
// import Link from "next/link";
// import TopSellingProducts from "@/components/TopSellingProducts";
// import Navbar from "@/components/Navbar";

// export default function Home() {

//   return (
//     <>
//       <div className="bg-white">
//       <Navbar />
//         <MaxWidthWrapper>
//           <div className="py-10 mx-auto text-center flex flex-col items-center">

//             {/* search bar */}
//             <SearchBar />

//             {/*  {' '} part is used to preserve the white space */}
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your Marketplace for high-quality{' '}
//               <br /><span className="text-blue-600">Sri Lankan Products</span>.
//             </h1>
//             <p className="mt-6 text-lg max-w-prose text-muted-foreground">Welcome to Heart Of Ceylon. Every product on our platform is verfied by our team to ensure our highest quality standers
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">

//               {/* this is set shadcn ui library button default  */}
//               <Link href="/products" className={buttonVariants()}>Browse Trending</Link>

//               {/* &rarr; <= this is a inbuild right arrow */}
//               {/* we can choose button types from the ui library */}
//               <Button variant="ghost">Our quality promise &rarr;</Button>
//             </div>
//           </div>

//           <PopularCategories />

//           {/* TODO : List products */}
//         </MaxWidthWrapper>

//         <TopSellingProducts />

//         <hr />

//         <CustomerService />

//         <Footer />
//       </div>

//     </>
//   );

// }

import ProductProfile from "@/components/ui/productprofile";

export default function ProductProfilePage() {
  return (
    <ProductProfile />
  );
}

