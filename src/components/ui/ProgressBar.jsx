export default function ProgressBar({
  progress,
  setProgress,
<<<<<<< HEAD
  duration, 
=======
  duration,
>>>>>>> 8cb3f65 (ui changes)
  audioRef,
}) {
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const percent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="w-full flex items-center gap-3 text-sm text-gray-400">
      <span className="w-10 text-right">{formatTime(progress)}</span>

      <div className="relative flex-1 h-2 bg-neutral-700 rounded-full">
        <div
          className="absolute h-2 bg-green-500 rounded-full"
          style={{ width: `${percent}%` }}
        />

        <div
          className="absolute top-1/2 w-4 h-4 bg-green-400 rounded-full -translate-y-1/2"
          style={{ left: `calc(${percent}% - 8px)` }}
        />

        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={(e) => {
            const value = Number(e.target.value);
            setProgress(value);
            if (audioRef.current != value) {
              audioRef.current.currentTime = value;
            }
          }}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <span className="w-10">{formatTime(duration)}</span>
    </div>
  );
}
