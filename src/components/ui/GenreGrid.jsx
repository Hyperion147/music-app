import { useState } from "react";
import { Music, Loader2 } from "lucide-react";
import SongList from "./SongList";
import useGenresApi from "../Hooks/genres_api";

export default function GenreGrid() {
  const { genres, loading, error } = useGenresApi();
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
        <span className="ml-2 text-muted-foreground">Loading genres...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive">
        <p>Error loading genres: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!selectedGenre ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 w-full">
          {genres.map((genre, index) => (
            <div
              key={index}
              onClick={() => setSelectedGenre(genre)}
              className="group relative bg-gradient-to-br from-card to-card/80 border border-border/30 rounded-2xl p-5 cursor-pointer hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 hover:scale-[1.02] hover:border-neon-green/50 w-full min-h-[200px] md:min-h-[220px] flex flex-col backdrop-blur-sm"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-muted/60 to-muted/40 relative w-full flex-shrink-0 shadow-lg">
                {genre.image ? (
                  <>
                    <img
                      src={genre.image}
                      alt={genre.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        console.error(
                          "Genre image failed to load:",
                          genre.image,
                        );
                        e.target.style.display = "none";
                        const fallback =
                          e.target.parentElement.querySelector(
                            ".fallback-icon",
                          );
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    {/* Image overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div
                      className="fallback-icon absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-neon-green/10"
                      style={{ display: "none" }}
                    >
                      <Music className="w-12 h-12 md:w-14 md:h-14 text-neon-green/80" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-neon-green/10">
                    <Music className="w-12 h-12 md:w-14 md:h-14 text-neon-green/80" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center text-center relative z-10">
                <h3
                  className="text-sm md:text-base font-semibold group-hover:text-neon-green transition-all duration-300 mb-1 overflow-hidden drop-shadow-sm"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {genre.name}
                </h3>
                {/* Subtle accent line */}
                <div className="w-8 h-0.5 bg-gradient-to-r from-neon-green/50 to-transparent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full pb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setSelectedGenre(null)}
              className="text-neon-green hover:text-neon-green-hover transition-colors font-medium"
            >
              ← Back to Genres
            </button>
          </div>

          <div className="relative bg-gradient-to-br from-card via-card/95 to-card/80 border border-border/30 rounded-2xl p-8 mb-8 w-full overflow-hidden shadow-xl backdrop-blur-sm">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-neon-green/10 rounded-2xl" />

            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-muted/60 to-muted/40 flex-shrink-0 relative shadow-2xl">
                {selectedGenre.image ? (
                  <>
                    <img
                      src={selectedGenre.image}
                      alt={selectedGenre.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(
                          "Selected genre image failed to load:",
                          selectedGenre.image,
                        );
                        e.target.style.display = "none";
                        const fallback =
                          e.target.parentElement.querySelector(
                            ".fallback-icon",
                          );
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    <div
                      className="fallback-icon absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-neon-green/10"
                      style={{ display: "none" }}
                    >
                      <Music className="w-16 h-16 md:w-20 md:h-20 text-neon-green/80" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-neon-green/10">
                    <Music className="w-16 h-16 md:w-20 md:h-20 text-neon-green/80" />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left min-w-0 flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent drop-shadow-sm">
                  {selectedGenre.name}
                </h1>
                {/* Decorative accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-neon-green to-neon-green/50 rounded-full mx-auto sm:mx-0" />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <SongList songs={selectedGenre.songs} title="Popular Songs" />
          </div>
        </div>
      )}
    </div>
  );
}
