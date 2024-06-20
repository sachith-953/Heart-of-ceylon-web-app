"use client";

import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

/**
 * this component set search keywords to the search-product page using URL parameters. 
 * this component change the url parameters. page catch the url params. 
 * 
 * DIFFERENCE WITH SearchBar.tsx is this Component has slightly different bg colors
 * 
 */

const SearchBarForSearchProduct = () => {

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1); // for let user to select suggestions using arrow keys
    const [isSearching, setIsSearching] = useState(false)

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
        // setIsSearching(true)
        // Update the URL with the search query as a search parameter
        router.push(`search-products?query=${encodeURIComponent(searchQuery)}`);
    };

    // use the useCallback hook to memoize the function and ensure it has the latest state, 
    // and use the useEffect hook to perform the navigation after the state has been updated.
    const handleSearchBySuggestions = useCallback((suggestion: string) => {
        console.log("handleSearchBySuggestions " + suggestion);
        setSearchQuery(suggestion);
        setIsSearching(true);
    }, []);

    // handle keyboard navigation: for select suggestion using arrow keys
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prevIndex =>
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSearchBySuggestions(suggestions[selectedIndex]);
                    setIsFocused(false);
                } else {
                    handleSearch();
                }
                break;
            case 'Escape':
                setIsFocused(false);
                break;
        }
    };

    useEffect(() => {

        // Reset the selected index when the search query changes
        setSelectedIndex(-1);

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

    useEffect(() => {
        if (isSearching) {
            router.push(`search-products?query=${encodeURIComponent(searchQuery)}`);
        }
    }, [isSearching, searchQuery, router]);


    return (
        <>
            <MaxWidthWrapper>
                <div className="flex flex-col gap-10 items-center p-6">
                    <div className="items-start flex flex-row w-full sm:w-2/3 max-w-96 sm:max-w-screen-md">
                        <div className="relative flex flex-col
             w-full">
                            <div className="flex flex-row w-full">
                                <input type="text" className="z-40 px-5 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none focus:bg-gray-300"
                                    placeholder="What are you looking for ?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                />
                                <button className="z-40 bg-gray-300 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover hover:text-white"
                                    onClick={handleSearch}
                                >
                                    <p>Search</p>
                                </button>
                            </div>

                            {/* Suggestion Section */}
                            {suggestions.length > 0 && isFocused && (
                                <div className="absolute inset-x-0 top-5 pt-8 pb-3 text-left bg-slate-200 w-full rounded-b-3xl max-h-96 overflow-auto overscroll-contain">
                                    {suggestions.map((suggestion, index) => (
                                        <p
                                            key={index}
                                            className={`pl-5 hover:bg-gray-300 hover:font-bold cursor-pointer ${index === selectedIndex ? 'bg-gray-300 font-bold' : ''
                                                }`}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            onClick={() => {
                                                setSearchQuery(suggestion);
                                                console.log(suggestion)
                                                handleSearchBySuggestions(suggestion) //on click on a suggestion search starts
                                                setIsFocused(false);
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

export default SearchBarForSearchProduct;

