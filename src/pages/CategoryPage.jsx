import { useNavigate, useParams } from "react-router-dom";
import { Play } from "lucide-react";
import useSearchApi from "../components/Hooks/useSearchApi";
// fetch albums for the category

export default function CategoryPage() {
  const { category } = useParams(); // get category from URL
  const albumsData = useSearchApi(category);
  const albums = albumsData?.data?.results || [];
  const navigate = useNavigate();

  if (!albums.length)
    return <p className="text-center mt-10">No albums found.</p>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="mb-6 text-2xl font-bold">{category} Albums</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            onClick={() => navigate(`/album/${album.id}`)}
            className="group bg-card rounded-lg p-3 hover:bg-muted/50 transition cursor-pointer select-none"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
              <img
                src={album.image?.[2]?.url || album.image?.[1]?.url}
                alt={album.name}
                draggable="false"
                className="w-full h-full object-cover pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="w-9 h-9 rounded-full bg-[#00ff88] flex items-center justify-center">
                  <Play size={18} className="text-black fill-black" />
                </div>
              </div>
            </div>

            <h4 className="truncate text-sm font-semibold">{album.name}</h4>
            <p className="text-xs text-muted-foreground text-center">Album</p>
          </div>
        ))}
      </div>
    </div>
  );
}
