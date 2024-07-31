import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const PatientContext = createContext({});

export const PatientProvider = ({ children }) => {
  const { patientId } = useParams();
  const [patientInfo, setPatientInfo] = useState({});
  console.log(patientId);
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await api.get(`/api/patients/${patientId}`);
        setPatientInfo(response.data);
      } catch (error) {
        console.error("Error fetching patient information:", error);
      }
    };

    if (patientId) {
      fetchPatientInfo();
    }
  }, [patientId]);

  return (
    <PatientContext.Provider value={{ patientInfo }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
