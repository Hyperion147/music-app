import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import {
  Home,
  Search,
  Library,
  Heart,
  Plus,
  Music,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/FirebaseContext";
import { usePlaylists } from "../context/PlaylistContext";
import { Link } from "react-router-dom";
import PlaylistModal from "./ui/PlaylistModal";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { playlists, isLoaded } = usePlaylists();
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Library, label: "Your Library", path: "/library" },
    { icon: Heart, label: "Liked Songs", path: "/favorites" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-card/95 backdrop-blur-md border border-border/50 shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-64 bg-card/95 backdrop-blur-md border-r border-border/50 h-screen flex flex-col shadow-xl z-40 transition-transform duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <NavLink to="/home" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="p-6 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-neon-green to-neon-green-hover shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  MusicFlow
                </span>
                <p className="text-xs text-muted-foreground">
                  Your music companion
                </p>
              </div>
            </div>
          </div>
        </NavLink>

        <nav className="px-4 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-neon-green text-black shadow-lg shadow-neon-green/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-6 flex-1 flex flex-col min-h-0">
          <div className="px-6 mb-4 flex items-center justify-between">
            <button
              onClick={() => handleNavigation("/playlists")}
              className="text-sm font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              Playlists
            </button>
            <button
              onClick={() => setPlaylistModalOpen(true)}
              className="p-2 hover:bg-accent rounded-xl transition-colors text-muted-foreground hover:text-foreground group"
            >
              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
            {!isLoaded ? (
              <div className="text-center py-8 px-4">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                  <Music className="w-6 h-6 text-muted-foreground animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Loading playlists...
                </p>
              </div>
            ) : playlists.length === 0 ? (
              <div className="text-center py-8 px-4">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No playlists yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Create your first playlist
                </p>
              </div>
            ) : (
              playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => handleNavigation(`/playlist/${playlist.id}`)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-colors truncate text-muted-foreground hover:text-foreground hover:bg-muted/50 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-muted-foreground">
                        {playlist.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{playlist.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {playlist.songs.length} song
                        {playlist.songs.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-green-hover flex items-center justify-center shrink-0 shadow-md">
              <span className="text-black font-bold text-sm uppercase">
                {user?.email?.charAt(0) || "U"}
              </span>
            </div>
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="truncate text-sm font-medium text-foreground hover:text-neon-green transition-colors"
            >
              {user?.displayName ||
                user?.email?.split("@")[0] ||
                "User Profile"}
            </Link>
          </div>
        </div>
      </div>

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        song={null}
      />
    </>
  );
};
