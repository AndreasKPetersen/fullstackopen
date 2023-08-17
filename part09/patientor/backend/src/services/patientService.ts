import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";

import {
  NewPatientsEntry,
  NonSensitivePatientsEntry,
  PatientsEntry,
} from "../types";

const patients: PatientsEntry[] = patientsData;

const getAllPatients = (): PatientsEntry[] => {
  return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatientsEntry): PatientsEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...newPatient,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  addPatient,
};
