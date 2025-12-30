import { Play, Pause, Shuffle, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtistSongs from "../components/Hooks/DetailArtistApi";
import PlayerBar from "../components/ui/PlayerBar";
import { Sidebar } from "../components/sidebar";

export default function ArtistPage() {
  const { id } = useParams();

  const [ids, setIds] = useState([]);
  const [playId, setPlayId] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [mainId, setMainId] = useState(null);

  const artist = ArtistSongs(id);
  const sdata = artist?.data;

  useEffect(() => {
    if (sdata?.topSongs) {
      setIds(sdata.topSongs.map((song) => song.id));
    }
  }, [sdata]);

  useEffect(() => {
    if (!playId || ids.length === 0) return;
    const index = ids.indexOf(playId);
    if (index !== -1) setMainId(index);
  }, [playId, ids]);

  if (!sdata) {
    return (
      <div className="p-8 ml-64">
        <Sidebar />
        <p>Loading Artist...</p>
      </div>
    );
  }

  return (
    <div className="p-8 ml-64">
      <Sidebar />

      <div className="flex flex-col md:flex-row gap-6 py-10">
        <img
          src={sdata.image?.[2]?.url}
          alt={sdata.name}
          className="w-56 h-56 rounded-full shadow-lg"
        />

        <div className="flex flex-col justify-end">
          <p className="uppercase text-sm text-gray-400">Artist</p>
          <h1 className="text-4xl md:text-6xl font-bold">{sdata.name}</h1>
          <p className="text-gray-400 mt-2">{sdata.followerCount} followers</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                if (mainId === null && ids.length > 0) {
                  setMainId(0);
                  setPlayId(ids[0]);
                }
                setIsPlay((prev) => !prev);
              }}
              className="flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full font-medium hover:bg-green-600"
            >
              {isPlay ? (
                <Pause size={16} className="text-white" />
              ) : (
                <Play size={16} className="text-white" />
              )}
            </button>

            <button className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full hover:bg-white/30">
              <Shuffle size={18} /> Shuffle
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-[40px_1fr_40px_80px] text-gray-400 text-sm px-5 pb-2 border-b border-white/10">
          <span>#</span>
          <span>Title</span>
          <span></span>
          <span className="text-right">Time</span>
        </div>

        {sdata.topSongs.map((song, index) => (
          <div
            key={song.id}
            className={`group grid grid-cols-[40px_1fr_40px_80px] items-center px-5 py-3 my-2 rounded-lg cursor-pointer
              ${mainId === index ? "bg-white/10" : "hover:bg-white/10"}
            `}
          >
            <div className="relative flex items-center justify-center text-gray-400">
              <span
                className={`mr-7 transition
                  ${mainId === index ? "opacity-0" : "group-hover:opacity-0"}
                `}
              >
                {index + 1}
              </span>

              <span
                onClick={() => {
                  setPlayId(song.id);
                  setIsPlay((prev) => (mainId === index ? !prev : true));
                }}
                className={`absolute mr-7 transition
                  ${
                    mainId === index
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                `}
              >
                {mainId === index && isPlay ? (
                  <Pause size={16} />
                ) : (
                  <Play size={16} />
                )}
              </span>
            </div>

            <div>
              <p className="font-medium">{song.name}</p>
              <p className="text-sm text-gray-400">
                {song.artists?.primary?.[0]?.name}
              </p>
            </div>

            <Heart size={18} className="text-gray-400 hover:text-green-500" />

            <span className="text-right text-gray-400">
              {Math.floor(song.duration / 60)}:
              {(song.duration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        ))}

        <PlayerBar
          mainId={mainId}
          value={ids}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          setMainId={setMainId}
        />
      </div>
    </div>
  );
}
