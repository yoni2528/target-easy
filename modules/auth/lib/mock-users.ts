import type { AuthUser } from "../types";

export const MOCK_USERS: Array<AuthUser & { password: string }> = [
  { id: "admin-1", name: "יוני (מנהל)", role: "admin", password: "admin123" },
  { id: "inst-1", name: "דוד כהן", role: "instructor", instructorId: "1", password: "1234" },
  { id: "inst-2", name: "מיכל אברהם", role: "instructor", instructorId: "2", password: "1234" },
  { id: "inst-3", name: "רון מלכה", role: "instructor", instructorId: "3", password: "1234" },
];
