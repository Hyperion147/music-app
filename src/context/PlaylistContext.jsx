import { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext();

export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylists must be used within a PlaylistProvider");
  }
  return context;
};

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load playlists from localStorage on mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("playlists");

    if (
      savedPlaylists &&
      savedPlaylists !== "undefined" &&
      savedPlaylists !== "null"
    ) {
      try {
        const parsedPlaylists = JSON.parse(savedPlaylists);
        setPlaylists(parsedPlaylists);
      } catch (error) {
        console.error("Error parsing playlists from localStorage:", error);
        localStorage.removeItem("playlists");
        setPlaylists([]);
      }
    } else {
      setPlaylists([]);
    }

    setIsLoaded(true);
  }, []);

  // Save playlists to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        const serialized = JSON.stringify(playlists);
        localStorage.setItem("playlists", serialized);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [playlists, isLoaded]);

  const createPlaylist = (name, initialSong = null) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name: name.trim(),
      songs: initialSong ? [initialSong] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          // Check if song already exists in playlist
          const songExists = playlist.songs.some((s) => s.id === song.id);
          if (songExists) {
            return playlist; // Don't add duplicate
          }

          return {
            ...playlist,
            songs: [...playlist.songs, song],
            updatedAt: new Date().toISOString(),
          };
        }
        return playlist;
      }),
    );
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter((song) => song.id !== songId),
            updatedAt: new Date().toISOString(),
          };
        }
        return playlist;
      }),
    );
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId),
    );
  };

  const renamePlaylist = (playlistId, newName) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            name: newName.trim(),
            updatedAt: new Date().toISOString(),
          };
        }
        return playlist;
      }),
    );
  };

  const getPlaylist = (playlistId) => {
    return playlists.find((playlist) => playlist.id === playlistId);
  };

  const isSongInPlaylist = (playlistId, songId) => {
    const playlist = getPlaylist(playlistId);
    return playlist ? playlist.songs.some((song) => song.id === songId) : false;
  };

  const value = {
    playlists,
    isLoaded,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
    renamePlaylist,
    getPlaylist,
    isSongInPlaylist,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};
