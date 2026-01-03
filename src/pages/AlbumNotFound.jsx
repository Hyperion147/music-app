import { MusicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AlbumNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <MusicOff className="w-16 h-16 text-muted-foreground mb-4" />

      <h2 className="text-xl font-semibold mb-2">Album not found</h2>

      <p className="text-muted-foreground mb-6">
        We couldn’t find the album you’re looking for.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
      >
        Go Home
      </button>
    </div>
  );
}
