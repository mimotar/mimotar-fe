"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function PersonalInfoFormSection() {
  const [countryCode, setCountryCode] = useState<{
    code?: string;
    flag: string;
  }>({ flag: "https://flagcdn.com/16x12/ng.png" });

  const [isFlagDropdown, setIsFlagDropdown] = useState(false);
  return (
    <section className="flex flex-col mt-3 space-y-4">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col ">
          <label htmlFor="first_name" className="text-neutral-600">
            Full name
          </label>
          <input
            type="text"
            id="first_name"
            readOnly
            placeholder="Olawale Ade"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
          <small className="text-red-400"></small>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="email" className="text-neutral-600">
            Email address
          </label>
          <input
            type="email"
            id="email"
            readOnly
            placeholder="olawaleade@gmail.com"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
          <small className="text-red-400"></small>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="phone_number"
            className="text-neutral-600 inline-flex gap-2"
          >
            Phone number
          </label>
          <div className="inline-flex">
            <div className="relative flex  justify-between items-center gap-2 border rounded-l-lg w-20 px-2">
              <Image
                src={countryCode.flag}
                width="35"
                height="35"
                sizes="100vw"
                alt="Ukraine"
              />

              <RiArrowDropDownLine className={`text-3xl cursor-pointer `} />
            </div>
            <input
              type="tel"
              id="phone_number"
              readOnly
              className="p-3 bg-neutral-200 outline-none border w-full rounded-r-lg"
              placeholder="+234"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="address" className="text-neutral-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            readOnly
            placeholder="13 Washington Square South"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
          <small className="text-red-400"></small>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col ">
          <label htmlFor="city" className="text-neutral-600">
            City
          </label>
          <input
            type="text"
            id="city"
            readOnly
            placeholder="Abeokuta"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
          <small className="text-red-400"></small>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="country" className="text-neutral-600">
            Country
          </label>
          <input
            type="text"
            id="country"
            readOnly
            placeholder="Nigeria"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
          <small className="text-red-400"></small>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col ">
          <label htmlFor="postal_code" className="text-neutral-600">
            Postal code
          </label>
          <input
            type="text"
            id="postal_code"
            readOnly
            placeholder="110222"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
          <small className="text-red-400"></small>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="id_number" className="text-neutral-600">
            ID number
          </label>
          <input
            type="text"
            id="id_number"
            readOnly
            placeholder="64484****"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
          <small className="text-red-400"></small>
        </div>
      </div>
    </section>
  );
}
