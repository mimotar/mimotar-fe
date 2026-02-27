import Avata from "@/app/(dashboard)/commons/Avartar";
import { signOut, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  const fullName = [session?.user?.firstName, session?.user?.lastName]
    .filter(Boolean)
    .join(" ");

  const acronym = [session?.user?.firstName?.[0], session?.user?.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  return (
    <section
      className={`flex flex-col  bg-white shadow-lg border rounded-md space-y-2 ${className}`}
    >
      <div className=" flex items-center gap-2 p-2 w-full">
        <Avata
          imgUrl={""}
          nameAcronyms={acronym}
          className="sm:w-10 sm:h-10 h-6 w-6"
        />
        <h1 className="text-neutral-700 text-sm text-nowrap">{fullName}</h1>
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
        onClick={() =>
          signOut({
            callbackUrl: process.env.NEXT_PUBLIC_CLIENT_DOMAIN,
          })
        }
        type="button"
        className="text-primary outline-none cursor-pointer text-start py-2 px-4"
      >
        Sign out
      </button>
    </section>
  );
}
