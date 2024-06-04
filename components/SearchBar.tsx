"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Update the URL with the search query as a search parameter
    router.push(`search-products?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col gap-10 items-center p-6">
          <div className="flex justify-center w-2/3">
            <input
              className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none"
              placeholder="What are you looking for? "
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            <button className="bg-gray-200 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover hover:text-white"
              onClick={handleSearch}>Search</button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

