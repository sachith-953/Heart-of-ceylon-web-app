"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";

function onSearch() {}

export default function SearchBar() {
  return (
    
    <MaxWidthWrapper>
        <div className="flex flex-col gap-10 items-center p-6">
          <form className="flex justify-center w-2/3" onSubmit={onSearch}>
            <input
              className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-full focus:outline-none"
              placeholder="What are you looking for? "
            ></input>
          </form>
        </div>
    </MaxWidthWrapper>
  );
}
