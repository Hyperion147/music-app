import { useState } from "react";
import { X, Plus, Music, Check } from "lucide-react";
import { usePlaylists } from "../../context/PlaylistContext";

export default function PlaylistModal({ isOpen, onClose, song }) {
  const { playlists, createPlaylist, addSongToPlaylist, isSongInPlaylist } =
    usePlaylists();
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [addedToPlaylists, setAddedToPlaylists] = useState(new Set());

  if (!isOpen) return null;

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = createPlaylist(newPlaylistName, song);
      setAddedToPlaylists((prev) => new Set([...prev, newPlaylist.id]));
      setNewPlaylistName("");
      setIsCreating(false);

      // Auto close after 1 second to show success
      setTimeout(() => {
        onClose();
        setAddedToPlaylists(new Set());
      }, 1000);
    }
  };

  const handleAddToPlaylist = (playlistId) => {
    if (song && !isSongInPlaylist(playlistId, song.id)) {
      addSongToPlaylist(playlistId, song);
      setAddedToPlaylists((prev) => new Set([...prev, playlistId]));

      // Auto close after 1 second to show success
      setTimeout(() => {
        onClose();
        setAddedToPlaylists(new Set());
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newPlaylistName.trim()) {
      handleCreatePlaylist();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {song ? "Add to Playlist" : "Create New Playlist"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {song
                  ? song.name || song.title
                  : "Create a new playlist to organize your music"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* Create New Playlist */}
          <div className="space-y-3">
            {!isCreating ? (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center gap-3 p-4 rounded-xl border border-dashed border-border hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-neon-green/10 group-hover:bg-neon-green/20 transition-colors">
                  <Plus className="w-5 h-5 text-neon-green" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Create New Playlist</p>
                  <p className="text-sm text-muted-foreground">
                    {song
                      ? "Start a new playlist with this song"
                      : "Create a new empty playlist"}
                  </p>
                </div>
              </button>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter playlist name..."
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/50 transition-all"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreatePlaylist}
                    disabled={!newPlaylistName.trim()}
                    className="flex-1 px-4 py-2 bg-neon-green text-black rounded-xl hover:bg-neon-green-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewPlaylistName("");
                    }}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Existing Playlists */}
          {song && playlists.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Your Playlists
              </h3>
              <div className="space-y-2">
                {playlists.map((playlist) => {
                  const isAlreadyAdded =
                    song && isSongInPlaylist(playlist.id, song.id);
                  const isJustAdded = addedToPlaylists.has(playlist.id);

                  return (
                    <button
                      key={playlist.id}
                      onClick={() =>
                        song &&
                        !isAlreadyAdded &&
                        handleAddToPlaylist(playlist.id)
                      }
                      disabled={!song || isAlreadyAdded}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        isAlreadyAdded
                          ? "bg-muted/50 cursor-not-allowed opacity-60"
                          : isJustAdded
                            ? "bg-neon-green/10 border border-neon-green/20"
                            : "hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isJustAdded
                            ? "bg-neon-green/20"
                            : isAlreadyAdded
                              ? "bg-muted"
                              : "bg-muted/80"
                        }`}
                      >
                        {isJustAdded ? (
                          <Check className="w-4 h-4 text-neon-green" />
                        ) : (
                          <Music className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{playlist.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {playlist.songs.length} song
                          {playlist.songs.length !== 1 ? "s" : ""}
                          {isAlreadyAdded && " • Already added"}
                          {isJustAdded && " • Added!"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!song && playlists.length === 0 && !isCreating && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">No playlists yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first playlist to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
