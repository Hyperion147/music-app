import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/FirebaseContext";
import { useToast } from "../../context/toastContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      showError("Logout failed");
    }
  };

  if (!user) return null;

  // Get user display information
  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const photoURL = user.photoURL;

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border rounded-full px-3 py-2 shadow-lg hover:shadow-xl transition-shadow duration-200">
        {/* User Avatar */}
        <div className="relative w-8 h-8 flex-shrink-0">
          {photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`${
              photoURL ? "hidden" : "flex"
            } w-8 h-8 rounded-full bg-neon-green items-center justify-center`}
          >
            <span className="text-black font-bold text-xs">
              {getInitials(displayName)}
            </span>
          </div>
        </div>

        {/* User Name */}
        <span className="text-sm font-medium text-foreground max-w-20 truncate">
          {displayName}
        </span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-8 h-8 rounded-full bg-red-600/90 hover:bg-red-600 text-white transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ml-1"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
