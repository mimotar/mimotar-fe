import { ProjectCardSkeleton } from "./projectLoadingSkeleton";

export function ProjectsLoadingState() {
  return (
    <div className="space-y-8 animate-fade-in font-sans pb-10">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-64 bg-gray-100 rounded-lg animate-pulse" />

          <div className="h-3 w-96 max-w-full bg-gray-100 rounded animate-pulse" />
        </div>

        <div className="h-12 w-full sm:w-56 bg-gray-100 rounded-2xl animate-pulse" />
      </div>

      {/* Search / filter skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-11 flex-1 bg-gray-100 rounded-xl animate-pulse" />

        <div className="h-11 w-full sm:w-80 bg-gray-100 rounded-xl animate-pulse" />
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center">
        <div className="h-8 w-40 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Bottom card skeleton */}
      <div className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
    </div>
  );
}
