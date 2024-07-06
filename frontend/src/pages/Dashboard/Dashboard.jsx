import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "/src/components/ModeToggle";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
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
  const [selectedMenu, setSelectedMenu] = useState("A Plannifier");

  const renderContent = () => {
    switch (selectedMenu) {
      case "A Plannifier":
        return (
          <div>
            A Plannifier Content
            <AppointmentsTable />
          </div>
        );
      case "Aujord'hui":
        return (
          <div>
            Aujord'hui Content
            <AppointmentsTable />
          </div>
        );
      case "Demain":
        return (
          <div>
            Demain Content
            <AppointmentsTable />
          </div>
        );
      default:
        return <div>Select a menu item</div>;
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="flex items-center">
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <button
                variant="ghost"
                className="px-3 py-[6px] rounded-md  bg-background text-foreground"
                onClick={() => setSelectedMenu("A Plannifier")}
              >
                A Plannifier
              </button>
              {/* <button >A Plannifier</button> */}
              <Button
                variant="ghost"
                onClick={() => setSelectedMenu("Aujord'hui")}
              >
                Aujord'hui
              </Button>
              <Button variant="ghost" onClick={() => setSelectedMenu("Demain")}>
                Demain
              </Button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm"
                type="button"
                id="radix-:Rppkmuuuuu6la:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list-filter h-3.5 w-3.5"
                >
                  <path d="M3 6h18"></path>
                  <path d="M7 12h10"></path>
                  <path d="M10 18h4"></path>
                </svg>
                <span className="sr-only sm:not-sr-only">Filter</span>
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file h-3.5 w-3.5"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <span className="sr-only sm:not-sr-only">Export</span>
              </button>
            </div>
          </div>
          {/* TO-DO Table for the Appointements (maybe a view from the backend) */}
          <div className="">{renderContent()}</div>
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
  const [selectedMenu, setSelectedMenu] = useState("A Plannifier");

  const renderContent = () => {
    switch (selectedMenu) {
      case "A Plannifier":
        return (
          <div>
            A Plannifier Content
            <AppointmentsTable />
          </div>
        );
      case "Aujord'hui":
        return (
          <div>
            Aujord'hui Content
            <AppointmentsTable />
          </div>
        );
      case "Demain":
        return (
          <div>
            Demain Content
            <AppointmentsTable />
          </div>
        );
      default:
        return <div>Select a menu item</div>;
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="flex items-center">
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <button
                variant="ghost"
                className="px-3 py-[6px] rounded-md  bg-background text-foreground"
                onClick={() => setSelectedMenu("A Plannifier")}
              >
                A Plannifier
              </button>
              {/* <button >A Plannifier</button> */}
              <Button
                variant="ghost"
                onClick={() => setSelectedMenu("Aujord'hui")}
              >
                Aujord'hui
              </Button>
              <Button variant="ghost" onClick={() => setSelectedMenu("Demain")}>
                Demain
              </Button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm"
                type="button"
                id="radix-:Rppkmuuuuu6la:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list-filter h-3.5 w-3.5"
                >
                  <path d="M3 6h18"></path>
                  <path d="M7 12h10"></path>
                  <path d="M10 18h4"></path>
                </svg>
                <span className="sr-only sm:not-sr-only">Filter</span>
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file h-3.5 w-3.5"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <span className="sr-only sm:not-sr-only">Export</span>
              </button>
            </div>
          </div>
          {/* TO-DO Table for the Appointements (maybe a view from the backend) */}
          <div className="">{renderContent()}</div>
          <div className="border border-red-600 grid gap-4 sm:grid-cols-2 lg:grid-cols-2"></div>
        </main>
      </div>
    </div>
  );
}
