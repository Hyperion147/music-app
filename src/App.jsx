import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import { ThemeProvider } from "./context/themeContext";
import { AuthProvider } from "./context/FirebaseContext";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./context/toastContext";
import { Profile } from "./pages/profile";
import PlayerBar from "./components/ui/PlayerBar";

function App() {

  const [playlists, setPlaylists] = useState([
    "Chill Vibes",
    "Workout Energy",
    "Focus Flow",
  ]);
  const [showPlaylist, setShowPlaylist] = useState(false);

  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex items-center justify-center p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <Home
                          playlists={playlists}
                          setPlaylists={setPlaylists}
                          showPlaylist={showPlaylist}
                          setShowPlaylist={setShowPlaylist}
                        />
                        <ArtistPage />
                        <GenrePage />
                      </ProtectedRoute>
                    }
                  />

                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  }
                />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile
                          playlists={playlists}
                          setPlaylists={setPlaylists}
                          showPlaylist={showPlaylist}
                          setShowPlaylist={setShowPlaylist}
                        />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/library"
                    element={
                      <ProtectedRoute>
                        <LibraryPage 
                          playlists={playlists}
                          setPlaylists={setPlaylists}
                          showPlaylist={showPlaylist}
                          setShowPlaylist={setShowPlaylist}/>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <LikedSongs 
                          playlists={playlists}
                          setPlaylists={setPlaylists}
                          showPlaylist={showPlaylist}
                          setShowPlaylist={setShowPlaylist} 
                        />
                      </ProtectedRoute>
                    }
                  />

                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>

              {/* Global Player */}
              <PlayerBar />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
