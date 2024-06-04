"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  // Fetch search results or perform other actions based on the searchQuery

  return (
    <div>
      <h1>Search Results for : {searchQuery}</h1>
      {/* Render search results */}
    </div>
  );
}
