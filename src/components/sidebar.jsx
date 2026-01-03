import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Heart } from "lucide-react";
import { useAuth } from "../context/FirebaseContext";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Heart, label: "Liked Songs", path: "/favorites" },
  ];

  return (
    <>
      <div className="hidden md:flex fixed left-0 top-0 w-64 bg-card border-r border-border h-screen flex-col z-20">
        <div className="p-6">
          <h1 className="text-xl font-bold text-foreground">MusicFlow</h1>
        </div>

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

        <div className="mt-auto border-t border-border p-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition"
          >
            <div className="w-6 h-6 rounded-full bg-neon-green flex items-center justify-center text-black text-xs font-bold">
              {user?.displayName?.charAt(0)?.toUpperCase() ||
                user?.email?.charAt(0)?.toUpperCase() ||
                "U"}
            </div>
            <span className="font-medium text-foreground truncate">
              Profile
            </span>
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-card border-t border-border flex justify-around items-center z-20">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-1/4 ${
                isActive ? "text-neon-green" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          );
        })}

        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center justify-center w-1/4"
        >
          <div className="w-6 h-6 rounded-full bg-neon-green flex items-center justify-center text-black text-xs font-bold">
            {user?.displayName?.charAt(0)?.toUpperCase() ||
              user?.email?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>
        </button>
      </div>
    </>
  );
};
