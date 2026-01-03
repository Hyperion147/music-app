export default function CategoryLoader({ count = 10 }) {
  return (
    <div className="p-4 md:p-8 animate-pulse">
      <div className="h-6 w-48 bg-muted/60 rounded mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-3">
            <div className="aspect-square rounded-lg bg-muted/50 mb-2" />

            <div className="h-4 bg-muted/60 rounded w-full mb-1" />

            <div className="h-3 bg-muted/40 rounded w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
