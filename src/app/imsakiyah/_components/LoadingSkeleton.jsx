// app/imsakiyah/components/LoadingSkeleton.jsx
export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Location Skeleton */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-emerald-200 rounded-full" />
          <div className="h-6 w-48 bg-slate-200 rounded" />
        </div>
        <div className="h-4 w-64 bg-slate-200 rounded" />
      </div>

      {/* Schedule Cards Skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-emerald-50 px-6 py-3">
            <div className="flex justify-between">
              <div className="h-5 w-24 bg-emerald-200 rounded" />
              <div className="h-5 w-40 bg-emerald-200 rounded" />
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                <div key={j} className="p-3 bg-slate-50 rounded-xl">
                  <div className="h-4 w-16 bg-slate-200 rounded mb-2" />
                  <div className="h-6 w-12 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
