"use client";

import EditPasswordFormSection from "./EditPasswordFormSection";

export default function EditPasswordContainer() {
  return (
    <section className="flex flex-col">
      <div className="border border-neutral-200 rounded-md py-3 px-3 mt-4 flex flex-col ">
        <h1 className="font-bold text-neutral-900">Edit Password</h1>
        <EditPasswordFormSection />
      </div>
    </section>
  );
}
