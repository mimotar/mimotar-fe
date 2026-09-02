"use client";

import { Plus } from "lucide-react";
import SearchInputAndTab from "./SearchInputAndTab";
import ProjectLists from "./ProjectLists";
import BottomInfoCard from "./BottomInfoCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "../hooks/useProjects";
import ErrorState from "./ErrorState";
import { ProjectsLoadingState } from "./ProjectsLoadingState";

export function ProjectsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    | "all"
    | "unfunded"
    | "funded"
    | "disputed"
    | "completed"
    | "pending_agreement"
  >("all");

  const navigate = useRouter();

  const projects = useProjects();
  console.log(projects.data);

  // Loading state
  if (projects.isPending) {
    return <ProjectsLoadingState />;
  }

  // Error state
  if (projects.isError) {
    return (
      <ErrorState
        query={projects}
        title="Unable to load projects"
        description="We couldn't load your escrow projects right now. Please try again."
      />
    );
  }

  // Filter projects by search and status tab
  //   const filteredProjects = projects.filter((project: any) => {
  //     const matchesSearch =
  //       project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       project.otherPartyName.toLowerCase().includes(searchTerm.toLowerCase());

  //     if (!matchesSearch) return false;

  //     if (statusFilter === "all") return true;
  //     if (statusFilter === "unfunded")
  //       return (
  //         project.escrowStatus === "unfunded" &&
  //         project.agreementStatus === "accepted"
  //       );
  //     if (statusFilter === "funded")
  //       return (
  //         project.escrowStatus === "funded" ||
  //         project.escrowStatus === "in_progress"
  //       );
  //     if (statusFilter === "disputed") return project.escrowStatus === "disputed";
  //     if (statusFilter === "completed")
  //       return project.escrowStatus === "completed" || project.isReleased;
  //     if (statusFilter === "pending_agreement")
  //       return (
  //         project.agreementStatus === "pending_invite" ||
  //         project.agreementStatus === "draft" ||
  //         project.agreementStatus === "rejected"
  //       );

  //     return true;
  //   });

  return (
    <div className="space-y-8 animate-fade-in font-sans pb-10">
      {/* Title block with CTA button aligned to design specifications */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 font-display tracking-tight">
            Escrow Contract Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse, manage, and inspect all digital agreements backed by Mimotar
            fintech protection.
          </p>
        </div>

        <button
          onClick={() => navigate.push("start-project")}
          className="bg-brand-primary hover:bg-brand-primary/95 text-white rounded-2xl px-6 py-3.5 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-magenta-200/50 text-center shrink-0 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Initialize Escrow Agreement
        </button>
      </div>

      {/* Control row with dynamic search inputs and tabs */}
      <SearchInputAndTab
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
      />

      {/* Grid listing */}
      <ProjectLists
        filteredProjects={projects.data?.items ?? []}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
      />

      {/* pagination */}
      <p>Coming ..</p>

      {/* Bottom informational card */}
      <BottomInfoCard />
    </div>
  );
}
