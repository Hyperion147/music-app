import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import { AuthProvider } from "./context/FirebaseContext";
import { MusicProvider } from "./context/MusicContext";
import { LikedSongsProvider } from "./context/LikedSongsContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import LikedSongs from "./pages/LikedSongs";
import PlaylistsPage from "./pages/PlaylistsPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import GenrePage from "./pages/GenrePage";
import ArtistPage from "./pages/ArtistPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./context/toastContext";
import { Profile } from "./pages/profile";
import PlayerBar from "./components/ui/PlayerBar";
import UserProfile from "./components/ui/UserProfile";
function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <MusicProvider>
            <LikedSongsProvider>
              <PlaylistProvider>
                <Router>
                  <div className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<Navigate to="/login" />} />

                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />

                      <Route
                        path="/home"
                        element={
                          <ProtectedRoute>
                            <Home />
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
                            <Profile />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/library"
                        element={
                          <ProtectedRoute>
                            <LibraryPage />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/favorites"
                        element={
                          <ProtectedRoute>
                            <LikedSongs />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/playlists"
                        element={
                          <ProtectedRoute>
                            <PlaylistsPage />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/playlist/:id"
                        element={
                          <ProtectedRoute>
                            <PlaylistDetailPage />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/genres"
                        element={
                          <ProtectedRoute>
                            <GenrePage />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/artists"
                        element={
                          <ProtectedRoute>
                            <ArtistPage />
                          </ProtectedRoute>
                        }
                      />

                      <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>

                    {/* Global Player */}
                    <PlayerBar />
                  </div>
                </Router>
              </PlaylistProvider>
            </LikedSongsProvider>
          </MusicProvider>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
