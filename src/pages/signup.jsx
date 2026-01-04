import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/FirebaseContext";
import { Button } from "@/components/shad/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "../context/toastContext";

function SignUp() {
  const { showSuccess, showError } = useToast();
  const { user, loading, signupWithEmail, loginWithGoogle, loginWithGithub } =
    useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user && !loading) navigate("/home");
  }, [user, loading, navigate]);

  const handleEmailSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      showError("Passwords do not match");
      return;
    }

    try {
      await signupWithEmail(email, password);
      showSuccess("Account created successfully");
      navigate("/home");
    } catch {
      showError("User Already exist");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Create account</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sign up to start listening
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <Button
            type="button"
            onClick={loginWithGoogle}
            className="w-full h-10 gap-2 border bg-background hover:bg-accent text-foreground"
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
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            type="button"
            onClick={loginWithGithub}
            className="w-full h-10 gap-2 border bg-background hover:bg-accent text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            Continue with GitHub
          </Button>
        </div>

        <div className="relative my-6">
          <div className="h-px bg-border" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="bg-card px-3 text-xs text-muted-foreground">
              OR
            </span>
          </span>
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 rounded-md border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-10 rounded-md border bg-background pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-10 rounded-md border bg-background pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-[#00ff88] hover:bg-[#00cc6f] text-black font-semibold"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00ff88] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
