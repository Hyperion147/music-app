import React from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Home, Search, Library, Heart, Plus, LogOut } from "lucide-react";
import { useAuth } from "../context/FirebaseContext";
import { useToast } from "../context/toastContext";
import { Link } from "react-router-dom";

export const Sidebar = () => {
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

  const playlists = [];

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Logged out successfully");
      navigate("/login");
    } catch (error) {
      showError("Logout failed");
    }
  };

  return (
    <>
      <div className=" fixed left-0 top-0 w-64 bg-card border-r border-border h-screen flex flex-col">
        <NavLink to="/home">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <div className="text-neon-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>

              <span className="text-xl font-bold tracking-tight text-foreground">
                MusicFlow
              </span>
            </div>
          </div>
        </NavLink>

        <nav className="px-3 space-y-1">
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
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Playlists
            </span>
            <button className="p-1 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                className="w-full text-left px-3 py-2 rounded-lg transition-colors truncate text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                {playlist}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
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
    </>
  );
};
