import Avata from "@/app/(dashboard)/commons/Avartar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileDropDownProps {
  className?: string;
  closeDropdown: () => void;
}

export default function ProfileDropDown({
  className,
  closeDropdown,
}: ProfileDropDownProps) {
  const navigate = useRouter();
  return (
    <section
      className={`flex flex-col w-full bg-white shadow-lg border rounded-md space-y-2 ${className}`}
    >
      <div className=" flex items-center gap-2 p-2 w-full">
        <Avata className="sm:w-10 sm:h-10 h-6 w-6" />
        <h1 className="text-neutral-700 text-sm">Olawale Ade</h1>
      </div>
      <hr />

      <button
        onClick={() => {
          closeDropdown();
          navigate.push("/dashboard/profile");
        }}
        type="button"
        className="text-primary outline-none text-start py-2 px-4"
      >
        My profile
      </button>
      <hr />

      <button
        type="button"
        className="text-primary outline-none text-start py-2 px-4"
      >
        Sign out
      </button>
    </section>
  );
}
