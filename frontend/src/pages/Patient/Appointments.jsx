import { Card } from "@/components/ui/card";
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
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="inline-flex md:hidden">New Appointment</Button>
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
      <Table className="text-nowrap">
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
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <Ellipsis />
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
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <Ellipsis />
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
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <Ellipsis />
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
  );
};

export default Appointments;
