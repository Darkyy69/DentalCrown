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

const FollowUp = () => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* <div>
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
              <TableRow>
                <TableCell>2023-06-15 10:30 AM</TableCell>
                <TableCell>Dr. John Doe</TableCell>
                <TableCell>Teeth cleaning and scaling</TableCell>
                <TableCell>Patient responded well to treatment</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-05-20 2:00 PM</TableCell>
                <TableCell>Dr. Jane Smith</TableCell>
                <TableCell>Cavity filling</TableCell>
                <TableCell>Patient reported no pain after procedure</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div> */}
        <div>
          <h3 className="text-md font-bold mb-2">Care History</h3>
          <Table>
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
              <TableRow>
                <TableCell>Teeth cleaning</TableCell>
                <TableCell>2023-06-01</TableCell>
                <TableCell>30 minutes</TableCell>
                <TableCell>Dr. John Doe</TableCell>
                <TableCell>Patient had no issues</TableCell>
                <TableCell>
                  <Button variant="outline">View Treatment Plan</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cavity filling</TableCell>
                <TableCell>2023-05-15</TableCell>
                <TableCell>1 hour</TableCell>
                <TableCell>Dr. Jane Smith</TableCell>
                <TableCell>Patient reported no pain</TableCell>
                <TableCell>
                  <Button variant="outline">View Treatment Plan</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default FollowUp;
