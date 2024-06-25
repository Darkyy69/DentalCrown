import React, { useState } from "react";
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

const Calendar = () => {
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

  const options = [
    { value: 1, label: "Dr Abdelaidoum Zakaria" },
    { value: 2, label: "Dr John Johns" },
    { value: 3, label: "Dr Derba" },
  ];

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

export default Calendar;
