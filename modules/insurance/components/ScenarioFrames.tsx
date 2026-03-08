const SCENE_H = "h-[280px]";

/** Realistic iPhone-style phone frame */
export const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className={`w-full ${SCENE_H} flex items-center justify-center`}>
    <div className="relative h-full" style={{ width: 165, aspectRatio: "auto" }}>
      {/* Phone body — dark titanium with metallic edge */}
      <div className="absolute inset-0 rounded-[28px] bg-[#1a1a1e]"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.08), inset 0 -0.5px 0 rgba(255,255,255,0.03)" }}>

        {/* Metallic frame edge */}
        <div className="absolute inset-0 rounded-[28px] border border-[#3a3a3e]/60" />
        <div className="absolute inset-[0.5px] rounded-[27.5px] border border-white/[0.04]" />

        {/* Side buttons */}
        <div className="absolute -right-[1.5px] top-[65px] w-[2.5px] h-[24px] rounded-l-[1px] bg-[#2a2a2e] shadow-[-1px_0_2px_rgba(0,0,0,0.3)]" />
        <div className="absolute -left-[1.5px] top-[50px] w-[2.5px] h-[13px] rounded-r-[1px] bg-[#2a2a2e] shadow-[1px_0_2px_rgba(0,0,0,0.3)]" />
        <div className="absolute -left-[1.5px] top-[70px] w-[2.5px] h-[13px] rounded-r-[1px] bg-[#2a2a2e] shadow-[1px_0_2px_rgba(0,0,0,0.3)]" />

        {/* Screen area */}
        <div className="absolute inset-[3px] rounded-[25px] overflow-hidden bg-black">
          {/* Screen content bg */}
          <div className="absolute inset-0 bg-[var(--bg-primary,var(--bg-card))]">
            {/* Dynamic island */}
            <div className="flex justify-center pt-[5px] relative z-20">
              <div className="w-[58px] h-[16px] bg-black rounded-full flex items-center justify-between px-2">
                <div className="w-[3px] h-[3px] rounded-full bg-[#1a1a2e]/70" />
                <div className="w-[4px] h-[4px] rounded-full bg-[#0d1f18] ring-[0.5px] ring-[#1a3a2a]/40" />
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 h-[14px] relative z-10">
              <span className="text-[7px] font-semibold text-[var(--text-primary)]">9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex items-end gap-[1px] h-[7px]">
                  {[2.5, 4, 5.5, 7].map((h) => (
                    <div key={h} className="w-[2px] rounded-[0.5px] bg-[var(--text-primary)]" style={{ height: h }} />
                  ))}
                </div>
                <div className="flex items-center">
                  <div className="w-[13px] h-[6.5px] rounded-[1.5px] border border-[var(--text-primary)]/50 p-[1px]">
                    <div className="h-full w-[60%] rounded-[0.5px] bg-[var(--text-primary)]" />
                  </div>
                  <div className="w-[1px] h-[2.5px] rounded-r-[0.5px] bg-[var(--text-primary)]/50 ml-[0.5px]" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="h-[calc(100%-42px)] overflow-hidden">{children}</div>
          </div>

          {/* Screen inner edge shadow */}
          <div className="absolute inset-0 rounded-[25px] pointer-events-none"
            style={{ boxShadow: "inset 0 0 4px rgba(0,0,0,0.15)" }} />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[60px] h-[3px] rounded-full bg-white/15" />
      </div>
    </div>
  </div>
);

/** Browser frame — traffic lights + URL bar */
export const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className={`w-full ${SCENE_H} rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col overflow-hidden shadow-lg`}>
    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] shrink-0">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-[var(--accent-red)]/40" />
        <div className="w-2 h-2 rounded-full bg-[var(--accent-amber)]/40" />
        <div className="w-2 h-2 rounded-full bg-[var(--accent-green,#4ade80)]/40" />
      </div>
      <div className="flex-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] px-2 py-0.5">
        <span className="text-[8px] text-[var(--text-muted)]">{url}</span>
      </div>
    </div>
    <div className="flex-1 overflow-hidden">{children}</div>
  </div>
);

/** Clipboard frame — metal clip at top */
export const ClipboardFrame = ({ children }: { children: React.ReactNode }) => (
  <div className={`w-full ${SCENE_H} relative flex flex-col`}>
    <div className="flex justify-center relative z-10 -mb-1">
      <div className="w-14 h-4 rounded-t-lg border-2 border-b-0 border-[var(--border-default)] bg-[var(--bg-elevated)]" />
    </div>
    <div className="flex-1 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden shadow-lg">
      {children}
    </div>
  </div>
);
