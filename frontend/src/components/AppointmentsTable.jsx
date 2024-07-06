import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Button } from "@/components/ui/button";

import { ClipboardPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "./axiosClient";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [tomorrowAppointments, setTomorrowAppointments] = useState([]);
  const [selectedTable, setSelectedTable] = useState("today");

  const handleTableChange = (value) => {
    setSelectedTable(value);
  };

  // useEffect(() => {
  //   // call renderContent() here when selectedMenu changes
  //   renderContent();
  // }, [selectedMenu]);

  // Fetch the appointments from the backend
  const fetchTodayAppointments = async () => {
    try {
      const response = await client.get("/api/appointments/today/");
      console.log(response.data);
      setTodayAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTomorrowAppointments = async () => {
    try {
      const response = await client.get("/api/appointments/tomorrow/");
      console.log(response.data);
      setTomorrowAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch the appointments from the backend
    fetchTodayAppointments();
    fetchTomorrowAppointments();
  }, []);

  useEffect(() => {
    setAppointments(
      selectedTable === "today" ? todayAppointments : tomorrowAppointments
    );
  }, [selectedTable, todayAppointments, tomorrowAppointments]);

  return (
    <div className="">
      <div className="flex items-center">
        <ToggleGroup
          value={selectedTable}
          type="single"
          className="border rounded-md"
          onValueChange={handleTableChange}
        >
          <ToggleGroupItem
            className="whitespace-nowrap"
            value="to-schedule"
            aria-label="Toggle A planifier"
          >
            A Planifier
          </ToggleGroupItem>
          <ToggleGroupItem
            className="whitespace-nowrap"
            value="today"
            aria-label="Toggle Aujord'hui"
          >
            Aujord'hui
          </ToggleGroupItem>
          <ToggleGroupItem
            className="whitespace-nowrap"
            value="tomorrow"
            aria-label="Toggle Demain"
          >
            Demain
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Table>
        <TableCaption>A list of your appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Appointment</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead className="text-right">Cell phone</TableHead>
            <TableHead className="w-14"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-x-scroll">
          {appointments
            .sort((a, b) => a.start_hour.localeCompare(b.start_hour))
            .map((appointment) => (
              <TableRow key={appointment.id} className="whitespace-nowrap">
                <TableCell>
                  <Badge
                    variant={
                      appointment.status === "CD" ||
                      appointment.status === "CP" ||
                      appointment.status === "M"
                        ? "destructive"
                        : appointment.status === "D" ||
                          appointment.status === "R"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {appointment.status_display.length > 8
                      ? appointment.status_display.slice(0, 8)
                      : appointment.status_display}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p>
                    From{" "}
                    <span className="font-medium">
                      {appointment.start_hour.slice(0, 5)}{" "}
                    </span>
                    To{" "}
                    <span className="font-medium">
                      {appointment.end_hour.slice(0, 5)}
                    </span>
                  </p>
                </TableCell>
                <TableCell className="font-medium">
                  {appointment.patient.full_name}
                </TableCell>
                <TableCell className="text-right">
                  {appointment.patient.phone_number}
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {/* TODO : Change this to the correct path */}
                        <Link to={`/patient/${appointment.patient.id}`}>
                          <ClipboardPlus />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Associated treatment plan</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{appointments.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
