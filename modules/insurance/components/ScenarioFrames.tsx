const SCENE_H = "h-[280px]";

/** Realistic phone frame — dark body, dynamic island, side buttons */
export const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className={`w-full ${SCENE_H} relative`}>
    {/* Phone body */}
    <div className="absolute inset-0 rounded-[2.5rem] bg-[#1c1c1e] shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* Side buttons */}
      <div className="absolute -right-[2px] top-[72px] w-[3px] h-[28px] rounded-l-sm bg-[#2c2c2e]" />
      <div className="absolute -left-[2px] top-[56px] w-[3px] h-[16px] rounded-r-sm bg-[#2c2c2e]" />
      <div className="absolute -left-[2px] top-[80px] w-[3px] h-[16px] rounded-r-sm bg-[#2c2c2e]" />

      {/* Screen */}
      <div className="absolute inset-[3px] rounded-[2.2rem] overflow-hidden bg-[var(--bg-primary,var(--bg-card))]">
        {/* Dynamic island */}
        <div className="flex justify-center pt-[6px] pb-0 relative z-20">
          <div className="w-[76px] h-[20px] bg-black rounded-full flex items-center justify-between px-2.5">
            <div className="w-[4px] h-[4px] rounded-full bg-[#1a2a3a]/60" />
            <div className="w-[5px] h-[5px] rounded-full bg-[#0d2818] ring-1 ring-[#1a4a3a]/30" />
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 h-[18px] relative z-10">
          <span className="text-[9px] font-semibold text-[var(--text-primary)]">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[1.5px] h-[9px]">
              {[3, 5, 7, 9].map((h) => (
                <div key={h} className="w-[2.5px] rounded-sm bg-[var(--text-primary)]" style={{ height: h }} />
              ))}
            </div>
            <div className="flex items-center">
              <div className="w-[16px] h-[8px] rounded-[2px] border border-[var(--text-primary)]/60 p-[1.5px]">
                <div className="h-full w-[65%] rounded-[1px] bg-[var(--text-primary)]" />
              </div>
              <div className="w-[1.5px] h-[3px] rounded-r-sm bg-[var(--text-primary)]/60 ml-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-50px)] overflow-hidden">{children}</div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[90px] h-[4px] rounded-full bg-white/15 z-10" />
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
