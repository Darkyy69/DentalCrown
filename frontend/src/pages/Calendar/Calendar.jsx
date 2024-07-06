import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Calendar } from "@/components/ui/calendar";
import { DatePickerDemo } from "./DatePicker";

// import { Table } from "lucide-rect";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import "tailwindcss/tailwind.css";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const options = [
  { value: 1, label: "Dr Abdelaidoum Zakaria" },
  { value: 2, label: "Dr John Johns" },
  { value: 3, label: "Dr Derba" },
];

const CalendarTest = () => {
  const [selectedDentists, setSelectedDentists] = useState([]);
  //   const [selectedOptions, setSelectedOptions] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2022-01-01",
      time: "09:00 AM",
      patient: "John Doe",
      dentist: "Dentist 1",
      dentistId: 1,
    },
    {
      id: 2,
      date: "2022-01-01",
      time: "10:00 AM",
      patient: "Jane Smith",
      dentist: "Dentist 2",
      dentistId: 2,
    },
  ]);

  // Handler for when options are selected
  const handleDentistSelectChange = (selected) => {
    console.log(selected);
    setSelectedDentists(selected);
  };

  // Remove the unused function declaration
  const handleDentistSelection = (dentistId) => {
    if (selectedDentists.includes(dentistId)) {
      setSelectedDentists(selectedDentists.filter((id) => id !== dentistId));
    } else {
      setSelectedDentists([...selectedDentists, dentistId]);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Fetch appointments data and store it in a state variable

  // Filter appointments based on selected date, dentist, etc.

  // Render the table or list based on the view mode and filtered appointments

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="flex items-center">
            <label htmlFor="dentist-select" className="mr-2">
              Select Dentists:
            </label>
            <Select
              className="flex-1"
              id="dentist-select"
              options={options}
              onChange={handleDentistSelectChange}
              isMulti
              classNamePrefix="select"
              placeholder="Select a Dentist"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="view-mode-select" className="mr-2">
              View Mode:
            </label>
            <Select
              className="w-32"
              id="view-mode-select"
              defaultValue={{ value: "table", label: "Table" }}
              options={[
                { value: "table", label: "Table" },
                { value: "list", label: "List" },
              ]}
              onChange={(selectedOption) =>
                handleViewModeChange(selectedOption.value)
              }
            />
          </div>
          {viewMode === "table" ? (
            <table>
              <thead>
                <tr className="text-left">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Dentist</th>
                </tr>
              </thead>
              <tbody>
                {/* Render table rows based on filtered appointments */}
                {selectedDentists.length === 0 ? (
                  <>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.patient}</td>
                        <td>{appointment.dentist}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {selectedDentists.map((dentist) => {
                      // render the rows based on the selected dentists
                      return appointments
                        .filter(
                          (appointment) =>
                            +appointment.dentistId === +dentist.value
                        )
                        .map((appointment) => (
                          <tr key={appointment.id}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.patient}</td>
                            <td>{appointment.dentist}</td>
                          </tr>
                        ));
                    })}
                  </>
                )}
              </tbody>
            </table>
          ) : (
            <ul>
              {selectedDentists.length === 0 ? (
                <>
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex gap-4">
                      <p>{appointment.date}</p>
                      <p>{appointment.time}</p>
                      <p>{appointment.patient}</p>
                      <p>{appointment.dentist}</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {selectedDentists.map((dentist) => {
                    // render the rows based on the selected dentists
                    return appointments
                      .filter(
                        (appointment) =>
                          +appointment.dentistId === +dentist.value
                      )
                      .map((appointment) => (
                        <li key={appointment.id} className="flex gap-4">
                          <p>{appointment.date}</p>
                          <p>{appointment.time}</p>
                          <p>{appointment.patient}</p>
                          <p>{appointment.dentist}</p>
                        </li>
                      ));
                  })}
                </>
              )}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
};

export default CalendarTest;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

export const Schedule = () => {
  const [date, setDate] = React.useState(new Date());
  const [selectedCalendarFilter, setSelectedCalendarFilter] =
    React.useState("week");
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const daysInMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  const handleDayClick = (day) => {
    console.log(day);
  };

  const renderCalendar = () => {
    const days = [];

    if (selectedCalendarFilter === "month") {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const startWeek = startOfWeek(start);
      const endWeek = endOfWeek(end);

      for (let day = startWeek; day <= endWeek; day = addDays(day, 1)) {
        days.push(
          <div
            key={day}
            className={`p-2 border transition duration-300 ease-in-out hover:bg-secondary hover:scale-105 ${
              !isSameMonth(day, currentDate) && "text-muted-foreground"
            }`}
            onClick={() => handleDayClick(day)}
          >
            <div className="flex justify-between font-semibold">
              <span>{format(day, "d")}</span>
              {day <= endOfWeek(start) && (
                <span>{daysOfWeek[day.getDay()]}</span>
              )}
            </div>
            <div className="mt-2 text-center space-y-1 text-xs">
              <Collapsible>
                <CollapsibleTrigger>
                  <span className="font-bold">4+</span> Appointments{" "}
                  <span className="text-primary font-bold">View</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="rounded-md border px-1 py-1 font-mono text-sm bg-red-600/40">
                    9:30am BELMOKHTAR Hayet - 30 min
                  </div>
                  <div className="rounded-md border px-1 py-1 font-mono text-sm bg-green-600/40">
                    10am BELKHOUDJA Nazim - 30 min
                  </div>
                  <div className="rounded-md border px-1 py-1 font-mono text-sm bg-purple-800/25">
                    2pm IBRIR Yacine - 60 min
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        );
      }
      return days;
    }

    if (selectedCalendarFilter === "week") {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);

      for (let day = start; day <= end; day = addDays(day, 1)) {
        days.push(
          <div
            key={day}
            className={`p-2 border transition duration-300 ease-in-out hover:bg-secondary hover:scale-105 ${
              !isSameMonth(day, currentDate) && "text-muted-foreground"
            }`}
            onClick={() => handleDayClick(day)}
          >
            <div className="flex justify-between font-semibold">
              <span>{format(day, "d")}</span>
              {day <= endOfWeek(start) && (
                <span>{daysOfWeek[day.getDay()]}</span>
              )}
            </div>
            <div className="mt-2 text-center space-y-1 text-xs">
              <Collapsible>
                <CollapsibleTrigger>
                  <span className="font-bold">4+</span> Appointments{" "}
                  <span className="text-primary font-bold">View</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="rounded-md border px-1 py-1 font-mono text-sm bg-red-600/40">
                    9:30am BELMOKHTAR Hayet - 30 min
                  </div>
                  <div className="rounded-md border px-1 py-1 font-mono text-sm bg-green-600/40">
                    10am BELKHOUDJA Nazim - 30 min
                  </div>
                  <div className="rounded-md border px-1 py-1 font-mono text-sm bg-purple-800/25">
                    2pm IBRIR Yacine - 60 min
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        );
      }
      return days;
    }

    if (selectedCalendarFilter === "day") {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);

      for (let day = start; day <= end; day = addDays(day, 1)) {
      if (isSameDay(day, currentDate)) {
        days.push(
        <div
          key={day}
          className={`p-2 border transition duration-300 ease-in-out hover:bg-secondary hover:scale-105 ${
          !isSameMonth(day, currentDate) && "text-muted-foreground"
          }`}
          onClick={() => handleDayClick(day)}
        >
          <div className="flex justify-between font-semibold">
          <span>{format(day, "d")}</span>
          {day <= endOfWeek(start) && (
            <span>{daysOfWeek[day.getDay()]}</span>
          )}
          </div>
          <div className="mt-2 text-center space-y-1 text-xs">
          <Collapsible>
            <CollapsibleTrigger>
            <span className="font-bold">4+</span> Appointments{" "}
            <span className="text-primary font-bold">View</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
            <div className="rounded-md border px-1 py-1 font-mono text-sm bg-red-600/40">
              9:30am BELMOKHTAR Hayet - 30 min
            </div>
            <div className="rounded-md border px-1 py-1 font-mono text-sm bg-green-600/40">
              10am BELKHOUDJA Nazim - 30 min
            </div>
            <div className="rounded-md border px-1 py-1 font-mono text-sm bg-purple-800/25">
              2pm IBRIR Yacine - 60 min
            </div>
            </CollapsibleContent>
          </Collapsible>
          </div>
        </div>
        );
      }
      }
      return days;
    }
  };

  const handleCalendarFilterChange = (selected) => {
    setSelectedCalendarFilter(selected);
  };

  return (
    <div className="flex h-dvh w-full flex-col bg-background ">
      <div className="flex h-dvh flex-col sm:gap-4 sm:py-4 sm:pl-14 ">
        <main className="flex h-dvh flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-4 ">
          <div className="">
            {/* TODO : fix the toggleGroup of shadcn or make something that looks like that from scratch */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <Select
                className="text-base grow"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "100%",
                    color: "red",

                    backgroundColor: "bg-background",
                  }),
                }}
                id="dentist-select"
                options={options}
                // onChange={handleDentistSelectChange}
                isMulti
                classNamePrefix="select"
                placeholder="Select a Dentist"
              />
              <div className="flex border rounded">
                <Button
                  variant="ghost"
                  className={`rounded-none ${
                    selectedCalendarFilter === "month"
                      ? "bg-secondary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => handleCalendarFilterChange("month")}
                >
                  Month
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-none ${
                    selectedCalendarFilter === "week"
                      ? "bg-secondary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => handleCalendarFilterChange("week")}
                >
                  Week
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-none ${
                    selectedCalendarFilter === "day"
                      ? "bg-secondary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => handleCalendarFilterChange("day")}
                >
                  Day
                </Button>
              </div>
            </div>
          </div>
          <div className="h-full w-full flex-1 overflow-hidden overflow-y-scroll">
            <Card>
              <CardHeader className="flex">
                <CardTitle className="flex justify-between">
                  <DatePickerDemo />

                  <div className="flex gap-2 items-center">
                    <Button variant="outline" size="icon">
                      &#60;
                    </Button>
                    <Button variant="outline" size="icon">
                      &#62;
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
