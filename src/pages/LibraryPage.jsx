import { Plus, Play } from "lucide-react";
import { Sidebar } from "../components/sidebar";

const playlists = [
  {
    id: 1,
    title: "Chill Vibes",
    image:
      "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    songs: 3,
  },
];

export default function LibraryPage() {
  const handleCreatePlaylist = () => {
    console.log("Create playlist clicked");
  };

  return (
    <div className="lg:ml-64 pb-32 pt-16 lg:pt-8 px-4 sm:px-6 lg:px-8">
      <Sidebar />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Your Library</h1>
            <p className="text-muted-foreground">
              {playlists.length} playlists
            </p>
          </div>

          <button
            onClick={handleCreatePlaylist}
            className="flex items-center gap-2 h-9 px-4 rounded-md bg-[#00ff88] hover:bg-[#00cc6f] text-black font-medium transition"
          >
            <Plus className="w-5 h-5" />
            Create Playlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <div className="group bg-card rounded-xl p-4 hover:bg-muted/50 transition cursor-pointer">
              {/* Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-muted">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#00ff88] flex items-center justify-center shadow-lg scale-90">
                    <Play className="w-6 h-6 text-black fill-black ml-1" />
                  </div>
                </div>
              </div>

              <h4 className="truncate mb-1 font-semibold">{playlist.title}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {playlist.songs} songs • You
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
