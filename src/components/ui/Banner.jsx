import { useState, useEffect, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useMusicPlayer } from "../../context/MusicContext";
import useBannersApi from "../Hooks/banners_api";

export default function Banner() {
  const { banners, loading, error } = useBannersApi();
  const { playSelectedSong } = useMusicPlayer();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-slide banners with progress
  useEffect(() => {
    if (banners.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setProgress(0);
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [banners.length, isPaused]);

  // Reset progress when manually changing banners
  const nextBanner = useCallback(
    (e) => {
      e?.stopPropagation();
      console.log("Next banner clicked");
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setProgress(0);
    },
    [banners.length],
  );

  const prevBanner = useCallback(
    (e) => {
      e?.stopPropagation();
      console.log("Previous banner clicked");
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
      setProgress(0);
    },
    [banners.length],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (banners.length <= 1) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevBanner();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextBanner();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [banners.length, prevBanner, nextBanner]);

  const handlePlayBanner = (song) => {
    playSelectedSong(song);
  };

  if (loading) {
    return (
      <div className="relative w-full h-64 bg-muted rounded-2xl animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">Loading banners...</div>
        </div>
      </div>
    );
  }

  if (error || banners.length === 0) {
    return (
      <div className="relative w-full h-64 bg-muted rounded-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">No banners available</div>
        </div>
      </div>
    );
  }

  const banner = banners[currentBanner];

  console.log("Current banner:", banner);
  console.log("Banner image URL:", banner?.image);

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden">
      {/* Main Banner Container */}
      <div
        className="relative w-full h-full group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: banner?.image
              ? `url(${banner.image})`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
          onError={() => {
            console.error("Banner image failed to load:", banner?.image);
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center p-8">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold mb-2 line-clamp-2">
              {banner.title}
            </h2>
            <p className="text-lg text-gray-200 mb-4">{banner.subtitle}</p>
            <button
              onClick={() => handlePlayBanner(banner.song)}
              className="flex items-center gap-2 bg-neon-green hover:bg-neon-green-hover text-black px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <Play className="w-5 h-5" />
              Play Now
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {banners.length > 1 && !isPaused && (
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-30">
            <div
              className="h-full bg-neon-green transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Navigation Controls - Outside main container for highest z-index */}
      {banners.length > 1 && (
        <>
          {/* Navigation Arrows - Top Corners */}
          <button
            onClick={prevBanner}
            className="absolute left-3 top-3 w-8 h-8 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg border border-white/20"
            style={{ zIndex: 9999 }}
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-3 top-3 w-8 h-8 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg border border-white/20"
            style={{ zIndex: 9999 }}
            aria-label="Next banner"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3"
            style={{ zIndex: 9999 }}
          >
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Dot clicked:", index);
                  setCurrentBanner(index);
                  setProgress(0);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                  index === currentBanner
                    ? "bg-neon-green shadow-lg shadow-neon-green/50"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
