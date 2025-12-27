import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX",
};

// Check if we're using demo/placeholder values
const isDemoConfig =
  firebaseConfig.apiKey.includes("Demo") ||
  firebaseConfig.apiKey === "demo-api-key" ||
  firebaseConfig.projectId === "demo-project";

// Only initialize Firebase if we have real config values
let app;
let auth;
let githubProvider;
let googleProvider;

if (isDemoConfig) {
  console.warn(
    "🚨 Using demo Firebase configuration. Authentication will not work.",
  );
  console.log("📝 To fix this:");
  console.log("1. Go to https://console.firebase.google.com/");
  console.log("2. Create a new project");
  console.log("3. Add a web app");
  console.log("4. Copy the config values to your .env file");
  console.log("5. Enable Authentication providers");

  // Create mock auth for development
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      // Simulate no user initially
      setTimeout(() => callback(null), 100);
      return () => {}; // unsubscribe function
    },
  };
  githubProvider = {};
  googleProvider = {};
} else {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    githubProvider = new GithubAuthProvider();
    googleProvider = new GoogleAuthProvider();
    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
    // Create mock auth for development
    auth = {
      currentUser: null,
      onAuthStateChanged: () => () => {},
    };
    githubProvider = {};
    googleProvider = {};
  }
}

let analytics;
if (typeof window !== "undefined" && firebaseConfig.measurementId && app) {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Firebase Analytics initialization failed:", error);
  }
}

export { auth, githubProvider, googleProvider, isDemoConfig };
