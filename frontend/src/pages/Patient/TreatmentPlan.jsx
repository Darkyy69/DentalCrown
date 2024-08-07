import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarPlus, Pen, ChevronLeft, ChevronDown } from "lucide-react";
import teethImage from "../../assets/teeth.png";
import { useParams } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN } from "/src/constants";
import { useToast } from "@/components/ui/use-toast";
import { jwtDecode } from "jwt-decode";
import { set } from "date-fns";
import Services from "./Services.jsx";

const TreatmentPlan = () => {
  const teethNumbers = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46,
    45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];

  const rows_width = [
    71.5, 74, 73, 41, 40, 41, 39, 44, 44, 39, 41, 40, 41, 73, 73, 73, 81, 77,
    77, 41, 41, 40, 34, 33, 34, 33, 41, 41, 40, 77, 77, 81,
  ];

  const [dentists, setDentists] = React.useState([]); // set initial state of dentists to [
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const { patientId } = useParams();
  const [treatmentPrices, setTreatmentPrices] = useState({});
  const [treatmentNotes, setTreatmentNotes] = useState({});
  const { toast } = useToast();
  const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
  const [formData, setFormData] = React.useState({
    dentist: "",
    patient: "",
    date: "",
    treatment: "",
    start_hour: "",
    end_hour: "",
    comment: "",
  });

  const fetchTreatments = async () => {
    try {
      const response = await api.get(`/api/treatments/patient/${patientId}`);
      response.data.map((treatment) => {
        setTreatmentPrices((prevPrices) => ({
          ...prevPrices,
          [treatment.id]: treatment.price,
        }));

        setTreatmentNotes((prevNotes) => ({
          ...prevNotes,
          [treatment.id]: treatment.notes,
        }));
      });
      setTreatments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching treatments:", error);
    }
  };

  useEffect(() => {
    fetchTreatments();
    setFormData({
      dentist: token.user_id,
      patient: patientId,
      date: "",
      treatment: "",
      start_hour: "",
      end_hour: "",
      comment: "",
    });
  }, [patientId]);

  const fetchDentists = async () => {
    try {
      const response = await api.get("/api/users/");
      // filter response data to only include dentists (role == dentist) and set it to dentists state
      setDentists(
        response.data.filter((dentist) => dentist.role === "dentist")
      );
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    // fetch all the dentists from the backend using api.get in a try catch block
    fetchDentists();
  }, []);

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleAppointmentSubmit = async (e, treatmentId) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/appointments/", {
        dentist: formData.dentist,
        patient: formData.patient,
        date: formData.date,
        treatment: treatmentId,
        start_hour: formData.start_hour,
        end_hour: formData.end_hour,
        comment: formData.comment,
      });
      console.log("Appointment added successfully:", response.data);
      // Optionally, you can handle success state or reset the form here
      toast({
        variant: "success",
        title: "Success",
        description: "Appointment added successfuly!",
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      // Handle error state if needed
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error: " + JSON.stringify(e.response.data),
      });
    } finally {
      setFormData({
        dentist: token.user_id,
        patient: patientId,
        date: "",
        treatment: "",
        start_hour: "",
        end_hour: "",
        comment: "",
      });
    }
  };

  //   const handleStatusSubmit = async (e) => {
  //     e.preventDefault();
  //     statusBtn.current.disabled = true;
  //     statusBtn.current.innerHTML = `<Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //       Please wait`;
  //     try {
  //       const response = await client.patch(
  //         `/api/appointments/${appointmentStatusForm.id}/`,
  //         {
  //           status: appointmentStatusForm.status,
  //         }
  //       );
  //       console.log(response.data);
  //       toast({
  //         variant: "success",
  //         title: "Appointment status updated",
  //         description: "The appointment status has been updated successfully.",
  //       });

  //       setAppointments(
  //         appointments.map((appointment) =>
  //           appointment.id === response.data.id
  //             ? {
  //                 ...appointment,
  //                 status: response.data.status,
  //                 status_display: response.data.status_display,
  //               }
  //             : appointment
  //         )
  //       );
  //     } catch (error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Appointment status update failed",
  //         description: error.response.data.error,
  //       });
  //     } finally {
  //       // wait for 1 second before enabling the button again
  //       setTimeout(() => {
  //         statusBtn.current.disabled = false;
  //         statusBtn.current.innerHTML = `<Pen className="mr-2 h-4 w-4" /> Change Status`;
  //       }, 1000);
  //     }
  //   };

  const handleToothClick = (index) => {
    console.log("You clicked tooth number", index);
    if (selectedTeeth.includes(index)) {
      setSelectedTeeth(selectedTeeth.filter((i) => i !== index));
    } else {
      setSelectedTeeth([...selectedTeeth, index]);
    }
  };

  const handleTreatmentPriceSubmit = async (e, treatment) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/api/treatments/${treatment.id}/`, {
        price: treatmentPrices[treatment.id],
      });
      console.log("Price Changed");
      toast({
        variant: "success",
        title: "Success",
        description: "Successs: Price updated!",
      });
    } catch (e) {
      console.error("Error fetching treatments:", e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error: " + JSON.stringify(e.response.data),
      });
    }
  };

  const handleTreatmentNoteSubmit = async (e, treatment) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/api/treatments/${treatment.id}/`, {
        notes: treatmentNotes[treatment.id],
      });
      console.log("Notes Changed");
      toast({
        variant: "success",
        title: "Success",
        description: "Successs: Notes updated!",
      });
    } catch (e) {
      console.error("Error fetching treatments:", e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error: " + JSON.stringify(e.response.data),
      });
    }
  };

  const renderTeeth = (teeth) => {
    return teeth.map((tooth) => {
      const isSelected = selectedTeeth.includes(tooth);
      return (
        <div
          key={tooth}
          className={`h-full cursor-pointer hover:border hover:border-blue-600 ${
            isSelected ? "border border-dashed border-green-900" : ""
          }`}
          onClick={() => handleToothClick(tooth)}
          style={{ width: rows_width[teethNumbers.indexOf(tooth)] }}
        />
      );
    });
  };

  return (
    <div className="">
      <div className="flex flex-wrap justify-between gap-4">
        <div
          className="flex flex-col w-[850px] h-[475px] bg-cover"
          style={{ backgroundImage: `url(${teethImage})` }}
        >
          <div className="flex w-full h-[237.5px]">
            {renderTeeth(teethNumbers.slice(0, 8))}
            {renderTeeth(teethNumbers.slice(8, 16))}
          </div>
          <div className="flex w-full h-[237.5px]">
            {renderTeeth(teethNumbers.slice(16, 24))}
            {renderTeeth(teethNumbers.slice(24, 32))}
          </div>
        </div>
        <div className="flex-grow h-[475px] overflow-y-scroll text-right">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">General Info</CardTitle>
              <CardDescription className="text-center">
                Card Description for later...
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p>Card Content</p> */}
              <Services
                patientId={patientId}
                selectedTeeth={selectedTeeth}
                fetchTreatments={fetchTreatments}
              />
            </CardContent>
            {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
          </Card>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table className="text-nowrap">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead>Treatment</TableHead>
              <TableHead className="text-center">Teeth</TableHead>
              <TableHead className="text-center">Diagnostic</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Notes</TableHead>
              <TableHead className="text-center">Appointment</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {treatments.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell>{treatment.treatment_name}</TableCell>
                <TableCell className="text-center">
                  {treatment.teeth.length > 0
                    ? treatment.teeth.join(", ")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {treatment.diagnostic.name === ""
                    ? "Click here later"
                    : treatment.diagnostic.name} 
                </TableCell>
                <TableCell>
                  <form
                    onSubmit={(e) => handleTreatmentPriceSubmit(e, treatment)}
                    className="grid gap-2"
                  >
                    <div>
                      <Input
                        type="number"
                        className="w-32"
                        placeholder={treatment.price}
                        value={treatmentPrices[treatment.id]}
                        onChange={(e) => {
                          setTreatmentPrices((prevPrices) => ({
                            ...prevPrices,
                            [treatment.id]: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <Button type="submit" className="col-span-3 hidden">
                        <Pen className="mr-2 h-4 w-4" /> Change Price
                      </Button>
                    </div>
                  </form>
                </TableCell>
                <TableCell className="text-center">
                  <form
                    onSubmit={(e) => handleTreatmentNoteSubmit(e, treatment)}
                  >
                    <Sheet>
                      <SheetTrigger>
                          <span>See Notes</span>
                      </SheetTrigger>
                      <SheetContent side="top">
                        <SheetHeader>
                          <SheetTitle>Notes</SheetTitle>
                          <SheetDescription>
                            Add Your Treatment notes here below.
                          </SheetDescription>
                        </SheetHeader>

                        <div className="grid gap-4 py-4">
                          <Textarea
                            type="text"
                            className="min-h-20 w-full"
                            placeholder="Notes..."
                            value={treatmentNotes[treatment.id]}
                            onChange={(e) => {
                              setTreatmentNotes((prevNotes) => ({
                                ...prevNotes,
                                [treatment.id]: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>

                    <div>
                      <Button type="submit" className="col-span-3 hidden">
                        <Pen className="mr-2 h-4 w-4" /> Change Notes
                      </Button>
                    </div>
                  </form>
                </TableCell>
                <TableCell>
                  <span className="flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger>
                        <CalendarPlus />
                      </DialogTrigger>
                      <DialogContent className="p-6 sm:max-w-md">
                        <form
                          onSubmit={(e) =>
                            handleAppointmentSubmit(e, treatment.id)
                          }
                        >
                          <DialogHeader>
                            <DialogTitle>New Appointment</DialogTitle>
                            <DialogDescription>
                              Schedule a new appointment for the patient.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Dentist</Label>
                                <Input value={token.full_name} disabled />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="appointment-date">Date</Label>
                                <Input
                                  id="date"
                                  type="date"
                                  placeholder="Select date"
                                  onChange={(e) =>
                                    handleChange(e.target.id, e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="start_hour">Start Time</Label>
                                <Input
                                  id="start_hour"
                                  type="time"
                                  placeholder="Select start time"
                                  onChange={(e) =>
                                    handleChange(e.target.id, e.target.value)
                                  }
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="end_hour">End Time</Label>
                                <Input
                                  id="end_hour"
                                  type="time"
                                  placeholder="Select end time"
                                  onChange={(e) =>
                                    handleChange(e.target.id, e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="comment">Notes</Label>
                              <Textarea
                                id="comment"
                                placeholder="Add any additional notes"
                                className="min-h-[50px]"
                                onChange={(e) =>
                                  handleChange(e.target.id, e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save Appointment</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </span>
                </TableCell>
                <TableCell className="">
                  <Popover>
                    <PopoverTrigger className="flex items-center gap-1 float-right">
                      <Pen size={16} />
                      <Badge
                        variant={
                          treatment.status === "CD" ||
                          treatment.status === "CP" ||
                          treatment.status === "M"
                            ? "destructive"
                            : treatment.status === "D" ||
                              treatment.status === "R"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {treatment.status_display.length > 8
                          ? treatment.status_display.slice(0, 8)
                          : treatment.status_display}
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
                          //   onSubmit={(e) => {
                          //     handleStatusSubmit(e);
                          //   }}
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
                              //   onValueChange={(value) => {
                              //     setAppointmentStatusForm({
                              //       id: appointment.id,
                              //       status: value,
                              //     });
                              //   }}
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
                              //   ref={statusBtn}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TreatmentPlan;
