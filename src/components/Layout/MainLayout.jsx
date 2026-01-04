import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../sidebar.jsx";
import PlayerBar from "../ui/PlayerBar.jsx";
import SearchBar from "../ui/SearchBar.jsx";

export default function MainLayout() {
  const [ids, setIds] = useState([]);
  const [mainId, setMainId] = useState(null);
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex-1 md:ml-64 pb-28 pt-5 overflow-y-auto">
        <div className="px-6 md:px-10 mb-6">
          <SearchBar />
        </div>

        <div className="px-6 md:px-10">
          <Outlet
            context={{
              ids,
              setIds,
              mainId,
              setMainId,
              isPlay,
              setIsPlay,
            }}
          />
        </div>
      </div>

      {mainId !== null && (
        <PlayerBar
          mainId={mainId}
          value={ids}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          setMainId={setMainId}
        />
      )}
    </div>
  );
}
