import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { UserPlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import client from "./axiosClient";

export default function AddNewPatient() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [dentists, setDentists] = React.useState([]); // set initial state of dentists to [
  const { auth } = useAuth();
  const user = auth?.user || {}; // get user from auth object if it exists or use empty object

  const fetchDentists = async () => {
    try {
      const response = await client.get("/api/users/");
      // filter response data to only include dentists (role == dentist) and set it to dentists state
      setDentists(
        response.data.filter(
          (dentist) => dentist.role === "dentist" || dentist.role === "admin"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    // fetch all the dentists from the backend using client.get in a try catch block
    fetchDentists();
  }, []);

  React.useEffect(() => {
    client
      .get("/csrf/")
      .then((response) => {
        const csrfToken = response.data.csrfToken;
        client.defaults.headers.post["X-CSRFToken"] = csrfToken;
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Make changes here. Click <b>Add Patient</b> when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm dentists={dentists} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Patient</DrawerTitle>
          <DrawerDescription>
            Make changes here. Click <b>Add Patient</b> when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" dentists={dentists} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, dentists }) {
  const [formData, setFormData] = React.useState({
    last_name: "",
    first_name: "",
    gender: "M",
    date_of_birth: "",
    phone_number: "0000000000",
    dentist: "",
    email: "",
    address: "",
  });

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/api/patients/", formData);
      console.log("Patient added successfully:", response.data);
      // Optionally, you can handle success state or reset the form here
    } catch (error) {
      console.error("Error adding patient:", error);
      // Handle error state if needed
    }
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-2">
        <Label className="flex items-center" htmlFor="last_name">
          Last name *
        </Label>
        <Input
          type="text"
          id="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Label className="flex items-center" htmlFor="first_name">
          First Name *
        </Label>
        <Input
          id="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Label htmlFor="gender">Gender *</Label>
        <RadioGroup
          className="grid grid-cols-2"
          value={formData.gender}
          onValueChange={(value) => handleChange("gender", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="M"
              id="M"
              checked={formData.gender === "M"}
            />
            <Label htmlFor="M">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="F"
              id="F"
              checked={formData.gender === "F"}
            />
            <Label htmlFor="F">Female</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Label className="flex items-center" htmlFor="date_of_birth">
          Date of birth *
        </Label>
        <Input
          type="date"
          id="date_of_birth"
          value={formData.date_of_birth}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Label className="flex items-center" htmlFor="phone_number">
          Phone Number *
        </Label>
        <Input
          type="tel"
          id="phone_number"
          maxLength={10}
          onClick={(e) => e.target.select()}
          value={formData.phone_number}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Label className="flex items-center" htmlFor="dentist">
          Dentist *
        </Label>
        <Select
          value={formData.dentist}
          onValueChange={(value) => handleChange("dentist", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Responsible Dentist" />
          </SelectTrigger>
          <SelectContent>
            {dentists.map((dentist) => (
              <SelectItem key={dentist.id} value={dentist.id.toString()}>
                Dr. <span className="uppercase">{dentist.last_name}</span>{" "}
                <span>
                  {dentist.first_name.charAt(0).toUpperCase() +
                    dentist.first_name.slice(1)}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <div className="flex gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="abc@xyz.com"
              value={formData.email}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              type="address"
              id="address"
              placeholder="Cite el nedjma 07 eme tranche, sidi chami"
              value={formData.address}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button type="submit">Add Patient</Button>
    </form>
  );
}
