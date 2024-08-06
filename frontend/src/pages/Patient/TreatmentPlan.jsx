import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { Label } from "@/components/ui/label";
import { CalendarPlus, Pen, ChevronDown, ChevronUp } from "lucide-react";
import teethImage from "../../assets/teeth.png";
import { useParams } from "react-router-dom";
import api from "../../api";

const TreatmentPlan = () => {
  const teethNumbers = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46,
    45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];

  const rows_width = [
    71.5, 74, 73, 41, 40, 41, 39, 44, 44, 39, 41, 40, 41, 73, 73, 73, 81, 77,
    77, 41, 41, 40, 34, 33, 34, 33, 41, 41, 40, 77, 77, 81,
  ];

  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const { patientId } = useParams();
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await api.get(`/api/treatments/patient/${patientId}`);
        setTreatments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, [patientId]);

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
        <div style={{ flex: "2" }}>
          <TreatmentPlanServices />
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Detail</TableHead>
              <TableHead>Teeth</TableHead>
              <TableHead>Diagnostic</TableHead>
              <TableHead>Treatments</TableHead>
              <TableHead>Price (Base|Net)</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Appointment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {treatments.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell>Traitement General</TableCell>
                <TableCell>{treatment.teeth}</TableCell>
                <TableCell>{treatment.diagnostic.name}</TableCell>
                <TableCell>{treatment.treatment_name}</TableCell>
                <TableCell>{treatment.price}</TableCell>
                <TableCell>{treatment.notes}</TableCell>
                <TableCell>
                  <span className="flex items-center justify-center">
                    <CalendarPlus />
                  </span>
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger className="flex items-center gap-1">
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
                      <Pen size={16} />
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

const TreatmentPlanServices = () => {
  const [speciality, setSpeciality] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [subSubServices, setSubSubServices] = useState([]);

  useEffect(() => {
    const fetchSpeciality = async () => {
      try {
        const response1 = await api.get(`/api/specialities/`);
        const response2 = await api.get(`/api/dental-services/`);
        const response3 = await api.get(`/api/sub-category-services/`);
        const response4 = await api.get(`/api/sub-sub-category-services/`);
        setSpeciality(response1.data);
        setServices(response2.data);
        setSubServices(response3.data);
        setSubSubServices(response4.data);
      } catch (error) {
        console.error("Error fetching speciality:", error);
      }
    };

    fetchSpeciality();
  }, []);

  return (
    <>
      {speciality.map((sp) => (
        <Collapsible key={sp.id}>
          <CollapsibleTrigger>
            <div className="rounded-md border px-4 py-3 font-medium text-sm">
              <div className="flex gap-2">
                {sp.name}
                <ChevronDown />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4">
            {/* Content for speciality */}
            {services
              .filter((service) => service.speciality === sp.id)
              .map((service) => (
                <Collapsible key={service.id}>
                  <CollapsibleTrigger>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm bg-red-300">
                      <div className="flex gap-2">
                        {service.name}
                        <ChevronDown />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4">
                    {/* Content for service */}
                    {subServices
                      .filter(
                        (subService) =>
                          service.has_subcategories &&
                          subService.category === service.id
                      )
                      .map((subService) => (
                        <Collapsible key={subService.id}>
                          <CollapsibleTrigger>
                            <div className="rounded-md border px-4 py-3 font-mono text-sm bg-pink-300">
                              {subService.name}
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {/* Content for subService */}
                            {subSubServices
                              .filter(
                                (subSubService) =>
                                  subService.has_subcategories &&
                                  subSubService.subcategory === subService.id
                              )
                              .map((subSubService) => (
                                <Collapsible key={subSubService.id}>
                                  <CollapsibleTrigger>
                                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                      {subSubService.name}
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    {/* Content for subSubService */}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
};
