export interface TrainingClient {
  id: string;
  name: string;
  phone: string;
  idNumber: string;
  trainingType: string;
  weaponType: string;
  caliber: string;
  serialNumber: string;
  licenseNumber: string;
  licenseExpiry: string;
  reportFilled: boolean;
}

export interface ScheduledTraining {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  range: string;
  trainingType: string;
  clients: TrainingClient[];
  status: "upcoming" | "in-progress" | "completed";
}

export interface ShooterLogEntry {
  clientId: string;
  rounds: number;
  distance: number;
  grouping: number;
  accuracy: number;
  safetyScore: number;
  weaponHandling: number;
  notes: string;
  pass: boolean;
}
