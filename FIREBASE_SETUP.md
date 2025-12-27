# Firebase Authentication Setup Guide

This guide will help you configure Firebase authentication for the music app.

## Prerequisites

- Google account
- GitHub account (for GitHub authentication)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: `music-app` (or your preferred name)
4. Choose whether to enable Google Analytics (optional)
5. Click **"Create project"**
6. Wait for project creation to complete

## Step 2: Add Web App

1. In your Firebase project dashboard, click the **web icon** `</>` to add a web app
2. Enter app nickname: `music-app-web`
3. **Don't** check "Also set up Firebase Hosting" for now
4. Click **"Register app"**
5. Copy the configuration object that appears:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX",
};
```

6. Update your `.env` file with these values:
   - `VITE_FIREBASE_API_KEY` = apiKey
   - `VITE_FIREBASE_AUTH_DOMAIN` = authDomain
   - `VITE_FIREBASE_PROJECT_ID` = projectId
   - `VITE_FIREBASE_STORAGE_BUCKET` = storageBucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID` = messagingSenderId
   - `VITE_FIREBASE_APP_ID` = appId
   - `VITE_FIREBASE_MEASUREMENT_ID` = measurementId

## Step 3: Enable Authentication Methods

### Enable Email/Password Authentication

1. In Firebase Console, go to **"Authentication"** → **"Sign-in method"**
2. Click on **"Email/Password"**
3. Enable the first toggle (Email/Password)
4. Click **"Save"**

### Enable Google Authentication

1. In the same "Sign-in method" tab, click on **"Google"**
2. Enable the toggle
3. Select your project support email
4. Click **"Save"**

### Enable GitHub Authentication

1. First, create a GitHub OAuth App:
   - Go to [GitHub Developer Settings](https://github.com/settings/applications/new)
   - Application name: `Music App`
   - Homepage URL: `http://localhost:5174`
   - Authorization callback URL: `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`
   - Click **"Register application"**
   - Copy the **Client ID** and generate a **Client Secret**

2. Back in Firebase Console, click on **"GitHub"**
3. Enable the toggle
4. Paste the **Client ID** and **Client Secret** from GitHub
5. Copy the **Authorization callback URL** shown and make sure it matches what you entered in GitHub
6. Click **"Save"**

## Step 4: Configure Authorized Domains

1. In Firebase Console, go to **"Authentication"** → **"Settings"** → **"Authorized domains"**
2. Make sure `localhost` is in the list (it should be by default)
3. When you deploy to production, add your production domain here

## Step 5: Test the Setup

1. Save all your changes
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to `http://localhost:5174/login`
4. Test each authentication method:
   - Email/Password: Create a new account first via the signup page
   - Google: Should open Google OAuth popup
   - GitHub: Should open GitHub OAuth popup

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that all environment variables in `.env` are correctly set
   - Restart your dev server after updating `.env`

2. **Google popup closes immediately**
   - Verify Google provider is enabled in Firebase Console
   - Check that your domain is in authorized domains

3. **GitHub popup closes immediately**
   - Verify GitHub OAuth app callback URL matches Firebase exactly
   - Check that GitHub provider is enabled with correct Client ID/Secret

4. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase Console

### Getting Help:

- Check browser console for detailed error messages
- Verify all steps above are completed
- Make sure `.env` file is in the project root and properly formatted

## Security Notes

- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file
- Use different Firebase projects for development and production
- Regularly rotate your API keys and secrets
