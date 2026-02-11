"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Crosshair, AlertCircle } from "lucide-react";
import { useAuthStore } from "../lib/auth-store";

export function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const success = login(name, password);
    if (success) {
      const user = useAuthStore.getState().user;
      router.push(user?.role === "admin" ? "/admin" : "/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Crosshair className="w-10 h-10 text-[var(--accent-green)] mb-3" strokeWidth={1.5} />
          <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-rubik)" }}>
            <span className="text-[var(--accent-green)]">Target</span>
            <span className="text-[var(--text-primary)]">-Easy</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">כניסה למדריכים ומנהלים</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">שם משתמש</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors"
              placeholder="שם מלא או מזהה"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors"
              placeholder="סיסמה"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-[var(--accent-red)]">
              <AlertCircle className="w-3.5 h-3.5" />
              שם משתמש או סיסמה שגויים
            </div>
          )}

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <LogIn className="w-4 h-4" />
            התחבר
          </button>
        </form>

        <div className="mt-6 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <p className="text-[10px] text-[var(--text-muted)] text-center mb-2">משתמשי דמו:</p>
          <div className="space-y-1 text-[10px] text-[var(--text-secondary)]">
            <p><strong>מנהל:</strong> יוני (מנהל) / admin123</p>
            <p><strong>מדריך:</strong> דוד כהן / 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
