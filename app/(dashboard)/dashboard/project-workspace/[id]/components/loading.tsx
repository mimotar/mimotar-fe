export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in font-sans pb-10">
      {/* Header skeleton */}
      <div className="h-16 bg-white rounded-2xl border border-gray-100 animate-pulse" />

      {/* Status stepper skeleton */}
      <div className="bg-white rounded-2xl p-5.5 shadow-xs border border-gray-100/30">
        <div className="h-3 w-40 bg-gray-100 rounded animate-pulse mb-6" />

        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
              <div className="h-2.5 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6.5 border border-gray-100/50 space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-72 bg-gray-100 rounded animate-pulse" />
            </div>

            <div className="h-32 bg-gray-50 rounded-2xl animate-pulse" />

            <div className="space-y-3">
              <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6.5 border border-gray-100/50 space-y-4">
            <div className="h-3 w-36 bg-gray-100 rounded animate-pulse" />
            <div className="h-5 w-64 bg-gray-100 rounded animate-pulse" />
            <div className="h-16 w-full bg-gray-50 rounded-2xl animate-pulse" />
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-gray-100 space-y-4">
            <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />

            <div className="h-14 bg-gray-50 rounded-xl animate-pulse" />
            <div className="h-14 bg-gray-50 rounded-xl animate-pulse" />
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 space-y-4">
            <div className="h-4 w-36 bg-gray-100 rounded animate-pulse" />
            <div className="h-20 bg-gray-50 rounded-xl animate-pulse" />
            <div className="h-20 bg-gray-50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
