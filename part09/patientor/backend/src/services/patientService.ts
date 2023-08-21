import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";

import { NewPatients, NonSensitivePatients, Patients } from "../types";

const patients: Patients[] = patientsData;

const getAllPatients = (): Patients[] => {
  return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patients | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

const addPatient = (newPatient: NewPatients): Patients => {
  const id = uuid();
  const newPatientObject = {
    id,
    ...newPatient,
  };

  patients.push(newPatientObject);
  return newPatientObject;
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  findById,
  addPatient,
};
