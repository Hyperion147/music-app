import { useState, useEffect } from "react";
import { Search, Loader2, X } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import GenreGrid from "../components/ui/GenreGrid";
import SongList from "../components/ui/SongList";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      await performSearch(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      console.log("Searching for:", searchQuery);

      const response = await fetch(
        `https://music-services.onrender.com/api/search/songs?query=${encodeURIComponent(searchQuery)}&limit=20`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search API response:", data);

      let results = [];
      if (data.success && data.data?.results) {
        results = data.data.results;
      } else if (data.results) {
        results = data.results;
      } else if (Array.isArray(data)) {
        results = data;
      }

      // Enhanced logging for image debugging
      if (searchQuery.toLowerCase().includes("rahat")) {
        console.log("🔍 RAHAT SEARCH DEBUG:");
        results.forEach((song, index) => {
          console.log(`Song ${index + 1}:`, {
            name: song.name || song.title,
            artist: song.primaryArtists || song.artist,
            imageData: song.image,
            imageType: typeof song.image,
            isArray: Array.isArray(song.image),
          });
        });
      }

      setSearchResults(results);
      console.log("Search results:", results.length, "songs found");
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(error.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Sidebar />
      <div className="lg:ml-64 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 pt-16 lg:pt-8">
          {/* Header */}
          <header className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Search className="text-blue-400 h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Search Music
              </h1>
              <p className="text-muted-foreground">
                Find your favorite songs, artists, and albums
              </p>
            </div>
          </header>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />

              {/* Loading indicator */}
              {isSearching && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-neon-green border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Clear button */}
              {query && !isSearching && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-12 py-4 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/50 transition-all duration-200 shadow-lg"
              />
            </div>
          </div>

          {/* Search Results */}
          {query.trim() && (
            <section className="space-y-6">
              {searchError ? (
                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
                    <Search className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-destructive mb-2">
                    Search Error
                  </h3>
                  <p className="text-muted-foreground mb-4">{searchError}</p>
                  <button
                    onClick={() => performSearch(query)}
                    className="px-6 py-2 bg-neon-green text-black rounded-xl hover:bg-neon-green-hover transition-colors font-medium shadow-lg"
                  >
                    Try Again
                  </button>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Search Results</h2>
                    <span className="px-3 py-1 bg-neon-green/10 text-neon-green text-sm rounded-full border border-neon-green/20">
                      {searchResults.length} songs found
                    </span>
                  </div>
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg overflow-hidden">
                    <SongList songs={searchResults} title="" />
                  </div>
                </div>
              ) : !isSearching && query.trim() ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    No results found
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find any songs matching "{query}". Try different
                    keywords or check your spelling.
                  </p>
                </div>
              ) : null}
            </section>
          )}

          {/* Browse by Genre */}
          {!query.trim() && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20">
                  <Search className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Browse by Genre
                  </h2>
                  <p className="text-muted-foreground">
                    Explore music by your favorite genres
                  </p>
                </div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
                <GenreGrid />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
