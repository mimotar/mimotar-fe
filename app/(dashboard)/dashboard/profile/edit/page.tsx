import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import EditProfileInfoFormSection from "./component/EditProfileInfoFormSection";

export default function page() {
  return (
    <section className="flex flex-col bg-white h-full w-full p-5 overflow-y-auto">
      <div className="border rounded-md py-3 px-3 mt-4 flex flex-col ">
        <h1 className="font-bold text-neutral-900">Edit information</h1>
        <EditProfileInfoFormSection />
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <PrimaryButton className="text-white  w-32 h-14">Saves</PrimaryButton>
        <PrimaryOutline className="text-primary w-32 h-14 ">
          Cancel
        </PrimaryOutline>
      </div>
    </section>
  );
}
