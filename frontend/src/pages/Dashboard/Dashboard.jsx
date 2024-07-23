import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider,
// } from "@/components/ui/tooltip";

// import {
//   ChevronLeft,
//   ChevronRight,
//   Copy,
//   CreditCard,
//   File,
//   Home,
//   LineChart,
//   ListFilter,
//   MoreVertical,
//   Package,
//   Package2,
//   PanelLeft,
//   Search,
//   Settings,
//   ShoppingCart,
//   Truck,
//   Users2,
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from "@/components/ui/pagination";
// import { Separator } from "@/components/ui/separator";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ModeToggle } from "/src/components/ModeToggle";
import useAuth from "../../hooks/useAuth";
// import { toast } from "react-hot-toast";
import axios from "axios";
import ProgressCard from "../../components/ProgressCard";
import AppointmentsTable from "../../components/AppointmentsTable";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
// Conditionally render the dashboard based on the user role
export default function Dashboard() {
  const { auth } = useAuth();
  switch (auth.user.role) {
    case "admin":
      return <AdminDashboard />;
    case "dentist":
      return <DentistDashboard />;
    case "receptionist":
      return <ReceptionistDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
}

export function AdminDashboard() {
  // const client = axios.create({
  //   baseURL: "http://127.0.0.1:8000",
  // });
  // const { auth, setAuth } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          {/* TO-DO Table for the Appointements (maybe a view from the backend) */}
          <AppointmentsTable />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {/* <div className="border border-red-600 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"> */}
            <ProgressCard
              description="This Week"
              title="$1,329"
              titleClass="text-4xl"
              content="+25% from last week"
              progressValue={40}
              progressLabel="25%  increase"
            />
            <ProgressCard
              description="This Week"
              title="$1,329"
              titleClass="text-4xl"
              content="+25% from last week"
              progressValue={40}
              progressLabel="25%  increase"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export function DentistDashboard() {
  // const client = axios.create({
  //   baseURL: "http://127.0.0.1:8000",
  // });
  // const { auth, setAuth } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          {/* TO-DO Table for the Appointements (maybe a view from the backend) */}
          <AppointmentsTable />
          {/* TO-DO dashboard stuff for the dentist */}
          More Dentist Stuff Here...
        </main>
      </div>
    </div>
  );
}

export function ReceptionistDashboard() {
  // const client = axios.create({
  //   baseURL: "http://127.0.0.1:8000",
  // });
  // const { auth, setAuth } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          {/* TO-DO Table for the Appointements (maybe a view from the backend) */}
          <AppointmentsTable />
          {/* TO-DO dashboard stuff for the dentist */}
          More Receptionist Stuff Here...
        </main>
      </div>
    </div>
  );
}
