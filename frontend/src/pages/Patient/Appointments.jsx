import { useEffect, useState } from "react";
import api from "../../api";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

const Appointments = () => {
  const { patientId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentPopup, setAppointmentPopup] = useState(false);
  const [drawerMode, setDrawerMode] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(
          `http://localhost:8000/api/appointments/patient/${patientId}`
        );
        console.log(response.data);
        setAppointments(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentPopup(true);
    setDrawerMode("view");
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentPopup(true);
    setDrawerMode("edit");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Appointments</h2>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hidden md:inline-flex">New Appointment</Button>
            </DialogTrigger>
            <DialogContent className="p-6 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>New Appointment</DialogTitle>
                <DialogDescription>
                  Schedule a new appointment for the patient.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select id="doctor">
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-john-doe">
                          Dr. John Doe
                        </SelectItem>
                        <SelectItem value="dr-jane-smith">
                          Dr. Jane Smith
                        </SelectItem>
                        <SelectItem value="dr-michael-johnson">
                          Dr. Michael Johnson
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-date">Date</Label>
                    <Input
                      id="appointment-date"
                      type="date"
                      placeholder="Select date"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      placeholder="Select start time"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      placeholder="Select end time"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes"
                    className="min-h-[100px]"
                  />
                </div>
              </form>
              <DialogFooter>
                <Button type="submit">Save Appointment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Drawer open={appointmentPopup} onOpenChange={setAppointmentPopup}>
            {/* <DrawerTrigger asChild>
              <Button className="inline-flex md:hidden">New Appointment</Button>
            </DrawerTrigger> */}
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  {drawerMode === "view"
                    ? "View Appointment"
                    : "Edit Appointment"}
                </DrawerTitle>
                <DrawerDescription>
                  {drawerMode === "view"
                    ? "View appointment details."
                    : "Edit appointment details."}
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid gap-4 p-4">
                {selectedAppointment && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor">Doctor</Label>
                        <Select
                          id="doctor"
                          defaultValue={selectedAppointment.dentist.id}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-john-doe">
                              Dr. John Doe
                            </SelectItem>
                            <SelectItem value="dr-jane-smith">
                              Dr. Jane Smith
                            </SelectItem>
                            <SelectItem value="dr-michael-johnson">
                              Dr. Michael Johnson
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointment-date">Date</Label>
                        <Input
                          id="appointment-date"
                          type="date"
                          defaultValue={selectedAppointment.date}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          id="start-time"
                          type="time"
                          defaultValue={selectedAppointment.start_hour}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input
                          id="end-time"
                          type="time"
                          defaultValue={selectedAppointment.end_hour}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        defaultValue={selectedAppointment.comment}
                        className="min-h-[100px]"
                      />
                    </div>
                  </>
                )}
              </form>
              <DrawerFooter>
                <Button type="submit">
                  {drawerMode === "view" ? "Close" : "Save Changes"}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <Table className="text-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start Hour</TableHead>
            <TableHead>End Hour</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.dentist.full_name}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.start_hour}</TableCell>
              <TableCell>{appointment.end_hour}</TableCell>
              <TableCell>
                <Badge variant="outline">{appointment.status}</Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleView(appointment)}>
                      View Appointment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(appointment)}>
                      Edit Appointment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Appointments;

const EditAppointmentDialog = ({ appointment, onClose }) => {
  const [formData, setFormData] = useState({
    doctor: appointment.dentist.id,
    date: appointment.date,
    startHour: appointment.start_hour,
    endHour: appointment.end_hour,
    notes: appointment.notes,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/api/appointments/${appointment.id}/`,
        formData
      );
      console.log(res.data);
      onClose();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="doctor">Doctor</Label>
          <Select id="doctor" value={formData.doctor} onChange={handleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dr-john-doe">Dr. John Doe</SelectItem>
              <SelectItem value="dr-jane-smith">Dr. Jane Smith</SelectItem>
              <SelectItem value="dr-michael-johnson">
                Dr. Michael Johnson
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="appointment-date">Date</Label>
          <Input
            id="appointment-date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-time">Start Time</Label>
          <Input
            id="start-time"
            type="time"
            value={formData.startHour}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-time">End Time</Label>
          <Input
            id="end-time"
            type="time"
            value={formData.endHour || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};
