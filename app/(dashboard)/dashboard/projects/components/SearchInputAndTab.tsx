import { Loader2, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import type { ProjectStatus } from "../types/ITransaction";

interface ISearchInputAndTab {
  searchTerm: string;
  statusFilter: "all" | ProjectStatus;
  isFetching: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setStatusFilter: Dispatch<
    SetStateAction<
      | "all"
      | ProjectStatus
    >
  >;
}
export default function SearchInputAndTab({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isFetching,
}: ISearchInputAndTab) {
  return (
    <div
      aria-busy={isFetching}
      className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between"
    >
      {/* Search bar */}
      <div className="relative w-full md:w-80">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
          {isFetching ? (
            <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </span>
        <input
          type="text"
          placeholder="Search agreement title, desc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-100 text-xs text-gray-800 rounded-xl focus:outline-none focus:border-brand-primary font-semibold placeholder-gray-400"
        />
      </div>

      {/* Categories Tabs wrapper */}
      <div className="flex flex-wrap gap-2 w-full md:w-auto md:justify-end">
        {[
          { id: "all", label: "All Escrows" },
          { id: "ONGOING", label: "Active" },
          { id: "PENDING_CLOSURE", label: "Pending Closure" },
          { id: "DISPUTE", label: "Disputes" },
          { id: "EXPIRED", label: "Expired" },
          { id: "COMPLETED", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              statusFilter === tab.id
                ? "bg-magenta-50 text-brand-primary border-transparent"
                : "bg-white border border-gray-150 text-gray-405 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
