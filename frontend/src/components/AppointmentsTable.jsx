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
import { Loader2, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";

import { ClipboardPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import client from "../api";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [tomorrowAppointments, setTomorrowAppointments] = useState([]);
  const [selectedTable, setSelectedTable] = useState("today");
  const [appointmentStatusForm, setAppointmentStatusForm] = useState({
    id: "",
    status: "",
  });
  const statusBtn = useRef(null);
  const { toast } = useToast();

  const handleTableChange = (value) => {
    setSelectedTable(value);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    statusBtn.current.disabled = true;
    statusBtn.current.innerHTML = `<Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait`;
    try {
      const response = await client.patch(
        `/api/appointments/${appointmentStatusForm.id}/`,
        {
          status: appointmentStatusForm.status,
        }
      );
      console.log(response.data);
      toast({
        variant: "success",
        title: "Appointment status updated",
        description: "The appointment status has been updated successfully.",
      });

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === response.data.id
            ? {
                ...appointment,
                status: response.data.status,
                status_display: response.data.status_display,
              }
            : appointment
        )
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Appointment status update failed",
        description: error.response.data.error,
      });
    } finally {
      // wait for 1 second before enabling the button again
      setTimeout(() => {
        statusBtn.current.disabled = false;
        statusBtn.current.innerHTML = `<Pen className="mr-2 h-4 w-4" /> Change Status`;
      }, 1000);
    }
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
      // before setting todayAppointments to response.data , order the appointments by start_hour
      // so that the appointments are displayed in the correct order
      // response.data.sort((a, b) => a.start_hour.localeCompare(b.start_hour));
      setTodayAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTomorrowAppointments = async () => {
    try {
      const response = await client.get("/api/appointments/tomorrow/");
      console.log(response.data);
      // before setting tomorrowAppointments to response.data , order the appointments by start_hour
      // so that the appointments are displayed in the correct order
      // response.data.sort((a, b) => a.start_hour.localeCompare(b.start_hour));
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
                  <Popover>
                    <PopoverTrigger className="flex items-center gap-1">
                      <Pen size={16} />
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
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Appointment Status
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Set the appointment's status.
                          </p>
                        </div>
                        <form
                          onSubmit={(e) => {
                            handleStatusSubmit(e);
                          }}
                          className="grid gap-2"
                        >
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="status">Status</Label>
                            {/* <Input
                              id="status"
                              defaultValue={appointment.status_display}
                            />
                            */}
                            <Select
                              onValueChange={(value) => {
                                setAppointmentStatusForm({
                                  id: appointment.id,
                                  status: value,
                                });
                              }}
                              required
                            >
                              <SelectTrigger className="col-span-2 h-8">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">Active</SelectItem>
                                <SelectItem value="D">Done</SelectItem>
                                <SelectItem value="M">Missed</SelectItem>
                                <SelectItem value="P">Pending</SelectItem>
                                <SelectItem value="R">Rescheduled</SelectItem>
                                <SelectItem value="CP">
                                  Canceled by the patient
                                </SelectItem>
                                <SelectItem value="CD">
                                  Canceled by the dentist
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4 my-2">
                            <Button
                              type="submit"
                              ref={statusBtn}
                              className="col-span-3"
                            >
                              <Pen className="mr-2 h-4 w-4" /> Change Status
                            </Button>
                          </div>
                        </form>
                      </div>
                    </PopoverContent>
                  </Popover>
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
