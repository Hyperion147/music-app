import { createContext, useContext, useEffect, useState } from "react";
import { auth, githubProvider, googleProvider } from "../services/firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
} from "firebase/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const initAuth = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result:", result.user);
          setUser(result.user);
        }
      } catch (error) {
        console.error("Redirect error:", error.code, error.message);
      }

      unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { user: result.user };
    } catch (error) {
      throw error;
    }
  };
  const signupWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return { user: result.user };
    } catch (error) {
      throw error;
    }
  };
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect will happen, result will be handled by getRedirectResult
    } catch (error) {
      console.log("google error", error.code, error.message);

      throw error;
    }
  };

  const loginWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      // Redirect will happen, result will be handled by getRedirectResult
    } catch (error) {
      console.log("github error: ", error.code, error.message);
      throw error;
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithGithub,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
