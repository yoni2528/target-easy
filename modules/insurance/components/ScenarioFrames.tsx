const SCENE_H = "h-[280px]";

/** Phone frame — dynamic island + home indicator */
export const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className={`w-full ${SCENE_H} rounded-[2rem] bg-[var(--bg-card)] border-2 border-[var(--border-default)] flex flex-col overflow-hidden shadow-lg`}>
    <div className="flex justify-center pt-2 pb-1 shrink-0">
      <div className="w-16 h-[5px] rounded-full bg-[var(--border-default)]" />
    </div>
    <div className="flex-1 overflow-hidden mx-1.5">{children}</div>
    <div className="flex justify-center py-1.5 shrink-0">
      <div className="w-20 h-[3px] rounded-full bg-[var(--border-default)]" />
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
