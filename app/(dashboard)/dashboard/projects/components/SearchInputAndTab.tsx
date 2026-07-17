import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface ISearchInputAndTab {
  searchTerm: string;
  statusFilter:
    | "all"
    | "unfunded"
    | "funded"
    | "disputed"
    | "completed"
    | "pending_agreement";
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setStatusFilter: Dispatch<
    SetStateAction<
      | "all"
      | "unfunded"
      | "funded"
      | "disputed"
      | "completed"
      | "pending_agreement"
    >
  >;
}
export default function SearchInputAndTab({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: ISearchInputAndTab) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search bar */}
      <div className="relative w-full md:w-80">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search agreement title, names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-100 text-xs text-gray-800 rounded-xl focus:outline-none focus:border-brand-primary font-semibold placeholder-gray-400"
        />
      </div>

      {/* Categories Tabs wrapper */}
      <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
        {[
          { id: "all", label: "All Escrows" },
          { id: "funded", label: "Secured/Active" },
          { id: "pending_agreement", label: "Agreements" },
          { id: "disputed", label: "Disputes" },
          { id: "completed", label: "Completed" },
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
