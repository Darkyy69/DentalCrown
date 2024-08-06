import { useEffect, useState } from "react";
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
import api from "../../api";
import { useParams } from "react-router-dom";

const FollowUp = () => {
  const [data, setData] = useState([]);
  const { patientId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/treatments/patient/${patientId}`);
        setData(response.data);
        console.log("Data fetched:", response.data);
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
          <h3 className="text-md font-bold mb-2">Care History</h3>
          <Table className="text-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>Treatment</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Treatment Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Button variant="outline">View Treatment Plan</Button>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.treatment_name}</TableCell>
                    <TableCell>
                      {
                        new Date(item.start_date)
                          .toLocaleString("en-GB")
                          .split(",")[0]
                      }
                    </TableCell>
                    <TableCell>
                      {item.end_date
                        ? new Date(item.end_date)
                            .toLocaleString("en-GB")
                            .split(",")[0]
                        : "In Progress"}
                    </TableCell>
                    <TableCell>{item.dentist.full_name}</TableCell>
                    <TableCell>{item.notes}</TableCell>
                    <TableCell>
                      <Button variant="outline">View Treatment Plan</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default FollowUp;
