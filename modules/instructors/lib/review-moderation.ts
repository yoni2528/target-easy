/**
 * Client-side review content moderation.
 * Blocks profanity, slurs, racism, and offensive content in Hebrew and English.
 * Allows harsh but legitimate criticism of instructors.
 */

// Hebrew offensive words (profanity, slurs, racism)
const HE_BLOCKED = [
  // Profanity
  "זונה", "שרמוטה", "מניאק", "חרא", "זין", "תחת", "כוס", "זיין",
  "מזדיין", "יזדיין", "תזדיין", "מזדיינת", "לזיין", "אמאשך", "אמך",
  "בן זונה", "בת זונה", "בנזונה", "חתיכת זונה", "יבן זונה",
  "מניאקית", "חרה", "חרות",
  // Racist / ethnic slurs
  "כושי", "כושית", "ערס", "ערסי", "ערבוש", "אשכנזי מסריח",
  "ערבי מסריח", "מזרחי מסריח",
  // Violent threats
  "אהרוג אותך", "ימות", "תמות", "למות", "אקבור", "אשרוף",
  // Homophobic slurs
  "הומו", "לסבית מסריחה",
];

// English offensive words
const EN_BLOCKED = [
  // Profanity
  "fuck", "shit", "bitch", "asshole", "dick", "cunt", "bastard",
  "motherfucker", "bullshit", "dumbass", "jackass",
  // Racist slurs
  "nigger", "nigga", "kike", "spic", "chink", "wetback", "gook",
  "cracker", "honky", "beaner",
  // Homophobic slurs
  "faggot", "fag", "dyke", "tranny",
  // Violent threats
  "kill you", "i will kill", "gonna kill",
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/['".,!?;:\-_()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface ModerationResult {
  ok: boolean;
  reason?: "profanity" | "too_short";
}

export function moderateReview(text: string): ModerationResult {
  const trimmed = text.trim();
  if (trimmed.length < 3) {
    return { ok: false, reason: "too_short" };
  }

  const normalized = normalize(trimmed);

  // Check Hebrew blocked words
  for (const word of HE_BLOCKED) {
    if (normalized.includes(word)) {
      return { ok: false, reason: "profanity" };
    }
  }

  // Check English blocked words (word boundary aware)
  const words = normalized.split(" ");
  for (const blocked of EN_BLOCKED) {
    const blockedParts = blocked.split(" ");
    if (blockedParts.length === 1) {
      if (words.includes(blocked)) {
        return { ok: false, reason: "profanity" };
      }
    } else {
      // Multi-word phrase check
      if (normalized.includes(blocked)) {
        return { ok: false, reason: "profanity" };
      }
    }
  }

  return { ok: true };
}
