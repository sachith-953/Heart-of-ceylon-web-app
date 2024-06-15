"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";


export default function SearchBar() {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

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

    console.log(searchQuery)

    // wait for 0.5 second after the last keystroke before making the API call.
    // If the user types again within that 0.5 second, the previous timeout is cleared and a new one is set.
    const timeout = setTimeout(() => {
      // setDebounced(searchQuery)
      console.log("debounced: " + searchQuery)
      if (searchQuery.trim() !== "") {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 500)

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timeout)
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
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button className="z-40 bg-gray-200 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover hover:text-white"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              {/* Suggestion Section */}
              {suggestions.length > 0 && isFocused && (
                <div className="absolute inset-x-0 top-5 pt-8 pb-3 text-left bg-gray-100 w-full rounded-b-3xl max-h-96 overflow-auto overscroll-contain">

                  {suggestions.map((suggestion, index) => (
                    <p
                      key={index}
                      className="pl-5 hover:bg-gray-300 hover:font-bold cursor-pointer"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        handleSearch();
                        setIsFocused(false);  // Hide suggestions after selection
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

