import patientsData from "../../data/patients";

import { NonSensitivePatientsEntry, PatientsEntry } from "../types";

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

const addPatient = () => {
  return null;
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  addPatient,
};
