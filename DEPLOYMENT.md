# 🚀 Deployment Guide

This guide covers deploying MusicFlow to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Firebase project set up and configured
- [ ] Build process working (`npm run build`)
- [ ] All sensitive data removed from code
- [ ] `.env` file added to `.gitignore`
- [ ] Production Firebase config ready

## 🔧 Environment Setup

### 1. Create Production Environment File

```bash
cp .env.example .env.production
```

### 2. Update Firebase Config for Production

- Create a production Firebase project (or use existing)
- Update authorized domains in Firebase Console
- Add production domain to Firebase Authentication settings

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from your `.env` file:
     ```
     VITE_FIREBASE_API_KEY=your_production_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_production_domain
     VITE_FIREBASE_PROJECT_ID=your_production_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_production_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
     VITE_FIREBASE_APP_ID=your_production_app_id
     VITE_FIREBASE_MEASUREMENT_ID=your_production_measurement_id
     ```

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Custom domain can be configured in project settings

### Option 2: Firebase Hosting

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login and Initialize**

   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**

   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Option 3: Netlify

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**
   - In site settings, go to "Environment variables"
   - Add all Firebase config variables

4. **Deploy**
   - Netlify will automatically deploy on push to main branch

## 🔒 Security Considerations

### Firebase Security Rules

Update your Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Public read access for songs, artists, genres
    match /songs/{songId} {
      allow read: if true;
      allow write: if false; // Only admin can write
    }

    match /artists/{artistId} {
      allow read: if true;
      allow write: if false;
    }

    match /genres/{genreId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### Environment Variables

- Never commit `.env` files to version control
- Use different Firebase projects for development and production
- Regularly rotate API keys and secrets

## 🔍 Post-Deployment Testing

1. **Authentication Flow**
   - [ ] User registration works
   - [ ] User login works
   - [ ] Password reset works
   - [ ] Protected routes are secure

2. **Core Functionality**
   - [ ] Music player works
   - [ ] Playlist creation/management works
   - [ ] Search functionality works
   - [ ] Responsive design on mobile/tablet/desktop

3. **Performance**
   - [ ] Page load times are acceptable
   - [ ] Images load properly
   - [ ] No console errors
   - [ ] Lighthouse score > 90

## 🐛 Troubleshooting

### Common Issues

**Build Fails**

- Check for TypeScript/ESLint errors
- Ensure all dependencies are installed
- Verify environment variables are set

**Firebase Connection Issues**

- Verify Firebase config is correct
- Check authorized domains in Firebase Console
- Ensure Firebase services are enabled

**Routing Issues**

- Configure redirects for SPA routing
- Check that all routes are properly defined

### Debug Commands

```bash
# Check build locally
npm run build
npm run preview

# Check for linting issues
npm run lint

# Test Firebase connection
npm run dev
```

## 📊 Monitoring

### Analytics Setup

- Enable Google Analytics in Firebase
- Set up custom events for user interactions
- Monitor user engagement and retention

### Error Tracking

Consider adding error tracking:

- Sentry for error monitoring
- LogRocket for session replay
- Firebase Crashlytics for crash reporting

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          # ... other environment variables

      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

**Need help?** Check the main [README.md](./README.md) or open an issue on GitHub.
