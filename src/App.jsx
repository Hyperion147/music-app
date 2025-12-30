import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/FirebaseContext";
import { ToastProvider } from "./context/toastContext";

import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/Home.jsx";
import LikedSongs from "./pages/LikedSongs.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import PlaylistView from "./pages/PlaylistView.jsx";
import ArtistPage from "./pages/ArtistPage.jsx";
import { Profile } from "./pages/profile";

import ProtectedRoute from "./components/ProtectedRoute";
import PlayerBar from "./components/ui/PlayerBar";
// import Topsong_api from "./components/Hooks/Topsong_api";

function App() {
  // const api_data = Topsong_api();
  // console.log(api_data);

  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-black text-white">
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
                  path="/playlist/:id"
                  element={
                    <ProtectedRoute>
                      <PlaylistView />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/artist/:id"
                  element={
                    <ProtectedRoute>
                      <ArtistPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>

              {/* Global Player */}
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
