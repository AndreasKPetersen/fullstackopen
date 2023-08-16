import diagnosesData from "../../data/diagnoses";

import { DiagnosesEntry } from "../types";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
};
