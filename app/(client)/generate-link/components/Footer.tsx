import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#0F172A] flex flex-col sm:justify-center mt-auto  sm:p-0 p-4">
      <div className="sm:w-[70%] w-full flex sm:justify-around text-white items-center">
        <div className="sm:flex hidden justify-center items-center ">
          <span className="inline-flex text-2xl mr-1">&copy;</span>
          {new Date().getFullYear()}, Mimotar
        </div>
        <div className="inline-flex sm:bg-inherit text-sm gap-10">
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </div>
      </div>

      <div className="sm:hidden flex mt-4 text-white">
        <span className="inline-flex text-2xl mr-1">&copy;</span>
        {new Date().getFullYear()}, Mimotar
      </div>
    </div>
  );
}
