import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

import api from "../api";

const PatientContext = createContext({});

export const PatientProvider = ({ children }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { patientId } = useParams();
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await api.get(`/api/patients/${patientId}`);
        setPatientInfo(response.data);
      } catch (error) {
        console.error("Error fetching patient information:", error);

        toast({
          variant: "destructive",
          title: "Error fetching patient information",
          description: error.response.data.detail,
        });
        navigate("/not-found");
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
