import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
      className="border border-gray-300 px-4 py-2 rounded-full w-full max-w-md m-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  );
};

export default SearchBar;
