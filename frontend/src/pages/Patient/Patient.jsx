import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ACCESS_TOKEN } from "/src/constants";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function Patientt() {
  const { patientId } = useParams();

  const [activeTab, setActiveTab] = useState("patient-record");
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${activeTab}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // fetchData()
  }, [activeTab]);
  // Fetch patient data using the patientId
  // const patient = fetchPatientData(patientId);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <h1>Patient Information</h1>
          <p>Patient ID: {patientId}</p>
          {/* Render patient information, treatment plan, follow-up, etc. */}
        </main>
      </div>
    </div>
  );
}

export default function Patient() {
  const [activeTab, setActiveTab] = useState("patient-record");
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <div className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="md:text-xl font-bold">
              Ms. AMELLAL Asma, 30 years old
            </h1>
            <p className="text-sm lg:text-base">
              Listed price: | Done and in progress:{" "}
              <span className="text-primary">0.00 DA</span>| Total:{" "}
              <span className="text-primary">8,000.00 DA</span>| Unpaid:{" "}
              <span className="text-destructive">-8,000.00 DA</span>
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Patient Arrived</Button>
            <Button>Save</Button>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex space-x-2 mb-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted scrollbar-track-muted-foreground/10 md:overflow-x-hidden">
            <TabsTrigger
              value="patient-record"
              className={
                activeTab === "patient-record"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Patient Record
            </TabsTrigger>
            <TabsTrigger
              value="follow-up"
              className={
                activeTab === "follow-up"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Follow-up
            </TabsTrigger>
            <TabsTrigger
              value="finance"
              className={
                activeTab === "finance"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Finance
            </TabsTrigger>
            <TabsTrigger
              value="rendez-vous"
              className={
                activeTab === "rendez-vous"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Rendez-vous
            </TabsTrigger>
          </TabsList>
          <TabsContent value="patient-record">
            <Card className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-bold mb-2">
                    Personal Information
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="family-name">Family name *</Label>
                    <Input id="family-name" value="AMELLAL" />
                    <Label htmlFor="first-name">First name *</Label>
                    <Input id="first-name" value="Asma" />
                    <Label htmlFor="gender">Gender *</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        id="gender-man"
                        name="gender"
                        value="man"
                        className="h-5"
                      />
                      <Label htmlFor="gender-man">Man</Label>
                      <Input
                        type="radio"
                        id="gender-woman"
                        name="gender"
                        value="woman"
                        className="h-5"
                        defaultChecked
                      />
                      <Label htmlFor="gender-woman">Woman</Label>
                    </div>
                    <Label htmlFor="birthday">Birthday *</Label>
                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger id="day">
                          <SelectValue placeholder="07" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(31).keys()].map((day) => (
                            <SelectItem key={day} value={day + 1}>
                              {day + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="July" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ].map((month, index) => (
                            <SelectItem key={index} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="1994" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(100).keys()].map((year) => (
                            <SelectItem key={year} value={1920 + year}>
                              {1920 + year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Label htmlFor="cell-phone">Cell phone *</Label>
                    <Input id="cell-phone" value="0777-66-23-10" />
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" />
                    <Label htmlFor="address">Address *</Label>
                    <Input id="address" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-2">
                    Medical Information
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="special-health-concern">
                      Special health concern
                    </Label>
                    <Input id="special-health-concern" />
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" />
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" />
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" />
                  </div>
                  <h2 className="text-lg font-bold mb-2 mt-4">
                    More Information
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="sent-by">Sent by</Label>
                    <Input id="sent-by" />
                    <Label htmlFor="profession">Profession</Label>
                    <Input id="profession" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="follow-up">
            <Card>
              {/* <CardHeader>
                <CardTitle>Follow-up</CardTitle>
              </CardHeader> */}

              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-bold mb-2">
                    EndoBuccal Examinations
                  </h3>
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
                        <TableCell>
                          Patient responded well to treatment
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023-05-20 2:00 PM</TableCell>
                        <TableCell>Dr. Jane Smith</TableCell>
                        <TableCell>Cavity filling</TableCell>
                        <TableCell>
                          Patient reported no pain after procedure
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
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
          </TabsContent>
          <TabsContent value="finance">
            {/* <CardHeader>
              <CardTitle>Finance</CardTitle>
            </CardHeader> */}
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
          </TabsContent>
          <TabsContent value="rendez-vous">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Appointments</h2>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="hidden md:inline-flex">
                        New Appointment
                      </Button>
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
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button className="inline-flex md:hidden">
                        New Appointment
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>New Appointment</DrawerTitle>
                        <DrawerDescription>
                          Schedule a new appointment for the patient.
                        </DrawerDescription>
                      </DrawerHeader>
                      <form className="grid gap-4 p-4">
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
                      <DrawerFooter>
                        <Button type="submit">Save Appointment</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Dr. John Doe</TableCell>
                    <TableCell>2023-06-15</TableCell>
                    <TableCell>10:00 AM</TableCell>
                    <TableCell>11:00 AM</TableCell>
                    <TableCell>
                      <Badge variant="outline">Completed</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            className="visible"
                          >
                            <div className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Appointment</DropdownMenuItem>
                          <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dr. Jane Smith</TableCell>
                    <TableCell>2023-05-20</TableCell>
                    <TableCell>2:00 PM</TableCell>
                    <TableCell>3:00 PM</TableCell>
                    <TableCell>
                      <Badge variant="outline">Completed</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <div className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Appointment</DropdownMenuItem>
                          <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dr. John Doe</TableCell>
                    <TableCell>2023-04-10</TableCell>
                    <TableCell>9:00 AM</TableCell>
                    <TableCell>10:00 AM</TableCell>
                    <TableCell>
                      <Badge variant="outline">Cancelled</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <div className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Appointment</DropdownMenuItem>
                          <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

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
