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

const Finance = () => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Treatment Date</TableHead>
            <TableHead>Last Payment</TableHead>
            <TableHead>Left to Distribute</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <CircleCheckIcon className="text-green-500" />
            </TableCell>
            <TableCell>$500</TableCell>
            <TableCell>$500</TableCell>
            <TableCell>Dr. John Doe</TableCell>
            <TableCell>2023-06-15</TableCell>
            <TableCell>2023-06-20</TableCell>
            <TableCell>$0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <CircleIcon className="text-yellow-500" />
            </TableCell>
            <TableCell>$800</TableCell>
            <TableCell>$600</TableCell>
            <TableCell>Dr. Jane Smith</TableCell>
            <TableCell>2023-05-20</TableCell>
            <TableCell>2023-06-01</TableCell>
            <TableCell>$200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <CircleIcon className="text-yellow-500" />
            </TableCell>
            <TableCell>$300</TableCell>
            <TableCell>$150</TableCell>
            <TableCell>Dr. John Doe</TableCell>
            <TableCell>2023-04-10</TableCell>
            <TableCell>2023-05-01</TableCell>
            <TableCell>$150</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default Finance;

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
