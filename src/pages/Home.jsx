import { useAuth } from "../context/FirebaseContext";
import { Button } from "@/components/shad/button";
import { LogOut, Music } from "lucide-react";
import { Sidebar } from "../components/sidebar";
function Home() {
  const { user, logout } = useAuth();

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-background text-foreground p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Music className="text-neon-green h-8 w-8" />
            <h1 className="text-2xl font-bold">MusicFlow</h1>
          </div>

          <div className="flex items-center gap-4"></div>
        </header>

        <main>
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-neon-green">
              Welcome Back!
            </h2>
            <p className="text-muted-foreground">
              You are successfully logged in. Start exploring your favorite
              tracks.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
