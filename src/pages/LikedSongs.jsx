import { Play, Pause, Heart } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import LikedSongApi from "../components/Hooks/LikedSongApi";
import { removeFavorite, getFavorites } from "../firebase/favorites";
import Loader from "../components/ui/Loader";

export default function LikedSongs() {
  const { ids, setIds, mainId, setMainId, isPlay, setIsPlay } =
    useOutletContext();

  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    getFavorites().then(setLikedIds);
  }, []);

  const { data: likedSongs, loading } = LikedSongApi(likedIds);

  if (loading) return <Loader />;

  if (!likedSongs.length)
    return <p className="p-8 text-muted-foreground">No liked songs</p>;

  const songIds = likedSongs.map((s) => s.id);
  const isSameList = ids.length && songIds.includes(ids[mainId]);

  const handlePlayAll = () => {
    if (!isSameList) {
      setIds(songIds);
      setMainId(0);
      setIsPlay(true);
    } else {
      setIsPlay((p) => !p);
    }
  };

  return (
    <div className="p-0 sm:p-5 mb-10">
      <div className="flex flex-row md:flex-row gap-6 py-10 items-end">
        <div
          className="
            w-56 h-56 
            bg-linear-to-br from-neon-green to-neon-green-hover
            flex items-center justify-center shadow-2xl rounded-2xl
          "
        >
          <Heart className="w-24 h-24 text-primary-foreground fill-primary-foreground" />
        </div>

        <div className="flex flex-col justify-end">
          <p className="uppercase text-sm text-muted-foreground">Playlist</p>
          <h1 className="text-4xl md:text-6xl font-bold">Liked Songs</h1>
          <p className="text-gray-400 mt-2">{likedSongs.length} songs</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePlayAll}
              className="flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full font-medium hover:bg-green-600"
            >
              {isPlay && isSameList ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[40px_1fr_40px_80px] text-gray-400 text-sm px-0 sm:px-5 pb-2 border-b border-white/10">
        <span>#</span>
        <span>Title</span>
        <span></span>
        <span className="text-right">Time</span>
      </div>

      {likedSongs.map((song, index) => {
        const isCurrent = isSameList && mainId === index && isPlay;

        return (
          <div
            key={song.id}
            className={`group grid grid-cols-[40px_1fr_40px_80px] items-center p-0 sm:p-5 py-3 my-2  rounded-lg cursor-pointer
              ${isCurrent ? "bg-white/10" : "hover:bg-white/10"}`}
          >
            {/* INDEX / PLAY */}
            <div className="relative flex items-center justify-center w-2 sm:w-8 text-gray-400">
              {!isCurrent && (
                <span className="group-hover:opacity-0 transition">
                  {index + 1}
                </span>
              )}

              <span
                onClick={() => {
                  setIds(songIds);
                  setMainId(index);
                  setIsPlay(true);
                }}
                className={`absolute transition ${isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                {isCurrent ? <Pause size={16} /> : <Play size={16} />}
              </span>
            </div>

            <div>
              <p className="font-medium truncate">{song.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {song.artists?.primary?.[0]?.name}
              </p>
            </div>

            <Heart
              size={18}
              onClick={async () => {
                await removeFavorite(song.id);
                setLikedIds((prev) => prev.filter((id) => id !== song.id));
              }}
              className={`cursor-pointer ml-6 sm:ml-0 ${
                likedIds.includes(song.id)
                  ? "text-green-500 fill-green-500"
                  : "text-gray-400 hover:text-green-500"
              }`}
            />

            <span className="text-right text-gray-400">
              {Math.floor(song.duration / 60)}:
              {(song.duration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
