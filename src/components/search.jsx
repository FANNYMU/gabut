import React from "react";
import '../styles/search.css';

const Search = () => (
  <div>
    <div className="relative sear">
      <span className="absolute inset-y-0 left-0 grid w-10 place-content-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4 text-search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>

      <input
        type="text"
        id="Search"
        placeholder="Search"
        disabled
        className="cursor-not-allowed search-input rounded-md py-2.5 pl-10 pr-4 shadow-sm sm:text-sm"
      />
    </div>
  </div>
);

export default Search;
