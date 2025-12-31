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
import CategoryPage from "./pages/CategoryPage.jsx";
import { Profile } from "./pages/profile";
import MainLayout from "./components/Layout/MainLayout";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/favorites" element={<LikedSongs />} />
                <Route path="/playlist/:id" element={<PlaylistView />} />
                <Route path="/artist/:id" element={<ArtistPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/category/:category" element={<CategoryPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
