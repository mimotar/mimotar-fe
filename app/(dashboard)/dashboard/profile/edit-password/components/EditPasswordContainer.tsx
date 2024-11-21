"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import EditPasswordFormSection from "./EditPasswordFormSection";
import { useRef } from "react";

export default function EditPasswordContainer() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <section className="flex flex-col">
      <div className="border rounded-md py-3 px-3 mt-4 flex flex-col ">
        <h1 className="font-bold text-neutral-900">Edit Password</h1>
        <EditPasswordFormSection ref={formRef} />
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <PrimaryButton onClick={handleSave} className="text-white  w-32 h-14">
          Saves
        </PrimaryButton>
        <PrimaryOutline className="text-primary w-32 h-14 ">
          Cancel
        </PrimaryOutline>
      </div>
    </section>
  );
}
