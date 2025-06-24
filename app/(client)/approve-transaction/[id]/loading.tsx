import Loader from "@/components/Loader";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-56">
      <div className="w-10 h-10 text-[#A21CAF] ">
        <Loader />
      </div>
    </div>
  );
}
