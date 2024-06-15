"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";


export default function SearchBar() {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounced, setDebounced] = useState("") // use to delay sending req until user stop typing

  // API Calling function
  const fetchSuggestions = async (query: string) => {
    try {
      console.log("sending keyword to Next.js GetKeyword API");

      const res = await fetch(
        "http://localhost:3000/api/product/getKeywords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      if (res.ok) {
        const responseData = await res.json();

        console.log(responseData);

        console.log("responseData.productList");

        setSuggestions(responseData);

      } else {
        const responseData = await res.json();
        console.log("********failed********")
      }

    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = () => {
    // Update the URL with the search query as a search parameter
    router.push(`search-products?query=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col gap-10 items-center p-6">
          {/* <div className="flex justify-center w-2/3">
            <input
              className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none"
              placeholder="What are you looking for? "
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            ></input>
            <button className="bg-gray-200 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover hover:text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div> */}

          {/* to remove */}
          <div className="w-2/3 items-start flex flex-row">
            <div className="relative flex flex-col
             w-full">
              <div className="flex flex-row w-full">
                <input type="text" className="z-40 px-5 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none focus:bg-gray-200"
                  placeholder="What are you looking for? "
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
                <button className="z-40 bg-gray-200 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover hover:text-white"
                  onClick={handleSearch}
                >
                  Search
                </button>
              
              {/* Suggestion Section */}
              </div>
              {suggestions.length > 0 && (
                <div className="absolute inset-x-0 top-5 pt-8 pb-3 text-left bg-gray-100 w-full rounded-b-3xl max-h-96 overflow-auto overscroll-contain">

                  {suggestions.map((suggestion, index) => (
                    <p 
                    key={index}
                    className="pl-5 hover:bg-gray-300 hover:font-bold"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      handleSearch();
                    }}
                  >
                    {suggestion}
                  </p>
                  ))}
                  

                </div>
              )}



            </div>
          </div>
        </div>

      </MaxWidthWrapper>
    </>
  );
}

