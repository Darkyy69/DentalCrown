import { useEffect, useState, useContext } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PatientContext from "../../context/PatientProvider";
import api from "../../api";

const FollowUp = () => {
  const [data, setData] = useState([]);
  const { patientInfo } = useContext(PatientContext);
  console.log(patientInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/treatments/patient/${patientId}`);
        const jsonData = response.data;
        setData(jsonData);
        console.log("Data fetched:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (patientId) {
      fetchData();
    }
  }, [patientId]);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-bold mb-2">EndoBuccal Examinations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date/Time</TableHead>
                <TableHead>Lead Participant</TableHead>
                <TableHead>Recent Treatment Plan</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.dateTime}</TableCell>
                  <TableCell>{item.leadParticipant}</TableCell>
                  <TableCell>{item.recentTreatmentPlan}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h3 className="text-md font-bold mb-2">Care History</h3>
          <Table className="text-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>Treatment</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Treatment Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.treatment}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.participant}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>
                    <Button variant="outline">View Treatment Plan</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default FollowUp;
