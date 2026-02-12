"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Upload, FileCheck, Clock, CheckCircle, XCircle, File, AlertTriangle } from "lucide-react";
import { useAuthStore } from "@/modules/auth";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";
import { BottomNav } from "@/components/BottomNav";

interface UploadedDoc {
  id: string;
  name: string;
  type: "license" | "certificate" | "insurance";
  status: "uploading" | "processing" | "approved" | "rejected";
  uploadedAt: string;
  message?: string;
}

const DOC_TYPES = [
  { id: "license" as const, labelKey: "verifyLicense" as const, descKey: "verifyLicenseDesc" as const, icon: FileCheck },
  { id: "certificate" as const, labelKey: "verifyCertificate" as const, descKey: "verifyCertificateDesc" as const, icon: ShieldCheck },
  { id: "insurance" as const, labelKey: "verifyInsurance" as const, descKey: "verifyInsuranceDesc" as const, icon: File },
];

function simulateVerification(doc: UploadedDoc, setDocs: React.Dispatch<React.SetStateAction<UploadedDoc[]>>) {
  // Step 1: processing
  setTimeout(() => {
    setDocs((prev) => prev.map((d) => d.id === doc.id ? { ...d, status: "processing" } : d));
  }, 800);

  // Step 2: auto-approve (simulated AI check)
  setTimeout(() => {
    const approved = Math.random() > 0.15; // 85% approval rate
    setDocs((prev) =>
      prev.map((d) =>
        d.id === doc.id
          ? {
              ...d,
              status: approved ? "approved" : "rejected",
              message: approved ? undefined : "המסמך לא ברור או שפג תוקפו. אנא העלה מחדש.",
            }
          : d
      )
    );
  }, 3000);
}

export function VerifyContent() {
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const user = useAuthStore((s) => s.user);
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  const isInstructor = user?.role === "instructor" || user?.role === "admin";

  const handleUpload = (type: "license" | "certificate" | "insurance") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,.pdf";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const newDoc: UploadedDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type,
        status: "uploading",
        uploadedAt: new Date().toLocaleString("he-IL"),
      };
      setDocs((prev) => [...prev, newDoc]);
      simulateVerification(newDoc, setDocs);
    };
    input.click();
  };

  const approvedCount = docs.filter((d) => d.status === "approved").length;
  const allApproved = approvedCount === 3;
  const docsOfType = (type: string) => docs.filter((d) => d.type === type);

  const statusIcon = (status: UploadedDoc["status"]) => {
    switch (status) {
      case "uploading": return <Clock className="w-4 h-4 text-[var(--text-muted)] animate-pulse" />;
      case "processing": return <Clock className="w-4 h-4 text-[var(--accent-blue)] animate-spin" />;
      case "approved": return <CheckCircle className="w-4 h-4 text-[var(--accent-green)]" />;
      case "rejected": return <XCircle className="w-4 h-4 text-[var(--accent-red)]" />;
    }
  };

  const statusText = (status: UploadedDoc["status"]) => {
    switch (status) {
      case "uploading": return t("verifyUploading");
      case "processing": return t("verifyProcessing");
      case "approved": return t("verifyApproved");
      case "rejected": return t("verifyRejected");
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/dashboard" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-green)]" />
            {t("verifyTitle")}
          </h1>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-2xl mx-auto space-y-4">
        {!isInstructor ? (
          <div className="text-center py-16">
            <ShieldCheck className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-30" />
            <p className="text-sm text-[var(--text-muted)]">{t("verifyLoginRequired")}</p>
            <Link href="/login" className="inline-block mt-3 px-4 py-2 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold">
              {t("instructorLogin")}
            </Link>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">{t("verifyProgress")}</p>
                <span className="text-xs font-bold" style={{ fontFamily: "var(--font-rubik)", color: allApproved ? "var(--accent-green)" : "var(--text-muted)" }}>
                  {approvedCount}/3
                </span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${i < approvedCount ? "bg-[var(--accent-green)]" : "bg-[var(--bg-elevated)]"}`} />
                ))}
              </div>
              {allApproved && (
                <div className="mt-3 flex items-center gap-2 text-[var(--accent-green)]">
                  <CheckCircle className="w-4 h-4" />
                  <p className="text-xs font-semibold">{t("verifyComplete")}</p>
                </div>
              )}
            </div>

            {/* Document upload cards */}
            {DOC_TYPES.map(({ id, labelKey, descKey, icon: Icon }) => {
              const existing = docsOfType(id);
              const latestDoc = existing[existing.length - 1];
              const isApproved = latestDoc?.status === "approved";

              return (
                <div key={id} className={`bg-[var(--bg-card)] border rounded-xl p-4 transition-colors ${isApproved ? "border-[var(--accent-green)]/30" : "border-[var(--border-subtle)]"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isApproved ? "bg-[var(--accent-green)]/10" : "bg-[var(--bg-elevated)]"}`}>
                      <Icon className={`w-5 h-5 ${isApproved ? "text-[var(--accent-green)]" : "text-[var(--text-muted)]"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{t(labelKey)}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{t(descKey)}</p>
                    </div>
                  </div>

                  {/* Uploaded documents list */}
                  {existing.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {existing.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-2 bg-[var(--bg-elevated)] rounded-lg p-2">
                          {statusIcon(doc.status)}
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium truncate">{doc.name}</p>
                            <p className="text-[9px] text-[var(--text-muted)]">{statusText(doc.status)}</p>
                          </div>
                          {doc.message && (
                            <div className="flex items-center gap-1 text-[var(--accent-red)]">
                              <AlertTriangle className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {existing.some((d) => d.message) && (
                    <p className="text-[10px] text-[var(--accent-red)] mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {existing.find((d) => d.message)?.message}
                    </p>
                  )}

                  {!isApproved && (
                    <button
                      onClick={() => handleUpload(id)}
                      className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-[var(--border-default)] text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {t("verifyUpload")}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Info */}
            <div className="bg-[var(--bg-elevated)] rounded-xl p-3">
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">{t("verifyAutoNote")}</p>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
