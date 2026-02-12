import type { ScheduledTraining } from "../types";

// Generate dates relative to today
const today = new Date();
const fmt = (d: Date) => d.toISOString().split("T")[0];
const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

export const MOCK_TRAININGS: ScheduledTraining[] = [
  {
    id: "t1", date: fmt(today), time: "09:00", range: "מטווח השרון", trainingType: "רענון", status: "completed",
    clients: [
      { id: "c1", name: "אבי מזרחי", phone: "050-1234567", idNumber: "301234567", trainingType: "רענון", weaponType: "אקדח", caliber: "9mm", serialNumber: "GL19-12345", licenseNumber: "54321", licenseExpiry: "2027-03-15", reportFilled: true },
      { id: "c2", name: "רחל כהן", phone: "052-9876543", idNumber: "302345678", trainingType: "רענון", weaponType: "אקדח", caliber: "9mm", serialNumber: "SG-98765", licenseNumber: "67890", licenseExpiry: "2026-11-20", reportFilled: true },
    ],
  },
  {
    id: "t2", date: fmt(today), time: "11:00", range: "מטווח השרון", trainingType: "מתחמש חדש", status: "in-progress",
    clients: [
      { id: "c3", name: "נועה לב", phone: "054-5551234", idNumber: "303456789", trainingType: "מתחמש חדש", weaponType: "אקדח", caliber: "9mm", serialNumber: "CZ-11111", licenseNumber: "11223", licenseExpiry: "2028-01-10", reportFilled: false },
    ],
  },
  {
    id: "t3", date: fmt(today), time: "14:00", range: "מטווח נתניה", trainingType: "חידוש", status: "upcoming",
    clients: [
      { id: "c4", name: "גיל עוז", phone: "053-7778899", idNumber: "304567890", trainingType: "חידוש", weaponType: "אקדח", caliber: "9mm", serialNumber: "BRT-22222", licenseNumber: "33445", licenseExpiry: "2026-02-28", reportFilled: false },
      { id: "c5", name: "מירב שלום", phone: "050-6667788", idNumber: "305678901", trainingType: "חידוש", weaponType: "אקדח", caliber: ".40S&W", serialNumber: "SW-33333", licenseNumber: "55667", licenseExpiry: "2026-03-10", reportFilled: false },
      { id: "c6", name: "עומר דוד", phone: "058-1112233", idNumber: "306789012", trainingType: "חידוש", weaponType: "רובה", caliber: "5.56mm", serialNumber: "AR-44444", licenseNumber: "77889", licenseExpiry: "2026-06-15", reportFilled: false },
    ],
  },
  {
    id: "t4", date: fmt(today), time: "16:00", range: "מטווח השרון", trainingType: "רענון", status: "upcoming",
    clients: [
      { id: "c7", name: "תמר שמש", phone: "052-4445566", idNumber: "307890123", trainingType: "רענון", weaponType: "אקדח", caliber: "9mm", serialNumber: "GL-55555", licenseNumber: "99001", licenseExpiry: "2027-09-20", reportFilled: false },
    ],
  },
  {
    id: "t5", date: fmt(addDays(today, 1)), time: "09:00", range: "מטווח נתניה", trainingType: "ירי מקצועי", status: "upcoming",
    clients: [
      { id: "c8", name: "דן אלון", phone: "050-8889900", idNumber: "308901234", trainingType: "ירי מקצועי", weaponType: "אקדח", caliber: "9mm", serialNumber: "GL-66666", licenseNumber: "12340", licenseExpiry: "2028-04-05", reportFilled: false },
      { id: "c9", name: "אורי בן דוד", phone: "054-2223344", idNumber: "309012345", trainingType: "ירי מקצועי", weaponType: "אקדח", caliber: ".45ACP", serialNumber: "1911-77777", licenseNumber: "56780", licenseExpiry: "2027-12-01", reportFilled: false },
    ],
  },
  {
    id: "t6", date: fmt(addDays(today, 1)), time: "14:00", range: "מטווח השרון", trainingType: "מתחמש חדש", status: "upcoming",
    clients: [
      { id: "c10", name: "שרית מלכה", phone: "053-3334455", idNumber: "310123456", trainingType: "מתחמש חדש", weaponType: "אקדח", caliber: "9mm", serialNumber: "CZ-88888", licenseNumber: "90120", licenseExpiry: "2028-06-30", reportFilled: false },
    ],
  },
  {
    id: "t7", date: fmt(addDays(today, 3)), time: "10:00", range: "מטווח נתניה", trainingType: "סדנת ירי", status: "upcoming",
    clients: [
      { id: "c11", name: "יובל שטרן", phone: "050-5556677", idNumber: "311234567", trainingType: "סדנת ירי", weaponType: "אקדח", caliber: "9mm", serialNumber: "GL-99999", licenseNumber: "34560", licenseExpiry: "2027-08-15", reportFilled: false },
      { id: "c12", name: "הילה ברק", phone: "052-6667788", idNumber: "312345678", trainingType: "סדנת ירי", weaponType: "אקדח", caliber: "9mm", serialNumber: "SG-10101", licenseNumber: "78900", licenseExpiry: "2028-02-20", reportFilled: false },
      { id: "c13", name: "אסף גולן", phone: "054-7778899", idNumber: "313456789", trainingType: "סדנת ירי", weaponType: "רובה", caliber: "5.56mm", serialNumber: "TAR-20202", licenseNumber: "12300", licenseExpiry: "2027-05-10", reportFilled: false },
      { id: "c14", name: "ליאת נוי", phone: "058-8889900", idNumber: "314567890", trainingType: "סדנת ירי", weaponType: "אקדח", caliber: "9mm", serialNumber: "BRT-30303", licenseNumber: "45600", licenseExpiry: "2028-09-01", reportFilled: false },
    ],
  },
  {
    id: "t8", date: fmt(addDays(today, 5)), time: "09:00", range: "מטווח השרון", trainingType: "רענון", status: "upcoming",
    clients: [
      { id: "c15", name: "משה אדרי", phone: "050-1112233", idNumber: "315678901", trainingType: "רענון", weaponType: "אקדח", caliber: "9mm", serialNumber: "GL-40404", licenseNumber: "78910", licenseExpiry: "2027-01-15", reportFilled: false },
    ],
  },
  {
    id: "t9", date: fmt(addDays(today, -2)), time: "10:00", range: "מטווח נתניה", trainingType: "רענון", status: "completed",
    clients: [
      { id: "c16", name: "יעל פרידמן", phone: "052-9998877", idNumber: "316789012", trainingType: "רענון", weaponType: "אקדח", caliber: "9mm", serialNumber: "GL-50505", licenseNumber: "11110", licenseExpiry: "2027-07-20", reportFilled: true },
      { id: "c17", name: "רון כץ", phone: "054-8887766", idNumber: "317890123", trainingType: "רענון", weaponType: "אקדח", caliber: ".40S&W", serialNumber: "SW-60606", licenseNumber: "22220", licenseExpiry: "2026-10-05", reportFilled: true },
    ],
  },
  {
    id: "t10", date: fmt(addDays(today, -5)), time: "14:00", range: "מטווח השרון", trainingType: "מתחמש חדש", status: "completed",
    clients: [
      { id: "c18", name: "ענת לוי", phone: "053-7776655", idNumber: "318901234", trainingType: "מתחמש חדש", weaponType: "אקדח", caliber: "9mm", serialNumber: "CZ-70707", licenseNumber: "33330", licenseExpiry: "2028-03-25", reportFilled: true },
    ],
  },
];
