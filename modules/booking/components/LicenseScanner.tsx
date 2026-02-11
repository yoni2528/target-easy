"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X, Loader2, ScanLine } from "lucide-react";

interface LicenseScannerProps {
  onResult: (data: LicenseScanResult) => void;
  onClose: () => void;
}

export interface LicenseScanResult {
  firstName?: string;
  lastName?: string;
  idNumber?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  weaponType?: string;
  serialNumber?: string;
  caliber?: string;
}

export function LicenseScanner({ onResult, onClose }: LicenseScannerProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (_file: File) => {
    setProcessing(true);
    setError(null);

    // Mock OCR result (in production, this would call /api/ocr/license)
    await new Promise((r) => setTimeout(r, 2000));

    const mockResult: LicenseScanResult = {
      firstName: "ישראל",
      lastName: "ישראלי",
      idNumber: "123456789",
      licenseNumber: "98765",
      licenseExpiry: "2027-06-30",
      weaponType: "אקדח",
      serialNumber: "GL19-45678",
      caliber: "9mm",
    };

    setProcessing(false);
    onResult(mockResult);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <ScanLine className="w-4 h-4 text-[var(--accent-green)]" />
            סריקת רישיון נשק
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {processing ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-10 h-10 text-[var(--accent-green)] animate-spin mb-3" />
            <p className="text-sm text-[var(--text-secondary)]">מעבד את התמונה...</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">זיהוי טקסט ומילוי אוטומטי</p>
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <p className="text-sm text-[var(--accent-red)]">{error}</p>
            <button onClick={() => setError(null)} className="mt-3 text-xs text-[var(--accent-green)]">נסה שוב</button>
          </div>
        ) : (
          <>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              צלם או העלה תמונה של רישיון הנשק שלך. המערכת תזהה את הפרטים אוטומטית.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed border-[var(--border-default)] hover:border-[var(--accent-green)]/40 transition-colors"
              >
                <Upload className="w-6 h-6 text-[var(--accent-green)]" />
                <span className="text-xs font-medium text-[var(--text-secondary)]">העלה תמונה</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed border-[var(--border-default)] hover:border-[var(--accent-blue)]/40 transition-colors"
              >
                <Camera className="w-6 h-6 text-[var(--accent-blue)]" />
                <span className="text-xs font-medium text-[var(--text-secondary)]">פתח מצלמה</span>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleUpload}
              className="hidden"
            />
          </>
        )}
      </div>
    </div>
  );
}
