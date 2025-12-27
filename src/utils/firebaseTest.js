// Firebase Configuration Test Utility
// Run this in browser console to test your Firebase setup

export const testFirebaseConfig = () => {
  console.log("🔥 Testing Firebase Configuration...");

  // Check environment variables
  const requiredEnvVars = [
    "VITE_FIREBASE_API_KEY",
    "VITE_FIREBASE_AUTH_DOMAIN",
    "VITE_FIREBASE_PROJECT_ID",
    "VITE_FIREBASE_STORAGE_BUCKET",
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "VITE_FIREBASE_APP_ID",
  ];

  const missingVars = requiredEnvVars.filter((varName) => {
    const value = import.meta.env[varName];
    return !value || value.includes("your_") || value.includes("demo-");
  });

  if (missingVars.length > 0) {
    console.error("❌ Missing or placeholder environment variables:");
    missingVars.forEach((varName) => {
      console.error(
        `   - ${varName}: ${import.meta.env[varName] || "undefined"}`,
      );
    });
    console.log(
      "📝 Please update your .env file with real Firebase credentials",
    );
    return false;
  }

  console.log("✅ All environment variables are set");

  // Test Firebase initialization
  try {
    import("../services/firebase.js").then(({ auth }) => {
      if (auth && typeof auth.onAuthStateChanged === "function") {
        console.log("✅ Firebase Auth initialized successfully");
        console.log("🔧 Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
        console.log(
          "🌐 Auth Domain:",
          import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        );
      } else {
        console.error("❌ Firebase Auth not properly initialized");
      }
    });
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    return false;
  }

  return true;
};

// Auto-run test in development
if (import.meta.env.DEV) {
  console.log(
    "🚀 Firebase test utility loaded. Run testFirebaseConfig() to test your setup.",
  );
}
