import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css"; // Your Tailwind and CSS variables
import App from "./App.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import { AuthProvider } from "./context/FirebaseContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
