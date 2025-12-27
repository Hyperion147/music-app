export default function ProgressBar({
  progress,
  setProgress,
  duration,
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
    <div className="w-full flex items-center gap-2 text-xs text-gray-400">
      <span className="w-8 text-right">{formatTime(progress)}</span>

      <div className="relative flex-1 h-1 bg-neutral-700 rounded-full">
        <div
          className="absolute h-1 bg-green-500 rounded-full"
          style={{ width: `${percent}%` }}
        />

        <div
          className="absolute top-1/2 w-3 h-3 bg-green-400 rounded-full -translate-y-1/2"
          style={{ left: `calc(${percent}% - 6px)` }}
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

      <span className="w-8">{formatTime(duration)}</span>
    </div>
  );
}
