import React from "react";
import PersonalInfoFormSection from "./component/PersonalInfoFormSection";
import { MdEdit } from "react-icons/md";
import PasswordMgtFormSection from "./component/PasswordMgtFormSection";
import Link from "next/link";

export default function page() {
  return (
    <section className="flex flex-col bg-white h-full w-full p-5 overflow-y-auto">
      <h1 className="font-bold text-2xl">Profile</h1>

      <div className="border rounded-md py-6 px-3 mt-4 flex flex-col ">
        <div className="inline-flex gap-4 items-center">
          <h1 className="font-bold text-neutral-900">Personal information</h1>
          <Link
            href={"profile/edit"}
            className="inline-flex  gap-1 items-center text-primary font-semibold"
          >
            Edit info <MdEdit />
          </Link>
        </div>
        <PersonalInfoFormSection />
      </div>

      <div className="border rounded-md py-6 px-3 mt-4 flex flex-col ">
        <div className="inline-flex gap-4 items-center">
          <h1 className="font-bold text-neutral-900">Password management</h1>
          <button className="inline-flex  gap-1 items-center text-primary font-semibold">
            Edit password <MdEdit />
          </button>
        </div>
        <PasswordMgtFormSection />
      </div>
    </section>
  );
}
