export type UserRole = "admin" | "instructor";

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  instructorId?: string;
}
