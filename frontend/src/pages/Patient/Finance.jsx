import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../api";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Finance = () => {
  const { patientId } = useParams();
  const [payments, setPayments] = useState([]);
  const [groupedPayments, setGroupedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get(
          `http://localhost:8000/api/payments/patient/${patientId}`
        );
        console.log(response.data);
        setPayments(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [patientId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading payments: {error.message}</div>;

  // const groupedPayments = payments.reduce((acc, payment) => {
  //   const existingPayment = acc.find(
  //     (p) => p.treatment.id === payment.treatment.id
  //   );
  //   if (existingPayment) {
  //     existingPayment.amount += +payment.amount;
  //     existingPayment.left_to_distribute = +payment.left_to_distribute;
  //     existingPayment.date = payment.date;
  //   } else {
  //     acc.push(payment);
  //   }
  //   return acc;
  // }, []);

  return (
    <Card>
      <Table className="text-nowrap">
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
          {payments.map((payment) => (
            // {groupedPayments.map((payment) => (
            <>
              <TableRow
                key={payment.id}
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <TableCell>
                  {payment.left_to_distribute === 0 ? (
                    <CircleCheckIcon className="text-green-500" />
                  ) : (
                    <CircleIcon className="text-yellow-500" />
                  )}
                </TableCell>
                <TableCell>${payment.treatment.price}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.dentist.full_name}</TableCell>
                <TableCell>
                  {new Date(payment.treatment.start_date).toLocaleString(
                    "en-GB"
                  )}
                </TableCell>
                <TableCell>
                  {new Date(payment.date).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>${payment.left_to_distribute}</TableCell>
              </TableRow>
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                key={payment.id}
              >
                <CollapsibleContent>
                  {payments.map((payment) => (
                    <TableRow
                      key={payment.id}
                      className="cursor-pointer"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      <TableCell>
                        {payment.left_to_distribute === 0 ? (
                          <CircleCheckIcon className="text-green-500" />
                        ) : (
                          <CircleIcon className="text-yellow-500" />
                        )}
                      </TableCell>
                      <TableCell>${payment.treatment.price}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.dentist.full_name}</TableCell>
                      <TableCell>
                        {new Date(payment.treatment.start_date).toLocaleString(
                          "en-GB"
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(payment.date).toLocaleString("en-GB")}
                      </TableCell>
                      <TableCell>${payment.left_to_distribute}</TableCell>
                    </TableRow>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </>
          ))}
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
