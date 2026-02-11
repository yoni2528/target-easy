"use client";

import { Play, ExternalLink } from "lucide-react";
import type { Instructor } from "../types";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";

const SOCIAL_ICONS: Record<string, { label: string; color: string }> = {
  instagram: { label: "Instagram", color: "#E4405F" },
  facebook: { label: "Facebook", color: "#1877F2" },
  youtube: { label: "YouTube", color: "#FF0000" },
};

export function VideoSection({ instructor }: { instructor: Instructor }) {
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);
  const hasVideos = instructor.videos && instructor.videos.length > 0;
  const hasSocial = instructor.socialLinks && Object.values(instructor.socialLinks).some(Boolean);

  if (!hasVideos && !hasSocial) return null;

  return (
    <div className="px-4 mt-5">
      {/* Videos */}
      {hasVideos && (
        <>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Play className="w-4 h-4 text-[var(--accent-red)]" />
            {t("demoVideos")}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {instructor.videos!.map((video) => (
              <div key={video.id} className="relative flex-shrink-0 w-56 rounded-xl overflow-hidden border border-[var(--border-subtle)] group cursor-pointer">
                <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-[var(--bg-primary)] ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-[10px] text-white font-medium truncate">{video.title}</p>
                  <p className="text-[8px] text-white/60 capitalize">{video.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Social Links */}
      {hasSocial && (
        <div className="flex gap-2 mt-3">
          {Object.entries(instructor.socialLinks!).map(([platform, url]) => {
            if (!url) return null;
            const info = SOCIAL_ICONS[platform];
            if (!info) return null;
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--border-default)] transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {info.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
