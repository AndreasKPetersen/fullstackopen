export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, "ssn" | "entries">;

export type NewPatientsEntry = Omit<PatientsEntry, "id">;
