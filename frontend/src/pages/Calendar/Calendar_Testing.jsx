import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Calendar_Testing = () => {
  const hours = Array.from({ length: 16 }, (_, i) => 6 + i); // Hours from 6:00 to 22:00 (10 PM)
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Example event data
  const events = [
    {
      day: 0, // Monday
      startTime: 6,
      endTime: 9,
      title: "Walleye",
      duration: "3h",
      type: "Game",
      color: "bg-green-100",
    },
    {
      day: 0, // Monday
      startTime: 10,
      endTime: 12,
      title: "Walleye",
      duration: "3h",
      type: "Game",
      color: "bg-green-100",
    },
    {
      day: 1, // Tuesday
      startTime: 7,
      endTime: 10,
      title: "Walleye",
      duration: "3h",
      type: "Game",
      color: "bg-green-100",
    },
    {
      day: 6, // Tuesday
      startTime: 9.3,
      endTime: 10,
      title: "BELMOKHTAR Hayet",
      duration: "30 min",
      type: "Dr. ABDELAIDOUM Zakaria",
      color: "bg-red-600/40",
    },
    // Add more events as needed
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <div className="min-w-max sm:py-4 sm:pl-14">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "3em repeat(7, 1fr)" }}
        >
          <div></div>
          {days.map((day, index) => (
            <div key={index} className="text-center font-bold p-2">
              <p className="text-sm md:text-base">{day}</p>
              <p className="text-xs md:text-sm font-semibold text-muted-foreground">
                19.05
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
                className="relative h-16 md:h-24 border-r border-gray-300"
              >
                {/* <div class="absolute top-0 right-0 h-0.5 w-1/2 bg-gray-500"></div> */}
                <div className="absolute -top-2.5 right-0 pr-1 text-sm">
                  {hour}:00
                </div>
                <div className="absolute top-1/4 w-1/4 border-t border-gray-300"></div>
                <div className="absolute top-1/2 w-3/4 border-t border-gray-300"></div>
                <div className="absolute top-3/4 w-1/4 border-t border-gray-300"></div>
              </div>
            ))}
          </div>
          {days.map((_, dayIndex) => (
            <div
              key={dayIndex}
              className="grid relative border-y-2"
              style={{ gridTemplateRows: "repeat(16, min-content)" }}
            >
              {/* {hours.map((_, hourIndex) => (
                <div
                  key={hourIndex}
                  className="relative h-full md:h-full border-t border-gray-400 hover:bg-gray-100 cursor-pointer"
                > */}
              {events
                .filter((event) => event.day === dayIndex)
                .map((event, index) => (
                  <div
                    key={index}
                    className={`absolute left-0 ${event.color} border-t-4 border-green-500 p-2`}
                    style={{
                      top: `${(event.startTime - 6) * 6}rem`,
                      height: `${(event.endTime - event.startTime) * 6}rem`,
                    }}
                  >
                    <div className="font-bold">{event.title}</div>
                    <div>
                      {event.startTime} - {event.endTime}
                    </div>
                    <div>{event.duration}</div>
                    <div>{event.type}</div>
                  </div>
                ))}
              <Collapsible className={`absolute left-0 `}>
                <CollapsibleTrigger>
                  <span className="w-full rounded-md border px-1 py-1 font-mono text-sm bg-red-600/40">
                    9:30am 10:30am
                  </span>
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
              {/* <div className="absolute top-1/4 w-full border-t border-gray-200"></div> */}
              {/* <div className="absolute top-1/2 w-full border-t border-gray-200"></div> */}
              {/* <div className="absolute top-3/4 w-full border-t border-gray-200"></div> */}
              {/* </div> */}
              {/* ))}  */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar_Testing;
