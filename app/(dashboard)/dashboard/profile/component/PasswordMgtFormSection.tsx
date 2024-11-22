"use client";

import { useState } from "react";
import { LuEye } from "react-icons/lu";
export default function PasswordMgtFormSection() {
  const [isVsible, setVisible] = useState(false);
  return (
    <section className="flex flex-col mt-3 space-y-4">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex flex-col  relative">
          <label htmlFor="password" className="text-neutral-600">
            Password
          </label>
          <input
            type={isVsible ? "text" : "password"}
            id="password"
            readOnly
            placeholder="**********"
            className="bg-neutral-200 p-3 outline-none rounded-md placeholder:text-neutral-900 text-sm"
          />
          <LuEye
            className="absolute right-2 bottom-3.5 cursor-pointer"
            onClick={() => setVisible(!isVsible)}
          />
        </div>
      </div>
    </section>
  );
}
