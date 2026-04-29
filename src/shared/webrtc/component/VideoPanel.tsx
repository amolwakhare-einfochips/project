import { useEffect, useRef, memo } from "react";

type VideoPanelProps = {
  stream: MediaStream | null;
  label: string;
  subLabel: string;
  isLocal?: boolean;
  error?: string | null;
};

function VideoPanelComponent({ stream, label, subLabel, isLocal = false, error }: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(() => {});
    }
  }, [stream]);

  return (
    <div
      className="
        relative
        rounded-2xl
        h-72
        flex
        items-center
        justify-center
        overflow-hidden
        bg-black
        border
        border-green-500/30
      "
    >
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className="w-full h-full object-cover"
        />
      ) : error ? (
        <div className="text-center text-red-400 px-4">
          <div className="text-3xl mb-2">🚫</div>

          <div className="font-semibold">{error}</div>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <div className="text-3xl mb-2">{isLocal ? "📷" : "👤"}</div>

          <div>{label}</div>
        </div>
      )}

      <div
        className="
          absolute
          bottom-2
          left-2
          text-xs
          bg-black/70
          px-2
          py-1
          rounded
        "
      >
        {subLabel}
      </div>
    </div>
  );
}

export const VideoPanel = memo(VideoPanelComponent);
