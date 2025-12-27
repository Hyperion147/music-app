# 🚀 Quick Firebase Setup (5 Minutes)

## Step 1: Create Firebase Project

**Click this link:** [Create Firebase Project](https://console.firebase.google.com/u/0/)

1. Click **"Create a project"**
2. Project name: `music-app-[your-name]` (e.g., `music-app-john`)
3. Disable Google Analytics (uncheck the box)
4. Click **"Create project"**

## Step 2: Add Web App

1. Click the **`</>`** (web) icon
2. App nickname: `music-web-app`
3. Click **"Register app"**
4. **COPY THIS CONFIG** (appears on screen):

```javascript
// Copy these exact values to your .env file
const firebaseConfig = {
  apiKey: "AIza...", // → VITE_FIREBASE_API_KEY
  authDomain: "music-app-....firebaseapp.com", // → VITE_FIREBASE_AUTH_DOMAIN
  projectId: "music-app-....", // → VITE_FIREBASE_PROJECT_ID
  storageBucket: "music-app-....appspot.com", // → VITE_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "...", // → VITE_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:...:web:...", // → VITE_FIREBASE_APP_ID
  measurementId: "G-...", // → VITE_FIREBASE_MEASUREMENT_ID
};
```

## Step 3: Enable Authentication

**Direct link:** `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/providers`

1. Click **"Get started"** (if first time)
2. Go to **"Sign-in method"** tab
3. Enable these providers:

### Email/Password:

- Click **"Email/Password"**
- Enable the first toggle
- Click **"Save"**

### Google:

- Click **"Google"**
- Enable toggle
- Select your email as support email
- Click **"Save"**

### GitHub:

- First create GitHub OAuth app: [GitHub Apps](https://github.com/settings/applications/new)
  - App name: `Music App`
  - Homepage: `http://localhost:5174`
  - Callback: `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`
  - Click **"Register application"**
  - Copy **Client ID** and create **Client Secret**
- Back in Firebase, click **"GitHub"**
- Enable toggle
- Paste Client ID and Client Secret
- Click **"Save"**

## Step 4: Update Your .env File

Replace the values in `music-app/.env` with your real Firebase config values.

## Step 5: Test

```bash
cd music-app
npm run dev
```

Go to `http://localhost:5174/login` and test the buttons!

---

## 🆘 Need Help?

**Common Issues:**

- **Popup closes immediately**: Check that providers are enabled in Firebase Console
- **"Configuration not found"**: Make sure .env values are correct and restart dev server
- **GitHub callback error**: Double-check the callback URL matches exactly

**Get your project URLs:**

- Firebase Console: `https://console.firebase.google.com/project/YOUR_PROJECT_ID`
- Authentication: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication`
- GitHub OAuth: `https://github.com/settings/applications/new`
