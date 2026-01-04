import { Play, Pause, Shuffle, Heart } from "lucide-react";
import { useParams, useOutletContext } from "react-router-dom";
import ArtistSongs from "../components/Hooks/DetailArtistApi";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../firebase/favorites";
import { useEffect, useState } from "react";
import Loader from "../components/ui/Loader";

export default function ArtistPage() {
  const { id } = useParams();

  // GLOBAL PLAYER STATE
  const { ids, setIds, mainId, setMainId, isPlay, setIsPlay } =
    useOutletContext();

  const artist = ArtistSongs(id);
  const sdata = artist?.data;

  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    getFavorites().then(setLikedIds);
  }, []);

  if (!sdata) return <Loader songsCount={sdata?.songs?.length || 10} />;

  const artistSongIds = sdata.topSongs.map((song) => song.id);

  const isSameArtist = ids.length && artistSongIds.includes(ids[mainId]);

  return (
    <div className="p-0 sm:p-5 mb-20">
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
                if (!isSameArtist) {
                  setIds(artistSongIds);
                  setMainId(0);
                  setIsPlay(true);
                } else {
                  setIsPlay((prev) => !prev);
                }
              }}
              className="flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full font-medium hover:bg-green-600"
            >
              {isPlay && isSameArtist ? (
                <Pause size={16} className="text-white" />
              ) : (
                <Play size={16} className="text-white" />
              )}
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

      {sdata.topSongs.map((song, index) => {
        const isCurrentSong = isSameArtist && mainId === index && isPlay;

        return (
          <div
            key={song.id}
            className={`group grid grid-cols-[40px_1fr_40px_80px] items-center p-0 sm:p-5 py-3 my-2 rounded-lg cursor-pointer
              ${isCurrentSong ? "bg-white/10" : "hover:bg-white/10"}`}
          >
            <div className="relative flex items-center justify-center w-2 sm:w-8 text-gray-400">
              {!isCurrentSong && (
                <span className="group-hover:opacity-0 transition">
                  {index + 1}
                </span>
              )}

              <span
                onClick={() => {
                  setIds(artistSongIds);
                  setMainId(index);
                  setIsPlay(true);
                }}
                className={`absolute transition ${
                  isCurrentSong
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {isCurrentSong ? <Pause size={16} /> : <Play size={16} />}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={song.image?.[2]?.url}
                alt={song.name}
                className="w-10 h-10 rounded-md"
              />
              <div>
                <p className="font-medium">{song.name}</p>
                <p className="text-sm text-gray-400">
                  {song.artists?.primary?.[0]?.name}
                </p>
              </div>
            </div>

            <Heart
              size={18}
              onClick={async () => {
                if (likedIds.includes(song.id)) {
                  await removeFavorite(song.id);
                  setLikedIds((prev) => prev.filter((id) => id !== song.id));
                } else {
                  await addFavorite(song.id);
                  setLikedIds((prev) => [...prev, song.id]);
                }
              }}
              className={`cursor-pointer ${
                likedIds.includes(song.id)
                  ? "ml-6 sm:ml-0 text-green-500 fill-green-500"
                  : "ml-6 sm:ml-0 text-gray-400 hover:text-green-500"
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
