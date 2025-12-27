import { useMusicPlayer } from "../context/MusicContext";
import { Music, Users, TrendingUp } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import Banner from "../components/ui/Banner";
import SongList from "../components/ui/SongList";
import UserProfile from "../components/ui/UserProfile";
import ArtistGrid from "../components/ui/ArtistGrid";

function Home() {
  const { songs, loading } = useMusicPlayer();

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 text-foreground lg:ml-64 pb-32 relative">
        {/* User Profile - Top Right Corner */}
        <UserProfile />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-10 pt-16 lg:pt-8">
          {/* Header */}
          <header className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-neon-green/10 border border-neon-green/20">
              <Music className="text-neon-green h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                MusicFlow
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Discover and enjoy your favorite music
              </p>
            </div>
          </header>

          {/* Hero Banner Section */}
          <section className="relative">
            <Banner />
          </section>

          {/* Welcome Card */}
          <section>
            <div className="bg-gradient-to-r from-neon-green/5 via-neon-green/10 to-neon-green/5 border border-neon-green/20 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neon-green/10 mb-4">
                <Music className="w-6 h-6 sm:w-8 sm:h-8 text-neon-green" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-neon-green">
                Welcome Back!
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                Discover new music, explore trending artists, and enjoy your
                personalized listening experience.
              </p>
            </div>
          </section>

          {/* Artists Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Popular Artists
                </h2>
                <p className="text-muted-foreground">
                  Discover trending artists and their music
                </p>
              </div>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <ArtistGrid />
            </div>
          </section>

          {/* Popular Songs Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Trending Now
                </h2>
                <p className="text-muted-foreground">
                  Most popular songs right now
                </p>
              </div>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {loading ? (
                <div className="p-8">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-muted/50 rounded w-1/4"></div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted/50 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                          <div className="h-3 bg-muted/50 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <SongList songs={songs.slice(0, 10)} title="" />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
