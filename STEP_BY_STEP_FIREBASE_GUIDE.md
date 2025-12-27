# 🔥 Complete Firebase Setup Guide for Music App

Follow these exact steps to get Firebase authentication working in your music app.

## Prerequisites

- Google account
- GitHub account
- Your music app project open

---

## 📋 STEP 1: Create Firebase Project

### 1.1 Go to Firebase Console

- Open your browser and go to: **https://console.firebase.google.com/**
- Sign in with your Google account

### 1.2 Create New Project

- Click the **"Create a project"** button (big blue button)
- Enter project name: **`music-app-2024`** (or any name you prefer)
- Click **"Continue"**

### 1.3 Configure Google Analytics (Optional)

- You can **disable Google Analytics** by unchecking the toggle
- Or keep it enabled and select your Google Analytics account
- Click **"Create project"**

### 1.4 Wait for Project Creation

- Wait for the "Your new project is ready" message
- Click **"Continue"**

---

## 📱 STEP 2: Add Web App to Firebase Project

### 2.1 Add Web App

- In your Firebase project dashboard, look for the **`</>`** icon (web icon)
- Click the **`</>`** icon to "Add Firebase to your web app"

### 2.2 Register App

- App nickname: **`music-web-app`**
- **DO NOT** check "Also set up Firebase Hosting" (leave unchecked)
- Click **"Register app"**

### 2.3 Copy Configuration

You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "music-app-2024.firebaseapp.com",
  projectId: "music-app-2024",
  storageBucket: "music-app-2024.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-ABCDEF1234",
};
```

### 2.4 Update Your .env File

Open `music-app/.env` and replace the values:

```env
VITE_FIREBASE_API_KEY=AIzaSyC...  # Copy from apiKey
VITE_FIREBASE_AUTH_DOMAIN=music-app-2024.firebaseapp.com  # Copy from authDomain
VITE_FIREBASE_PROJECT_ID=music-app-2024  # Copy from projectId
VITE_FIREBASE_STORAGE_BUCKET=music-app-2024.appspot.com  # Copy from storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789  # Copy from messagingSenderId
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456  # Copy from appId
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234  # Copy from measurementId
```

### 2.5 Continue to Console

- Click **"Continue to console"**

---

## 🔐 STEP 3: Enable Authentication

### 3.1 Go to Authentication

- In the left sidebar, click **"Authentication"**
- If you see "Get started", click it
- Go to the **"Sign-in method"** tab

### 3.2 Enable Email/Password Authentication

- Click on **"Email/Password"** provider
- Enable the **first toggle** (Email/Password)
- **DO NOT** enable "Email link (passwordless sign-in)" for now
- Click **"Save"**

### 3.3 Enable Google Authentication

- Click on **"Google"** provider
- **Enable** the toggle
- Project support email: Select your email from dropdown
- Click **"Save"**

---

## 🐙 STEP 4: Set Up GitHub Authentication

### 4.1 Create GitHub OAuth App

- Open a new tab and go to: **https://github.com/settings/applications/new**
- Fill in the form:
  - **Application name**: `Music App`
  - **Homepage URL**: `http://localhost:5174`
  - **Application description**: `Music streaming app with Firebase auth`
  - **Authorization callback URL**: `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`

    ⚠️ **IMPORTANT**: Replace `YOUR_PROJECT_ID` with your actual Firebase project ID (e.g., `music-app-2024`)

    Example: `https://music-app-2024.firebaseapp.com/__/auth/handler`

- Click **"Register application"**

### 4.2 Get GitHub Credentials

- After creating the app, you'll see:
  - **Client ID**: Copy this (looks like: `Iv1.a1b2c3d4e5f6g7h8`)
  - **Client secrets**: Click **"Generate a new client secret"**
  - Copy the **Client Secret** (you'll only see this once!)

### 4.3 Configure GitHub in Firebase

- Go back to Firebase Console → Authentication → Sign-in method
- Click on **"GitHub"** provider
- **Enable** the toggle
- **Client ID**: Paste the GitHub Client ID
- **Client secret**: Paste the GitHub Client Secret
- Copy the **Authorization callback URL** shown (should match what you entered in GitHub)
- Click **"Save"**

---

## 🌐 STEP 5: Configure Authorized Domains

### 5.1 Add Development Domain

- In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
- Make sure **`localhost`** is in the list (should be there by default)
- If not, click **"Add domain"** and add `localhost`

---

## 🧪 STEP 6: Test Your Setup

### 6.1 Restart Development Server

```bash
cd music-app
npm run dev
```

### 6.2 Test Authentication

- Go to `http://localhost:5174/login`
- Try each authentication method:
  - **Email/Password**: First create an account via signup page
  - **Google**: Should open Google OAuth popup
  - **GitHub**: Should open GitHub OAuth popup

### 6.3 Check for Errors

- Open browser Developer Tools (F12)
- Check the Console tab for any error messages
- If you see errors, refer to the troubleshooting section below

---

## 🔧 TROUBLESHOOTING

### Common Issues and Solutions:

#### 1. "Firebase: Error (auth/configuration-not-found)"

**Solution**:

- Check that all values in `.env` are correctly copied from Firebase
- Restart your development server after updating `.env`
- Make sure there are no extra spaces in the `.env` values

#### 2. Google popup closes immediately

**Solutions**:

- Verify Google provider is enabled in Firebase Console
- Check that `localhost` is in authorized domains
- Try in incognito/private browsing mode

#### 3. GitHub popup closes immediately

**Solutions**:

- Double-check the GitHub OAuth callback URL matches exactly
- Verify GitHub Client ID and Secret are correct in Firebase
- Make sure GitHub OAuth app is not suspended

#### 4. "Firebase: Error (auth/unauthorized-domain)"

**Solution**:

- Add your domain to authorized domains in Firebase Console
- For development: add `localhost`
- For production: add your actual domain

#### 5. "Firebase: Error (auth/popup-blocked)"

**Solution**:

- Allow popups for your localhost domain
- Try using a different browser
- Check if popup blocker is enabled

---

## 📝 VERIFICATION CHECKLIST

Before testing, make sure you have:

- [ ] Created Firebase project
- [ ] Added web app to Firebase project
- [ ] Copied all config values to `.env` file
- [ ] Enabled Email/Password authentication
- [ ] Enabled Google authentication
- [ ] Created GitHub OAuth app
- [ ] Enabled GitHub authentication with correct credentials
- [ ] Added localhost to authorized domains
- [ ] Restarted development server

---

## 🎉 SUCCESS!

If everything is working correctly, you should be able to:

- Sign up with email/password
- Sign in with email/password
- Sign in with Google (popup opens and completes)
- Sign in with GitHub (popup opens and completes)
- Navigate to the home page after successful login
- See user information in the app

---

## 📞 Need More Help?

If you're still having issues:

1. Check the browser console for specific error messages
2. Verify all steps above are completed exactly
3. Try testing in incognito/private browsing mode
4. Make sure your `.env` file is in the project root directory
5. Ensure no typos in the configuration values

**Common URLs for reference:**

- Firebase Console: `https://console.firebase.google.com/project/YOUR_PROJECT_ID`
- GitHub OAuth Apps: `https://github.com/settings/developers`
- Your app: `http://localhost:5174/login`
