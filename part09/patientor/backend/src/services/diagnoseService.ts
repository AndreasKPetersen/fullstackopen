import diagnosesData from "../../data/diagnoses";

import { DiagnosesEntry } from "../types";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getAllDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getAllDiagnoses,
  addDiagnose,
};
