# 🎵 MusicFlow - Modern Music Streaming App

A beautiful, responsive **Music Streaming Web Application** built with **React.js** and **Firebase**. Stream music, create playlists, and discover new artists with a sleek, modern interface.

![MusicFlow](https://img.shields.io/badge/MusicFlow-v1.0.0-brightgreen)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-orange)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.1.18-cyan)

## ✨ Features

### 🎵 **Core Music Features**

- **Full Music Player** - Play, pause, skip, volume control, and progress tracking
- **Playlist Management** - Create, edit, and organize custom playlists
- **Favorites System** - Save and manage your favorite songs
- **Genre Browsing** - Explore music by different genres
- **Artist Discovery** - Browse popular artists and their top songs
- **Search Functionality** - Find songs, artists, and albums quickly

### 🔐 **User Management**

- **Firebase Authentication** - Secure login/signup with email/password
- **User Profiles** - Personalized user experience
- **Protected Routes** - Secure access to user-specific content

### 📱 **Modern UI/UX**

- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **Dark Theme** - Beautiful dark interface optimized for music listening
- **Smooth Animations** - Powered by Framer Motion
- **Touch-Friendly** - Optimized for mobile interactions
- **Accessible** - Built with accessibility best practices

## 🛠️ Tech Stack

| Category             | Technology                                    |
| -------------------- | --------------------------------------------- |
| **Frontend**         | React 19, React Router DOM, Tailwind CSS      |
| **Backend**          | Firebase (Authentication, Firestore, Storage) |
| **State Management** | React Context API                             |
| **Styling**          | Tailwind CSS, Shadcn/UI Components            |
| **Animations**       | Framer Motion                                 |
| **Icons**            | Lucide React                                  |
| **Build Tool**       | Vite                                          |
| **Code Quality**     | ESLint, Prettier, Husky                       |

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/musicflow.git
   cd musicflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config

4. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your Firebase configuration.

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
musicflow/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   └── sidebar.jsx     # Navigation sidebar
│   ├── pages/              # Main application pages
│   │   ├── Home.jsx        # Home dashboard
│   │   ├── SearchPage.jsx  # Search functionality
│   │   ├── PlaylistsPage.jsx # Playlist management
│   │   └── ...
│   ├── context/            # React Context providers
│   │   ├── FirebaseContext.jsx
│   │   ├── MusicContext.jsx
│   │   └── PlaylistContext.jsx
│   ├── services/           # External service integrations
│   │   └── firebase.js     # Firebase configuration
│   ├── utils/              # Utility functions
│   └── App.jsx             # Main application component
├── public/                 # Static assets
├── docs/                   # Documentation files
└── README.md
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Add your web app and copy the config
5. Update your `.env` file with the Firebase config

For detailed setup instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 📱 Responsive Design

MusicFlow is built with a mobile-first approach:

- **Mobile** (< 640px): Single column layout, hamburger menu
- **Tablet** (640px - 1024px): Optimized for touch interactions
- **Desktop** (> 1024px): Full sidebar navigation, multi-column layouts

## 🎨 Features Showcase

### Music Player

- Responsive player bar with essential controls
- Volume control (desktop) / Add to playlist (mobile)
- Progress tracking and seeking
- Skip previous/next functionality

### Playlist Management

- Create and name custom playlists
- Add/remove songs from playlists
- Visual playlist cards with gradients
- Individual playlist detail pages

### User Experience

- Smooth page transitions
- Loading states and error handling
- Touch-friendly interface
- Keyboard navigation support

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

If you have any questions or need help with setup, please:

- Check the [Firebase Setup Guide](./FIREBASE_SETUP.md)
- Open an issue on GitHub
- Contact the maintainers

---

**Made with ❤️ by the MusicFlow team**
