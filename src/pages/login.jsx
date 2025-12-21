import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FirebaseContext";

import { Button } from "@/components/shad/button";
import { Github, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import { useToast } from "../context/toastContext.jsx";
import { ThemeToggle } from "../components/ui/toogleTheme.jsx";

function Login() {
  const { showSuccess, showError } = useToast();
  const { user, loading, loginWithEmail, loginWithGoogle, loginWithGithub } =
    useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Auto-navigate if user is already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      await loginWithEmail(email, password);
      showSuccess("Successful");
      navigate("/home");
    } catch (error) {
      showError("Login Failed");
    }
  };

  return (
    <>
      <ThemeToggle />
      <div className="bg-background border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-center mb-2">Welcome back</h2>
        <p className="text-center text-muted-foreground mb-6">
          Sign in to continue listening
        </p>

        <div className="space-y-3 mb-6">
          <Button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full h-9 px-4 py-2 rounded-md border bg-background text-foreground hover:bg-accent transition"
            onClick={loginWithGoogle}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full h-9 px-4 py-2 rounded-md border bg-background text-foreground hover:bg-accent transition"
            onClick={loginWithGithub}
          >
            <Github className="w-5 h-5 -mr-2" />
            Continue with GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="bg-border h-px w-full" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
            or
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div className="relative">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Mail className="absolute left-3 top-11.5 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full h-9 px-3 rounded-md border pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Lock className="absolute left-3 top-11.5 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="mt-1 w-full h-9 px-3 rounded-md border pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 translate-y-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-9 rounded-md bg-[#00ff88] hover:bg-[#00cc6f] text-black font-medium"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#00ff88] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;

//logout feature

// import { useAuth } from "../AuthContext";

// function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav>
//       {user ? (
//         <>
//           <span>{user.displayName || user.email}</span>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <a href="/login">Login</a>
//       )}
//     </nav>
//   );
// }
