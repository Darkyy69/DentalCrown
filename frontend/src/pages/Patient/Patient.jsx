import { useState, useContext, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PatientRecord from "./PatientRecord";
import FollowUp from "./FollowUp";
import Finance from "./Finance";
import Appointments from "./Appointments";
import PatientContext, { PatientProvider } from "../../context/PatientProvider";
import { useParams } from "react-router-dom";

export default function Patient() {
  const [activeTab, setActiveTab] = useState("patient-record");
  const { patientInfo } = useContext(PatientContext);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <div className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="md:text-xl font-bold">
              {patientInfo
                ? `${patientInfo.full_name}, ${patientInfo.date_of_birth} years old`
                : "Loading..."}
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
            <PatientRecord />
          </TabsContent>
          <TabsContent value="follow-up">
            <FollowUp />
          </TabsContent>
          <TabsContent value="finance">
            <Finance />
          </TabsContent>
          <TabsContent value="rendez-vous">
            <Appointments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
