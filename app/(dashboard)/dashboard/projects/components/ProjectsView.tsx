"use client";

import { Plus } from "lucide-react";
import SearchInputAndTab from "./SearchInputAndTab";
import ProjectLists from "./ProjectLists";
import BottomInfoCard from "./BottomInfoCard";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProjects } from "../hooks/useProjects";
import ErrorState from "./ErrorState";
import { ProjectsLoadingState } from "./ProjectsLoadingState";
import ProjectsPagination from "./ProjectsPagination";
import type { ProjectStatus } from "../types/ITransaction";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export function ProjectsView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const page = Math.max(Number(params.get("page")) || 1, 1);
  const limit = Math.max(Number(params.get("limit")) || 10, 1);
  const searchParam = params.get("q") ?? "";
  const statusParam = params.get("status") as ProjectStatus | null;
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  useEffect(() => setSearchTerm(searchParam), [searchParam]);

  useEffect(() => {
    if (debouncedSearchTerm === searchParam) return;
    updateParams({ q: debouncedSearchTerm || null, page: "1" });
  }, [debouncedSearchTerm, searchParam]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    );
    router.replace(`${pathname}?${next.toString()}`);
  };

  const projects = useProjects({
    page,
    limit,
    q: searchParam || undefined,
    status: statusParam ?? undefined,
  });

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
          onClick={() => router.push("start-project")}
          className="bg-brand-primary hover:bg-brand-primary/95 text-white rounded-2xl px-6 py-3.5 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-magenta-200/50 text-center shrink-0 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Initialize Escrow Agreement
        </button>
      </div>

      {/* Control row with dynamic search inputs and tabs */}
      <SearchInputAndTab
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setStatusFilter={(value) => {
          const nextStatus =
            typeof value === "function" ? value(statusParam ?? "all") : value;
          updateParams({
            status: nextStatus === "all" ? null : nextStatus,
            page: "1",
          });
        }}
        statusFilter={statusParam ?? "all"}
        isFetching={projects.isFetching}
      />

      {/* Grid listing */}
      <ProjectLists
        filteredProjects={projects.data?.items ?? []}
        isFetching={projects.isFetching}
        setSearchTerm={setSearchTerm}
        setStatusFilter={(value) => {
          const nextStatus =
            typeof value === "function" ? value(statusParam ?? "all") : value;
          updateParams({
            status: nextStatus === "all" ? null : nextStatus,
            page: "1",
          });
        }}
      />

      <ProjectsPagination
        page={projects.data?.pagination.page ?? page}
        limit={projects.data?.pagination.limit ?? limit}
        total={projects.data?.pagination.total ?? 0}
        totalPages={projects.data?.pagination.totalPages ?? 0}
        onPageChange={(nextPage) => updateParams({ page: String(nextPage) })}
        disabled={projects.isFetching}
      />

      {/* Bottom informational card */}
      <BottomInfoCard />
    </div>
  );
}
