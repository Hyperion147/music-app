import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function VolumeControl({ volume, setVolume, audioRef }) {
  const [isvloume, setIsVolume] = useState(false);

  const handlemute = () => {
    setIsVolume(!isvloume);

    if (isvloume == false) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div onClick={handlemute}>
        {isvloume ? (
          <div>
            <VolumeX className="w-4 h-4" />
          </div>
        ) : (
          <div>
            {volume >= 50 && volume <= 100 ? (
              <Volume2 className="w-4 h-4" />
            ) : volume >= 1 && volume <= 50 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </div>
        )}
      </div>

      <div className="relative w-20 h-1 bg-neutral-700 rounded-full">
        <div
          className="absolute h-1 bg-[#00FF88] rounded-full"
          style={{ width: `${volume}%` }}
        />

        <div
          className="absolute top-1/2 w-3 h-3 bg-[#00FF88] rounded-full -translate-y-1/2"
          style={{ left: `calc(${volume}% - 6px)` }}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
