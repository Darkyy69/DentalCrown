import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "../../api";
import { useToast } from "@/components/ui/use-toast";
import PatientContext, { PatientProvider } from "../../context/PatientProvider";
import { useEffect, useContext, useState } from "react";

const PatientRecord = () => {
  const { toast } = useToast();
  const { patientInfo } = useContext(PatientContext);
  console.log(patientInfo);
  const [familyName, setFamilyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [cellPhone, setCellPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specialHealthConcern, setSpecialHealthConcern] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (patientInfo) {
      setFamilyName(patientInfo.last_name);
      setFirstName(patientInfo.first_name);
      setGender(patientInfo.gender);
      setBirthday({
        day: patientInfo.date_of_birth
          ? patientInfo.date_of_birth.split("-")[2]
          : "",
        month: patientInfo.date_of_birth
          ? patientInfo.date_of_birth.split("-")[1]
          : "",
        year: patientInfo.date_of_birth
          ? patientInfo.date_of_birth.split("-")[0]
          : "",
      });
      setCellPhone(patientInfo.phone_number);
      setEmail(patientInfo.email);
      setAddress(patientInfo.address);
      setSpecialHealthConcern(patientInfo.specialHealthConcern);
      setNotes(patientInfo.notes);
    }
  }, [patientInfo]);

  const handleSave = () => {
    const data = {
      familyName,
      firstName,
      gender,
      birthday,
      cellPhone,
      email,
      address,
      specialHealthConcern,
      notes,
    };

    api
      .post("/fake-url", data)
      .then(() => {
        toast({
          variant: "success",
          title: "Data saved",
          description: "Patient record has been saved successfully",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error saving patient record",
        });
      });
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Personal Information</h2>
          <div className="space-y-2">
            <Label htmlFor="family-name">Family name *</Label>
            <Input
              id="family-name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
            <Label htmlFor="first-name">First name *</Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Label htmlFor="gender">Gender *</Label>
            <RadioGroup
              className="flex items-center space-x-2"
              onValueChange={(value) => setGender(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="M"
                  id="gender-man"
                  checked={gender === "M"}
                />
                <Label htmlFor="gender-man">Man</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="W"
                  id="gender-woman"
                  checked={gender === "W"}
                />
                <Label htmlFor="gender-woman">Woman</Label>
              </div>
            </RadioGroup>
            <Label htmlFor="birthday">Birthday *</Label>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger id="day">
                  <SelectValue
                    value={birthday.day}
                    onChange={(value) =>
                      setBirthday((prev) => ({ ...prev, day: value }))
                    }
                  />
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
                  <SelectValue
                    placeholder="July"
                    value={birthday.month}
                    onChange={(value) =>
                      setBirthday((prev) => ({ ...prev, month: value }))
                    }
                  />
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
                  <SelectValue
                    placeholder="1994"
                    value={birthday.year}
                    onChange={(value) =>
                      setBirthday((prev) => ({ ...prev, year: value }))
                    }
                  />
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
            <Input
              id="cell-phone"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Medical Information</h2>
          <div className="space-y-2">
            <Label htmlFor="special-health-concern">
              Special health concern
            </Label>
            <Input
              id="special-health-concern"
              value={specialHealthConcern}
              onChange={(e) => setSpecialHealthConcern(e.target.value)}
            />
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button onClick={handleSave}>Save</Button>
    </Card>
  );
};


export default PatientRecord;
