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

const PatientRecord = () => {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Personal Information</h2>
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
          <h2 className="text-lg font-bold mb-2">Medical Information</h2>
          <div className="space-y-2">
            <Label htmlFor="special-health-concern">
              Special health concern
            </Label>
            <Input id="special-health-concern" />
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientRecord;
