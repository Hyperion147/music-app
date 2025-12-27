import { useState } from "react";
import { Users, Loader2 } from "lucide-react";
import useArtistsApi from "../Hooks/artists_api";
import SongList from "./SongList";

export default function ArtistGrid() {
  const { artists, loading, error } = useArtistsApi();
  const [selectedArtist, setSelectedArtist] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
        <span className="ml-2 text-muted-foreground">Loading artists...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive">
        <p>Error loading artists: {error}</p>
      </div>
    );
  }

  // Show only first 6 artists for homepage
  const displayArtists = artists.slice(0, 6);

  return (
    <div className="w-full">
      {!selectedArtist ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 w-full">
          {displayArtists.map((artist, index) => (
            <div
              key={artist.id || index}
              onClick={() => setSelectedArtist(artist)}
              className="group relative bg-card border border-border/30 rounded-xl p-4 cursor-pointer hover:bg-accent/20 transition-all duration-200 hover:border-neon-green/30 w-full flex flex-col items-center hover:scale-105"
            >
              {/* Artist Image */}
              <div className="aspect-square mb-3 rounded-full overflow-hidden bg-muted/50 relative w-full max-w-[80px] mx-auto">
                {artist.image ? (
                  <>
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        console.error(
                          "Artist image failed to load:",
                          artist.image,
                        );
                        e.target.style.display = "none";
                        const fallback =
                          e.target.parentElement.querySelector(
                            ".fallback-icon",
                          );
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="fallback-icon absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-neon-green/10"
                      style={{ display: "none" }}
                    >
                      <Users className="w-8 h-8 text-neon-green/80" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-neon-green/10">
                    <Users className="w-8 h-8 text-neon-green/80" />
                  </div>
                )}
              </div>

              {/* Artist Info */}
              <div className="text-center w-full">
                <h3 className="text-sm font-medium group-hover:text-neon-green transition-colors mb-1 truncate">
                  {artist.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {artist.followers
                    ? `${(artist.followers / 1000000).toFixed(1)}M`
                    : "1.2M"}{" "}
                  followers
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedArtist(null)}
              className="text-neon-green hover:text-neon-green-hover transition-colors text-sm font-medium"
            >
              ← Back to Artists
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0 relative">
                {selectedArtist.image ? (
                  <>
                    <img
                      src={selectedArtist.image}
                      alt={selectedArtist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(
                          "Selected artist image failed to load:",
                          selectedArtist.image,
                        );
                        e.target.style.display = "none";
                        const fallback =
                          e.target.parentElement.querySelector(
                            ".fallback-icon",
                          );
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="fallback-icon absolute inset-0 w-full h-full flex items-center justify-center"
                      style={{ display: "none" }}
                    >
                      <Users className="w-12 h-12 text-muted-foreground" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {selectedArtist.name}
                </h1>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  {selectedArtist.followers?.toLocaleString()} followers
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedArtist.songs.length} popular songs
                </p>
              </div>
            </div>
          </div>

          <SongList songs={selectedArtist.songs} title="Popular Songs" />
        </div>
      )}
    </div>
  );
}
