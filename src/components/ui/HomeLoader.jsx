export default function HomeLoader() {
  return (
    <div className="p-6 md:p-10 space-y-12">
      {/* ===== TOP ALBUMS ===== */}
      <div className="animate-pulse">
        <div className="h-5 w-32 bg-muted/60 rounded mb-6"></div>

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-36">
              <div className="aspect-square rounded-lg bg-muted/50 mb-2" />
              <div className="h-4 bg-muted/50 rounded w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="animate-pulse">
        <div className="h-5 w-28 bg-muted/60 rounded mb-6"></div>

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-28 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-muted/50 mb-2" />

              <div className="h-3 w-20 bg-muted/50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
