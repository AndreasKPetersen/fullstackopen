import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { Entry, Patient, Diagnosis } from "../../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    void fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </div>

      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          {entry.date} {entry.description}
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((diagnosisCode: string) => {
                const diagnosis = diagnoses.find(
                  (diagnosis: Diagnosis) => diagnosisCode === diagnosis.code
                );
                return (
                  <li key={diagnosisCode}>
                    {diagnosisCode} {diagnosis ? diagnosis.name : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientDetailPage;
