// components/ui/AlbumLoader.jsx
export default function Loader({ songsCount = 5 }) {
  return (
    <div className="p-5 animate-pulse space-y-6">
      <div className="flex gap-4">
        <div className="w-28 h-28 rounded-xl bg-muted/50" />
        <div className="flex-1 flex flex-col justify-center space-y-2">
          <div className="h-4 w-32 rounded bg-muted/60" />
          <div className="h-6 w-48 rounded bg-muted/50" />
        </div>
      </div>

      {Array.from({ length: songsCount }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <div className="h-4 w-6 rounded bg-muted/60" />
          <div className="h-4 w-40 rounded bg-muted/50" />
        </div>
      ))}
    </div>
  );
}
