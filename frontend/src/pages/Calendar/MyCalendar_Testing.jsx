// import React from "react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { set } from "date-fns";
// import { DatePickerWithPresets } from "./DatePickerWithPresets";

// // import { ArrowDownFromLineIcon } from "lucide-react";

// const MyCalendar_Testing = () => {
//   const hours = Array.from({ length: 16 }, (_, i) => 6 + i); // Hours from 6:00 to 22:00 (10 PM)
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   // Example event data
//   const events = [
//     {
//       day: 0, // Monday
//       startTime: 6, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       endTime: 9, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       formatedStartTime: "6:00",
//       formatedEndTime: "9:00",
//       title: "BOUZID Mohammed",
//       duration: "3h",
//       dentist: {
//         first_name: "Zakaria",
//         last_name: "ABDELAIDOUM",
//       },
//       color: "bg-green-600/60",
//       borderColor: "border-green-600",
//     },
//     {
//       day: 0, // Monday
//       startTime: 10, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       endTime: 12, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       title: "Umbrella Academy",
//       duration: "3h",
//       dentist: {
//         first_name: "Zakaria",
//         last_name: "ABDELAIDOUM",
//       },
//       color: "bg-green-600/60",
//       borderColor: "border-green-600",
//     },
//     {
//       day: 1, // Tuesday
//       startTime: 7, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       endTime: 7.5, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       formatedStartTime: "7:00",
//       formatedEndTime: "7:30",
//       title: "ABDELAIDOUM Amina",
//       duration: "30 min",
//       dentist: {
//         first_name: "Zakaria",
//         last_name: "ABDELAIDOUM",
//       },
//       color: "bg-purple-800/25",
//       borderColor: "border-purple-800/25",
//     },
//     {
//       day: 6, // Tuesday
//       startTime: 9.5, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       endTime: 10, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       formatedStartTime: "9:30",
//       formatedEndTime: "10:00",
//       title: "BELMOKHTAR Hayet",
//       duration: "30 min",
//       dentist: {
//         first_name: "Zakaria",
//         last_name: "ABDELAIDOUM",
//       },
//       color: "bg-red-600/40",
//       borderColor: "border-red-600/40",
//     },
//     {
//       day: 4, // Tuesday
//       startTime: 8.75, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       endTime: 9.25, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       formatedStartTime: "08:45",
//       formatedEndTime: "09:15",
//       title: "BELMOKHTAR Hayet",
//       duration: "30 min",
//       dentist: {
//         first_name: "Zakaria",
//         last_name: "ABDELAIDOUM",
//       },
//       color: "bg-red-600/40",
//       borderColor: "border-red-600/40",
//     },
//     {
//       day: 6, // Tuesday
//       startTime: 21, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       endTime: 22, //9:15 -> 9.25 -  9:30 -> 9.5 - 9:45 -> 9.75 => endMinute * 25 / 15
//       formatedStartTime: "21:00",
//       formatedEndTime: "22:00",
//       title: "BELMOKHTAR Hayet",
//       duration: "30 min",
//       dentist: {
//         first_name: "Zakaria",
//         last_name: "ABDELAIDOUM",
//       },
//       color: "bg-red-600/40",
//       borderColor: "border-red-600/40",
//     },
//     // Add more events as needed
//   ];

//   const EventComponent = ({ event }) => (
//     <Dialog>
//       <TooltipProvider>
//         <Tooltip delayDuration={0}>
//           <DialogTrigger>
//             <TooltipTrigger asChild>
//               <div
//                 className={`absolute text-sm w-full overflow-hidden left-0 ${event.color} border-t-4 ${event.borderColor} p-2 cursor-pointer`}
//                 style={{
//                   top: `${(event.startTime - 6) * 6}rem`,
//                   height: `${(event.endTime - event.startTime) * 6}rem`,
//                 }}
//               >
//                 {event.endTime - event.startTime > 1 ? (
//                   <>
//                     <div className="font-semibold">{event.title}</div>
//                     <div className="font-mono">
//                       {event.formatedStartTime} - {event.formatedEndTime}
//                     </div>
//                     <div>{event.duration}</div>
//                     <div>
//                       Dr.{" "}
//                       <span className="uppercase">
//                         {event.dentist.last_name}{" "}
//                       </span>
//                       <span>
//                         {event.dentist.first_name.charAt(0).toUpperCase() +
//                           event.dentist.first_name.slice(1)}
//                       </span>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="">
//                     <div className="text-[0.6rem] sm:text-xs text-left font-semibold text-nowrap tracking-tighter">{event.title}</div>
//                     <div className="text-xs sm:text-sm text-left text-nowrap font-mono">
//                       {event.formatedStartTime}-{event.formatedEndTime}
//                     </div>
//                     <div>{event.duration}</div>
//                     <div>
//                       Dr.{" "}
//                       <span className="uppercase">
//                         {event.dentist.last_name}{" "}
//                       </span>
//                       <span>
//                         {event.dentist.first_name.charAt(0).toUpperCase() +
//                           event.dentist.first_name.slice(1)}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </TooltipTrigger>
//           </DialogTrigger>
//           <TooltipContent className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40">
//             <div className="flex justify-between">
//               <span>
//                 {event.formatedStartTime} - {event.formatedEndTime}
//               </span>
//               <span>{event.duration}</span>
//             </div>
//             <div className="text-center text-xs">
//               Dr. <span className="uppercase">{event.dentist.last_name} </span>
//               <span>
//                 {event.dentist.first_name.charAt(0).toUpperCase() +
//                   event.dentist.first_name.slice(1)}
//               </span>
//             </div>
//           </TooltipContent>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Edit Appointment</DialogTitle>
//               <DialogDescription>
//                 Make changes to the appointment here. Click save when you're
//                 done.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="patient" className="text-right">
//                   Patient
//                 </Label>
//                 <Input
//                   id="patient"
//                   defaultValue={event.title}
//                   className="col-span-3"
//                   disabled
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="doctor" className="text-right">
//                   Doctor
//                 </Label>
//                 <Input
//                   id="doctor"
//                   defaultValue={
//                     "Dr." +
//                     event.dentist.last_name +
//                     " " +
//                     event.dentist.first_name
//                   }
//                   className="col-span-3"
//                   disabled
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="day" className="text-right">
//                   Day
//                 </Label>
//                 {/* convert the  */}
//                 <DatePickerWithPresets className="col-span-3"/>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 {/* col 1 */}
//                 <Label htmlFor="time" className="text-right">
//                   Time
//                 </Label>

//                 {/* Col 2 */}
//                 <div className="flex flex-col items-center justify-evenly h-full">
//                   <Label htmlFor="from" className="text-right">
//                     From:
//                   </Label>
//                   <Label htmlFor="to" className="text-right">
//                     To:
//                   </Label>
//                 </div>

//                 {/* col 3 */}
//                 <div className="col-span-2 flex flex-col items-center justify-evenly h-full">
//                   <Input
//                     id="from"
//                     defaultValue="10:00 AM"

//                   />
//                   <Input
//                     id="to"
//                     defaultValue="10:30 AM"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="submit">Save changes</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Tooltip>
//       </TooltipProvider>
//     </Dialog>
//   );

//   return (
//     <div className="p-4 overflow-x-scroll md:overflow-x-hidden">
//       <div className="min-w-max sm:py-4 sm:pl-14">
//         <div
//           className="grid gap-2"
//           style={{ gridTemplateColumns: "3em repeat(7, 1fr)" }}
//         >
//           <div></div>
//           {days.map((day, index) => (
//             <div key={index} className="text-center font-bold p-2">
//               <p className="text-sm md:text-base">{day}</p>
//               <p className="text-xs md:text-sm font-semibold text-muted-foreground">
//                 19.05
//               </p>
//             </div>
//           ))}
//         </div>
//         <div
//           className="grid gap-2"
//           style={{ gridTemplateColumns: "3em repeat(7, 1fr)" }}
//         >
//           <div className="grid grid-rows-16">
//             {hours.map((hour, index) => (
//               <div
//                 key={index}
//                 className="relative h-24 border-r border-gray-300"
//               >
//                 {/* Line indicator for primary hours (8:00 / 9:00 ...) */}
//                 {index > 0 && (
//                   <div className="absolute top-0 left-12 h-px w-[44rem] md:w-screen bg-gray-300 dark:bg-gray-700"></div>
//                 )}
//                 {/* Line indicator for secondary hours (8:30 / 9:30 ...) */}
//                 <div className="absolute top-1/2 left-12 h-px w-[44rem] md:w-screen bg-secondary"></div>

//                 <div className="absolute -top-2.5 right-0 pr-1 text-sm">
//                   {hour}:00
//                 </div>
//                 <div className="absolute top-1/4 w-1/4 border-t border-border"></div>
//                 <div className="absolute top-1/2 w-3/4 border-t border-border"></div>
//                 <div className="absolute top-3/4 w-1/4 border-t border-border"></div>
//               </div>
//             ))}
//           </div>
//           {days.map((_, dayIndex) => (
//             <div
//               key={dayIndex}
//               className="grid relative border-y-2"
//               style={{ gridTemplateRows: "repeat(16, min-content)" }}
//             >
//               {events
//                 .filter((event) => event.day === dayIndex)
//                 .map((event, index) => (
//                   <EventComponent key={index} event={event} />
//                 ))}

//               {/* <div className="absolute top-1/4 w-full border-t border-gray-200"></div> */}
//               {/* <div className="absolute top-1/2 w-full border-t border-gray-200"></div> */}
//               {/* <div className="absolute top-3/4 w-full border-t border-gray-200"></div> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCalendar_Testing;

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  format,
  startOfWeek,
  addDays,
  parseISO,
  setHours,
  setMinutes,
} from "date-fns";
import { DatePickerWithPresets } from "./DatePickerWithPresets";

const MyCalendar_Testing = () => {
  const hours = Array.from({ length: 16 }, (_, i) => 6 + i); // Hours from 6:00 to 22:00 (10 PM)

  // Get current week days
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 }); // Assuming the week starts on Monday
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  // Example event data with `day` as `Date`
  const events = [
    {
      day: parseISO("2024-07-01"), // Monday
      startTime: 6,
      endTime: 9,
      formatedStartTime: "6:00",
      formatedEndTime: "9:00",
      title: "BOUZID Mohammed",
      duration: "3h",
      dentist: {
        first_name: "Zakaria",
        last_name: "ABDELAIDOUM",
      },
      color: "bg-green-600/60",
      borderColor: "border-green-600",
    },
    {
      day: parseISO("2024-07-01"), // Monday
      startTime: 10,
      endTime: 12,
      title: "Umbrella Academy",
      duration: "3h",
      dentist: {
        first_name: "Zakaria",
        last_name: "ABDELAIDOUM",
      },
      color: "bg-green-600/60",
      borderColor: "border-green-600",
    },
    {
      day: parseISO("2024-07-02"), // Tuesday
      startTime: 7,
      endTime: 7.5,
      formatedStartTime: "7:00",
      formatedEndTime: "7:30",
      title: "ABDELAIDOUM Amina",
      duration: "30 min",
      dentist: {
        first_name: "Zakaria",
        last_name: "ABDELAIDOUM",
      },
      color: "bg-purple-800/60",
      borderColor: "border-purple-800/60",
    },
    // Add more events as needed
  ];

  const EventComponent = ({ event }) => (
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <DialogTrigger>
            <TooltipTrigger asChild>
              <div
                className={`absolute text-sm w-full overflow-hidden left-0 ${event.color} border-t-4 ${event.borderColor} p-2 cursor-pointer`}
                style={{
                  top: `${(event.startTime - 6) * 6}rem`,
                  height: `${(event.endTime - event.startTime) * 6}rem`,
                }}
              >
                {event.endTime - event.startTime > 1 ? (
                  <>
                    <div className="font-semibold">{event.title}</div>
                    <div className="font-mono">
                      {event.formatedStartTime} - {event.formatedEndTime}
                    </div>
                    <div>{event.duration}</div>
                    <div>
                      Dr.{" "}
                      <span className="uppercase">
                        {event.dentist.last_name}{" "}
                      </span>
                      <span>
                        {event.dentist.first_name.charAt(0).toUpperCase() +
                          event.dentist.first_name.slice(1)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="">
                    <div className="text-[0.6rem] sm:text-xs text-left font-semibold text-nowrap tracking-tighter">
                      {event.title}
                    </div>
                    <div className="text-xs sm:text-sm text-left text-nowrap font-mono">
                      {event.formatedStartTime}-{event.formatedEndTime}
                    </div>
                    <div>{event.duration}</div>
                    <div>
                      Dr.{" "}
                      <span className="uppercase">
                        {event.dentist.last_name}{" "}
                      </span>
                      <span>
                        {event.dentist.first_name.charAt(0).toUpperCase() +
                          event.dentist.first_name.slice(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40">
            <div className="flex justify-between">
              <span>
                {event.formatedStartTime} - {event.formatedEndTime}
              </span>
              <span>{event.duration}</span>
            </div>
            <div className="text-center text-xs">
              Dr. <span className="uppercase">{event.dentist.last_name} </span>
              <span>
                {event.dentist.first_name.charAt(0).toUpperCase() +
                  event.dentist.first_name.slice(1)}
              </span>
            </div>
          </TooltipContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
              <DialogDescription>
                Make changes to the appointment here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  Patient
                </Label>
                <Input
                  id="patient"
                  defaultValue={event.title}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Doctor
                </Label>
                <Input
                  id="doctor"
                  defaultValue={
                    "Dr." +
                    event.dentist.last_name +
                    " " +
                    event.dentist.first_name
                  }
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">
                  Day
                </Label>
                <DatePickerWithPresets className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <div className="flex flex-col items-center justify-evenly h-full">
                  <Label htmlFor="from" className="text-right">
                    From:
                  </Label>
                  <Label htmlFor="to" className="text-right">
                    To:
                  </Label>
                </div>
                <div className="col-span-2 flex flex-col items-center justify-evenly h-full">
                  <Input id="from" defaultValue="10:00 AM" />
                  <Input
                    id="to"
                    defaultValue="10:30 AM"
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Tooltip>
      </TooltipProvider>
    </Dialog>
  );

  return (
    <div className="p-4 overflow-x-scroll md:overflow-x-hidden">
      <div className="min-w-max sm:py-4 sm:pl-14">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "3em repeat(7, 1fr)" }}
        >
          <div></div>
          {days.map((day, index) => (
            <div key={index} className="text-center font-bold p-2">
              <p className="text-sm md:text-base">{format(day, "EEEE")}</p>
              <p className="text-xs md:text-sm font-semibold text-muted-foreground">
                {format(day, "dd/MM")}
              </p>
            </div>
          ))}
        </div>
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "3em repeat(7, 1fr)" }}
        >
          <div className="grid grid-rows-16">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="relative h-24 border-r border-gray-300"
              >
                {index > 0 && (
                  <div className="absolute top-0 left-12 h-px w-[44rem] md:w-screen bg-gray-300 dark:bg-gray-700"></div>
                )}
                <div className="absolute top-1/2 left-12 h-px w-[44rem] md:w-screen bg-secondary"></div>
                <div className="absolute -top-2.5 right-0 pr-1 text-sm">
                  {hour}:00
                </div>
                <div className="absolute top-1/4 w-1/4 border-t border-border"></div>
                <div className="absolute top-1/2 w-3/4 border-t border-border"></div>
                <div className="absolute top-3/4 w-1/4 border-t border-border"></div>
              </div>
            ))}
          </div>
          {days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`grid relative border-y-2 ${
                dayIndex == 5 && "bg-secondary"
              }`}
              style={{ gridTemplateRows: "repeat(16, min-content)" }}
            >
              {events
                .filter(
                  (event) =>
                    format(event.day, "yyyy-MM-dd") ===
                    format(day, "yyyy-MM-dd")
                )
                .map((event, index) => (
                  <EventComponent key={index} event={event} />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar_Testing;
