import { createContext, useContext, useState, useEffect } from "react";

const LikedSongsContext = createContext();

export const useLikedSongs = () => {
  const context = useContext(LikedSongsContext);
  if (!context) {
    throw new Error("useLikedSongs must be used within a LikedSongsProvider");
  }
  return context;
};

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  // Load liked songs from localStorage on mount
  useEffect(() => {
    const savedLikedSongs = localStorage.getItem("likedSongs");
    if (savedLikedSongs) {
      try {
        setLikedSongs(JSON.parse(savedLikedSongs));
      } catch (error) {
        console.error("Error loading liked songs:", error);
        setLikedSongs([]);
      }
    }
  }, []);

  // Save liked songs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const isLiked = prev.some((likedSong) => likedSong.id === song.id);

      if (isLiked) {
        // Remove from liked songs
        return prev.filter((likedSong) => likedSong.id !== song.id);
      } else {
        // Add to liked songs
        return [...prev, song];
      }
    });
  };

  const isLiked = (songId) => {
    return likedSongs.some((song) => song.id === songId);
  };

  const clearAllLikedSongs = () => {
    setLikedSongs([]);
  };

  const value = {
    likedSongs,
    toggleLike,
    isLiked,
    clearAllLikedSongs,
  };

  return (
    <LikedSongsContext.Provider value={value}>
      {children}
    </LikedSongsContext.Provider>
  );
};
