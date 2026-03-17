"use client";

import EditProfileInfoFormSection from "./EditProfileInfoFormSection";
import { useRouter } from "next/navigation";

export default function EditProfileContainer() {
  return (
    <section className="flex flex-col">
      <div className="border border-neutral-200 rounded-md py-3 px-3 mt-4 flex flex-col ">
        <h1 className="font-bold text-neutral-900">Edit information</h1>
        <EditProfileInfoFormSection />
      </div>
    </section>
  );
}
