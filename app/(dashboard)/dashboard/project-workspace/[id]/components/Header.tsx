import { ArrowLeft } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { ITransaction } from "../../../projects/types/ITransaction";

interface HeaderProps {
  session: Session["user"] | undefined;
  project: ITransaction;
}
export default function Header({ session, project }: HeaderProps) {
  const navigate = useRouter();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <button
        onClick={() => navigate.push("./dashboard/portal")}
        className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-primary transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Interactive Dashboard
      </button>

      <div className="text-right flex items-center gap-2.5 bg-brand-primary/5 px-3 py-1.5 rounded-xl border border-brand-primary/10">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
          Reviewing Perspective:
        </span>
        <span className="text-xs font-bold text-brand-primary capitalize">
          {/* {demoRole === "client" ? "Client Controls" : "Freelancer Controls"} */}
          {project.creator_email === session?.email
            ? project.creator_role
            : project.reciever_role}
        </span>
      </div>
    </div>
  );
}
