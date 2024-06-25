import React, { useState } from "react";
import { Calendar, Filter, List, Table } from "lucide-react";
import { format } from "date-fns";

const MyCalendar = () => {
  const [view, setView] = useState("table");
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const appointments = [
    { id: 1, date: new Date(), patient: "John Doe" },
    { id: 2, date: new Date(), patient: "Jane Smith" },
    // Add more appointments here
  ];

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.date.toISOString().includes(filter)
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="">
            <div className="flex items-center mb-4">
              <Calendar className="mr-2" />
              <h2 className="text-xl font-bold">My Calendar</h2>
            </div>

            <div className="flex items-center mb-4">
              <Filter className="mr-2" />
              <input
                type="text"
                placeholder="Filter by date..."
                value={filter}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="flex items-center mb-4">
              <List
                className={`mr-2 cursor-pointer ${
                  view === "list" ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => handleViewChange("list")}
              />
              <Table
                className={`mr-2 cursor-pointer ${
                  view === "table" ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => handleViewChange("table")}
              />
            </div>

            {view === "list" ? (
              <ul>
                {filteredAppointments.map((appointment) => (
                  <li key={appointment.id}>
                    <p>{format(appointment.date, "MMMM dd, yyyy")}</p>
                    <p>{appointment.patient}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Patient</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{format(appointment.date, "MMMM dd, yyyy")}</td>
                      <td>{appointment.patient}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyCalendar;
