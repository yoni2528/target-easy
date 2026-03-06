"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-8"
          style={{ fontFamily: "var(--font-heebo)" }}
        >
          ראו את המערכת בפעולה
        </h2>

        <div className="relative rounded-2xl overflow-hidden border border-[var(--border-default)] shadow-2xl shadow-black/40 bg-[var(--bg-card)]">
          <video
            ref={videoRef}
            src="/videos/showcase.mp4"
            className="w-full aspect-video"
            controls={isPlaying}
            playsInline
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />

          {/* Play overlay */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--accent-green)] flex items-center justify-center shadow-lg shadow-[var(--accent-green)]/30 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-[var(--bg-primary)] ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
