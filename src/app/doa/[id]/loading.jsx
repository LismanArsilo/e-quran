export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-linear-to-r from-amber-700 to-amber-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="h-8 w-64 mx-auto bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-4 w-96 mx-auto bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-xl p-5 space-y-4 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-300" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
