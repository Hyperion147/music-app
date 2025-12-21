# music-app

# 🎵 React Music App

A modern **Music Streaming Web App** built using **React.js** with **Firebase** as the backend (BaaS).  
It allows users to explore, play, and manage their favorite songs and playlists — all in a sleek, responsive UI.

🔗 **Live Example:** [https://music.anmol.pro/](https://music.anmol.pro/)

---

## 🚀 Features

- **User Authentication** – Secure login/signup using Firebase Auth (Email/Password and OAuth options).
- **Music Player** – Full music player with play, pause, skip, volume control, and progress tracking.
- **Playlists** – Users can create custom playlists and add/remove songs easily.
- **Favorites** – Mark and manage favorite songs for quick access.
- **Song Preview** – Short audio preview feature for each track.
- **Categorized Sections** – Browse by genre, artist, trending, or newly added music.
- **Responsive UI** – Seamlessly adapts to desktop and mobile devices.

---

## 🧰 Tech Stack

| Category             | Technology / Library                                          |
| -------------------- | ------------------------------------------------------------- |
| **Frontend**         | React.js, React Router DOM, Tailwind CSS / Shadcn UI          |
| **State Mgmt**       | Context API or Zustand / Redux (your choice)                  |
| **Backend (BaaS)**   | Firebase Authentication, Firestore Database, Firebase Storage |
| **Deployment**       | Vercel / Firebase Hosting                                     |
| **Additional Tools** | React Hooks, Framer Motion (for animations), ESLint, Prettier |

---

## 📦 Installation & Setup

1. **Clone the repository**

2. **Install dependencies**

3. **Create Firebase project**

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project and enable:
  - Authentication (Email/Password or OAuth)
  - Firestore Database
  - Storage (for music files or album art)

4. **Add `.env` file** <br />
   REACT_APP_FIREBASE_API_KEY=your_api_key <br />
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain <br />
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id <br />
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket <br />
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id <br />
   REACT_APP_FIREBASE_APP_ID=your_app_id <br />

5. **Run the project**
   npm start

## 🧩 Folder Structure <br />

root/ <br />
├── src/ <br />
│ ├── components/ # Shared UI components <br />
│ ├── pages/ # Main pages (Home, Login, Library, etc.) <br />
│ ├── context/ # Auth and player context providers <br />
│ ├── services/ # Firebase configuration & API helpers <br />
│ ├── assets/ # Images, icons, etc. <br />
│ ├── App.jsx <br />
│ └── main.jsx <br />
├── public/ <br />
├── .env <br />
├── package.json <br />
└── README.md <br />

---

## 🎧 Inspiration

This project is inspired by clean, minimalist music platforms such as  
[**music.anmol.pro**](https://music.anmol.pro/) — check it out for UI and UX reference.

---

## 🛠️ Future Enhancements

- Dark/Light theme toggle
- User-uploaded songs
- Podcast section
- Lyrics and song info integration
- Playlist sharing features

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
Before making major changes, please open an issue to discuss your idea.
