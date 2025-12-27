import { Plus, Play, Music, Trash2, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { usePlaylists } from "../context/PlaylistContext";
import SongList from "../components/ui/SongList";
import PlaylistModal from "../components/ui/PlaylistModal";

export default function PlaylistsPage() {
  const { playlists, deletePlaylist, renamePlaylist, isLoaded } =
    usePlaylists();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [editName, setEditName] = useState("");

  const handleCreatePlaylist = () => {
    setPlaylistModalOpen(true);
  };

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleDeletePlaylist = (e, playlistId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      deletePlaylist(playlistId);
    }
  };

  const handleEditPlaylist = (e, playlist) => {
    e.stopPropagation();
    setEditingPlaylist(playlist.id);
    setEditName(playlist.name);
  };

  const handleSaveEdit = (playlistId) => {
    if (editName.trim()) {
      renamePlaylist(playlistId, editName.trim());
    }
    setEditingPlaylist(null);
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditingPlaylist(null);
    setEditName("");
  };

  const generatePlaylistImage = (playlist) => {
    // Use first song's image if available, otherwise generate a gradient
    if (playlist.songs.length > 0 && playlist.songs[0].image) {
      const song = playlist.songs[0];
      if (Array.isArray(song.image)) {
        return song.image[song.image.length - 1]?.link || song.image[0]?.link;
      }
      return typeof song.image === "string" ? song.image : song.image?.link;
    }

    // Generate a gradient based on playlist name
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-teal-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-pink-500 to-rose-500",
    ];
    const colorIndex = playlist.name.length % colors.length;
    return colors[colorIndex];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Sidebar />
      <div className="lg:ml-64 pb-32">
        {!selectedPlaylist ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 pt-16 lg:pt-8">
            {/* Header */}
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Music className="text-purple-400 h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Your Playlists
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {playlists.length} playlist
                    {playlists.length !== 1 ? "s" : ""} created
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCreatePlaylist}
                  className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-green-hover hover:from-neon-green-hover hover:to-neon-green text-black font-medium transition-all duration-200 shadow-lg hover:shadow-neon-green/25 hover:scale-105 flex-1 sm:flex-none justify-center"
                >
                  <Plus className="w-5 h-5" />
                  Create Playlist
                </button>
              </div>
            </header>

            {/* Playlists Grid */}
            <section className="space-y-6">
              {playlists.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
                    <Music className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    No playlists yet
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Create your first playlist to organize your favorite songs
                    and discover new music.
                  </p>
                  <button
                    onClick={handleCreatePlaylist}
                    className="px-6 py-3 bg-neon-green text-black rounded-xl hover:bg-neon-green-hover transition-colors font-medium shadow-lg"
                  >
                    Create Your First Playlist
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                  {playlists.map((playlist) => {
                    const playlistImage = generatePlaylistImage(playlist);
                    const isGradient = !playlistImage.startsWith("http");

                    return (
                      <div key={playlist.id} className="group">
                        <div
                          onClick={() => handlePlaylistClick(playlist)}
                          className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:bg-card/80 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          {/* Playlist Image */}
                          <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                            {isGradient ? (
                              <div
                                className={`w-full h-full bg-gradient-to-br ${playlistImage} flex items-center justify-center`}
                              >
                                <div className="text-center">
                                  <Music className="w-12 h-12 text-white/80 mx-auto mb-2" />
                                  <span className="text-white/60 text-xs font-medium">
                                    {playlist.songs.length} song
                                    {playlist.songs.length !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <img
                                src={playlistImage}
                                alt={playlist.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            )}

                            {/* Fallback gradient if image fails */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center ${isGradient ? "hidden" : "hidden"}`}
                            >
                              <Music className="w-12 h-12 text-white/80" />
                            </div>

                            {/* Play button overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 rounded-full bg-neon-green flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => handleEditPlaylist(e, playlist)}
                                className="p-1.5 bg-black/60 hover:bg-black/80 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-3 h-3 text-white" />
                              </button>
                              <button
                                onClick={(e) =>
                                  handleDeletePlaylist(e, playlist.id)
                                }
                                className="p-1.5 bg-black/60 hover:bg-red-600 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          </div>

                          {/* Playlist Info */}
                          <div>
                            {editingPlaylist === playlist.id ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                      handleSaveEdit(playlist.id);
                                    if (e.key === "Escape") handleCancelEdit();
                                  }}
                                  className="w-full px-2 py-1 text-sm bg-muted border border-border rounded focus:outline-none focus:ring-1 focus:ring-neon-green"
                                  autoFocus
                                />
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleSaveEdit(playlist.id)}
                                    className="px-2 py-1 text-xs bg-neon-green text-black rounded hover:bg-neon-green-hover transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <h4 className="font-semibold truncate mb-1 group-hover:text-neon-green transition-colors">
                                  {playlist.name}
                                </h4>
                                <p className="text-sm text-muted-foreground truncate">
                                  {playlist.songs.length} song
                                  {playlist.songs.length !== 1 ? "s" : ""} • You
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        ) : (
          /* Playlist Detail View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 pt-16 lg:pt-8">
            {/* Back Button */}
            <button
              onClick={() => setSelectedPlaylist(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Playlists
            </button>

            {/* Playlist Header */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <Music className="w-16 h-16 text-white/80" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Playlist
                  </p>
                  <h1 className="text-4xl font-bold mb-4">
                    {selectedPlaylist.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {selectedPlaylist.songs.length} song
                    {selectedPlaylist.songs.length !== 1 ? "s" : ""} • Created{" "}
                    {new Date(selectedPlaylist.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Playlist Songs */}
            {selectedPlaylist.songs.length > 0 ? (
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg overflow-hidden">
                <SongList songs={selectedPlaylist.songs} title="" />
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                  <Music className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No songs in this playlist
                </h3>
                <p className="text-muted-foreground">
                  Add songs to this playlist by clicking the "+" button on any
                  song.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        song={null}
      />
    </div>
  );
}
