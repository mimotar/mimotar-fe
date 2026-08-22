export function ProjectCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 space-y-5">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 bg-gray-100 rounded-full animate-pulse" />

        <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />

        <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />

        <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Details */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between">
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
        </div>

        <div className="flex justify-between">
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
        </div>

        <div className="flex justify-between">
          <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse" />
    </div>
  );
}
