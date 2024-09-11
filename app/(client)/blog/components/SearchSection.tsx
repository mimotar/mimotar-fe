import React from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchSection() {
  return (
    <div className="grid grid-cols-3 my-8">
      <div className="col-span-2 relative">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search anything"
          className="p-3 border rounded-lg w-full placeholder:pl-6  peer"
        />
        <IoIosSearch className="absolute top-3.5 left-1.5 text-2xl text-[#A21CAF] peer-focus:hidden" />
      </div>
    </div>
  );
}
