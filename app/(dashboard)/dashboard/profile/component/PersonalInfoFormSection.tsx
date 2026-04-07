"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
// @ts-ignore: no type declarations for the package's CSS side-effect import
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import phoneInputStyle from "../css.module/phoneNumberStyle.module.css";

export default function PersonalInfoFormSection() {
  const { data: session } = useSession();

  const fullname =
    `${session?.user?.firstName ?? ""} ${session?.user?.lastName ?? ""}`.trim();

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
            value={fullname}
            readOnly
            placeholder="first name"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="email" className="text-neutral-600">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={session?.user.email}
            readOnly
            placeholder="mail"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col w-full">
          <label
            htmlFor="phone_number"
            className="text-neutral-600 inline-flex gap-2"
          >
            Phone number
          </label>
          <div className={phoneInputStyle.wrapperStyle}>
            <PhoneInput
              // readOnly
              international
              defaultCountry="NG"
              id="phone_number"
              placeholder="Enter phone number"
              value={""}
              onChange={(e) => ""}
              // className="custom-phone-input bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900"
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
            placeholder="address"
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
            placeholder="city"
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
            placeholder="country"
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
            placeholder="postal code"
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

      <button
        type="button"
        className="bg-brand-primary p-2 rounded-md text-white cursor-pointer"
      >
        Update
      </button>
    </section>
  );
}
