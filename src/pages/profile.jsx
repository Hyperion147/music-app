import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Moon,
  LogOut,
  Shield,
  Bell,
  Download,
  Headphones,
  PlayCircle,
} from "lucide-react";
import { useAuth } from "../context/FirebaseContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/toastContext";
import { Sidebar } from "../components/sidebar";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showSuccess, showError } = useToast();

  const [highQuality, setHighQuality] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Signed out successfully");
      navigate("/login");
    } catch (err) {
      showError("Logout failed");
    }
  };

  return (
    <div className="flex bg-background min-h-screen min-w-full">
      <Sidebar />

      <motion.div
        className="flex-1 p-8 pb-32 ml-64 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div className="mb-8" variants={itemVariants}>
            <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-2xl p-8 mb-6 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-neon-green flex items-center justify-center shrink-0">
                <User className="w-12 h-12 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-semibold mb-1">
                  {user?.displayName || "Music Enthusiast"}
                </h2>
                <p className="text-muted-foreground mb-4">{user?.email}</p>
                <button className="px-4 py-1.5 border border-border bg-background rounded-md text-sm font-medium hover:bg-accent transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-2xl p-8 space-y-8 shadow-sm"
            variants={itemVariants}
          >
            <div>
              <h3 className="text-lg font-semibold mb-6">Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">
                        Toggle theme
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      theme === "dark" ? "bg-neon-green" : "bg-muted"
                    }`}
                  >
                    <motion.span
                      layout
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        theme === "dark" ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Headphones className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">High Quality Audio</p>
                      <p className="text-xs text-muted-foreground">
                        Stream music in higher quality
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHighQuality(!highQuality)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      highQuality ? "bg-neon-green" : "bg-muted"
                    }`}
                  >
                    <motion.span
                      layout
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        highQuality ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Autoplay</p>
                      <p className="text-xs text-muted-foreground">
                        Continue playing similar tracks
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAutoplay(!autoplay)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoplay ? "bg-neon-green" : "bg-muted"
                    }`}
                  >
                    <motion.span
                      layout
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoplay ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            <div>
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <div className="space-y-3">
                <AccountButton icon={Shield} label="Privacy Settings" />
                <AccountButton icon={Bell} label="Notification Preferences" />
                <AccountButton icon={Download} label="Download Settings" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-destructive text-white py-2.5 rounded-md font-medium"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-8 text-center text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <p>MusicFlow v1.0.0</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const AccountButton = ({ icon: Icon, label }) => (
  <motion.button
    whileHover={{ x: 5 }}
    className="w-full flex items-center gap-3 px-4 py-2.5 border border-border bg-background rounded-md text-sm font-medium hover:bg-accent transition-colors text-left"
  >
    <Icon className="w-4 h-4 text-muted-foreground" />
    {label}
  </motion.button>
);
