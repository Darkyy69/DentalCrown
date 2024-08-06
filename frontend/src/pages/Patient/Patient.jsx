import { useState, useContext, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PatientRecord from "./PatientRecord";
import FollowUp from "./FollowUp";
import Finance from "./Finance";
import Appointments from "./Appointments";
import PatientContext, { PatientProvider } from "../../context/PatientProvider";
import TreatmentPlan from "./TreatmentPlan";

export default function Patient() {
  const [activeTab, setActiveTab] = useState("patient-record");
  const { patientInfo } = useContext(PatientContext);
  const currency = "DA";
  const handleSave = () => {
    // Implement the save logic here
    console.log("Save button clicked ");
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <div className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="md:text-xl font-bold">
              {patientInfo
                ? `${patientInfo.full_name}, ${patientInfo.age} years old`
                : "Loading..."}
            </h1>
            <p className="text-sm lg:text-base">
              Total Amount:{" "}
              <span className="text-primary">
                {patientInfo.total_treatment_amount}{currency}{" "}
              </span>
              | Paid:{" "}
              <span className="text-primary">{patientInfo.payed}{currency}{" "}</span>|
              Unpaid:{" "}
              <span className="text-destructive">{patientInfo.left_to_pay}{currency}</span>
            </p>
          </div>
          <Button onClick={handleSave}>Save</Button>
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
              Follow Up
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
              value="appointments"
              className={
                activeTab === "appointments"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="treatment-plan"
              className={
                activeTab === "treatment-plan"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Treatment Plan
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
          <TabsContent value="appointments">
            <Appointments />
          </TabsContent>
          <TabsContent value="treatment-plan">
            <TreatmentPlan />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
