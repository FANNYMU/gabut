import React from "react";

const Search2 = () => {
  return (
    <div className="bg-[#202C33] mt-3 mx-4 py-1 px-5 rounded-md flex gap-x-4 items-center">
      <img src="../../images/community.png" className="h-7 w-7" />
      <input
        type="text"
        className="bg-transparent border-0 outline-none caret-white text-white w-full"
        placeholder="Cari"
      />
    </div>
  );
};

export default Search2;