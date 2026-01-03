import React from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
<<<<<<< HEAD
import { Home, Search, Library, Heart, Plus, LogOut, Music, Users } from "lucide-react";
=======
import { Home, Search, Library, Heart, Plus, LogOut } from "lucide-react";
>>>>>>> origin/main
import { useAuth } from "../context/FirebaseContext";
import { useToast } from "../context/toastContext";
import { Link } from "react-router-dom";
import Playlist from "./playlist";

export const Sidebar = ({ playlists = [],onAddPlaylist }) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();

  const menuItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Library, label: "Your Library", path: "/library" },
    { icon: Heart, label: "Liked Songs", path: "/favorites" },
  ];

  const mobileMenuItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Library, label: "Library", path: "/library" },
    { icon: Heart, label: "Profile", path: "/profile" },
  ];


  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Logged out successfully");
      navigate("/login");
    } catch (error) {
      showError("Logout failed", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed left-0 top-0 w-64 bg-card border-r border-border h-screen ">

        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="text-neon-green">
              <Music className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              MusicFlow
            </span>
          </div>
        </div>

        <nav className=" px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-muted text-neon-green"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-6 flex-1 flex flex-col min-h-0">
          <div className="px-6 mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground tracking-wider">
              Playlists
            </span>
            <button 
              onClick={onAddPlaylist}
              className="p-1 hover:bg-neon-green rounded-md transition-colorsfont-medium text-muted-foreground hover:text-foreground dark:hover:text-black">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 px-3 font-medium overflow-y-auto space-y-1 custom-scrollbar pb-4">
            {(playlists || []).map((playlist, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2 rounded-lg  text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                {playlist}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <div className="flex items-center dark:hover:bg-neon-green-hover hover:bg-gray-200 hover:rounded-xl gap-3 px-3 py-2 h-19">
            <div className="w-8 h-8 rounded-full bg-neon-green flex items-center justify-center shrink-0">
              <span className="text-black font-bold text-xs uppercase">
                {user?.email?.charAt(0) || "U"}
              </span>
            </div>
            <Link
              to="/profile"
              className="truncate text-sm font-medium text-foreground"
            >
              {user?.displayName ||
                user?.email?.split("@")[0] ||
                "User Profile"}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden">
        <nav className="flex justify-around py-2">
          {mobileMenuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={` rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-neon-green"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
