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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarPlus, Pen, ChevronLeft, ChevronDown } from "lucide-react";
import teethImage from "../../assets/teeth.png";
import { useParams } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN } from "/src/constants";
import { useToast } from "@/components/ui/use-toast"
import { jwtDecode } from "jwt-decode";

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
        <div
          className="h-[475px] overflow-y-scroll text-right"
          style={{ flex: "2" }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">General Info</CardTitle>
              <CardDescription className="text-center">
                Card Description for later...
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p>Card Content</p> */}
              <TreatmentPlanServices
                patientId={patientId}
                selectedTeeth={selectedTeeth}
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
                <TableCell>{treatment.teeth.join(", ")}</TableCell>
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

const TreatmentPlanServices = ({ patientId, selectedTeeth }) => {
  const [speciality, setSpeciality] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [subSubServices, setSubSubServices] = useState([]);
  const [openItems, setOpenItems] = useState({}); // State to track open/closed state
  const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
  const { toast } = useToast();

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

  const handleToggle = (id) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id], // Toggle the open state
    }));
  };

  const createTreatment = async (service, options = {}) => {
    console.log("service name: " + service.name);
    var treatment_name = service.name;
    const { subService = null, subSubService = null } = options;

    if (subService) {
      treatment_name = treatment_name + " - " + subService.name;
    }
    if (subSubService) {
      treatment_name = treatment_name + " - " + subSubService.name;
    }
    const general_treatments = ["Consultation générale", "Détartrage"];
    const data = {
      patient: patientId,
      dentist: token.user_id,
      teeth: selectedTeeth,
      diagnostic: "2",
      notes: "",
      price: 2000,
      treatment_name: treatment_name,
      status: "P",
    };
    console.log(service);
    console.log(data);
    if (data.teeth.length === 0 && general_treatments.includes(service.name)) {
      try {
        const response = await api.post(`/api/treatments/`, data);
        console.log(response.data);
        toast({
        variant: "success",
        title: "Success",
        description: "Successs: you must select at least a tooth first for this type of treatment!",
      });
      } catch (error) {
        console.error("Error fetching treatments:", error);
        toast({
        variant: "destructive",
        title: "Error",
        description: "Error: ",
      });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error: you must select at least a tooth first for this type of treatment!",
      });
    }
  };
  return (
    <>
      {speciality.map((sp) => (
        <Collapsible key={sp.id}>
          <CollapsibleTrigger
            onClick={() => handleToggle(sp.id)}
            className="w-full"
          >
            <div className="rounded-md border px-4 py-3 mb-1 font-medium text-sm">
              <div className="flex justify-between items-center">
                <span>{sp.name}</span>
                {openItems[sp.id] ? <ChevronDown /> : <ChevronLeft />}
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className="CollapsibleContent"
            open={openItems[sp.id]}
          >
            {services
              .filter((service) => service.speciality === sp.id)
              .map((service) => (
                <Collapsible key={service.id}>
                  <CollapsibleTrigger
                    className="w-4/5"
                    onClick={() => handleToggle(service.id)}
                  >
                    <div
                      className="rounded-md border px-4 py-3 font-medium text-sm bg-red-300"
                      onClick={() => {
                        if (!service.has_subcategories) {
                          console.log("creating treatment...");
                          createTreatment(service);
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span>{service.name}</span>
                        {service.has_subcategories &&
                          (openItems[service.id] ? (
                            <ChevronDown />
                          ) : (
                            <ChevronLeft />
                          ))}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent
                    className="ml-4 CollapsibleContent"
                    open={openItems[service.id]}
                  >
                    {subServices
                      .filter(
                        (subService) =>
                          service.has_subcategories &&
                          subService.category === service.id
                      )
                      .map((subService) => (
                        <Collapsible key={subService.id}>
                          <CollapsibleTrigger
                            className="w-3/5"
                            onClick={() => handleToggle(subService.id)}
                          >
                            <div
                              className="rounded-md border px-4 py-3 font-medium text-sm bg-pink-300"
                              onClick={() => {
                                if (!subService.has_subcategories) {
                                  console.log("creating treatment...");
                                  createTreatment(service, {
                                    subService: subService,
                                  });
                                }
                              }}
                            >
                              <div className="flex justify-between items-center">
                                <span>{subService.name}</span>
                                {subService.has_subcategories &&
                                  (openItems[subService.id] ? (
                                    <ChevronDown />
                                  ) : (
                                    <ChevronLeft />
                                  ))}
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent
                            className="CollapsibleContent"
                            open={openItems[subService.id]}
                          >
                            {subSubServices
                              .filter(
                                (subSubService) =>
                                  subService.has_subcategories &&
                                  subSubService.subcategory === subService.id
                              )
                              .map((subSubService) => (
                                <Collapsible key={subSubService.id}>
                                  <CollapsibleTrigger
                                    className="w-2/5"
                                    onClick={() =>
                                      handleToggle(subSubService.id)
                                    }
                                  >
                                    <div
                                      className="rounded-md border px-4 py-3 font-medium text-sm bg-purple-400"
                                      onClick={() => {
                                        console.log("creating treatment...");
                                        createTreatment(service, {
                                          subService: subService,
                                          subSubService: subSubService,
                                        });
                                      }}
                                    >
                                      {subSubService.name}
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent
                                    className="CollapsibleContent"
                                    open={openItems[subSubService.id]}
                                  >
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
