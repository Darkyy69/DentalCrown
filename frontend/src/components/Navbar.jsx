import React, { useEffect, useState, useRef } from "react";
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
  Calendar,
  Truck,
  Users2,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { ModeToggle } from "./ModeToggle";
import AddNewPatient from "./AddNewPatient";
import useAuth from "../hooks/useAuth";
import api from "../api";
import { SearchBar } from "./SearchBar";
import { UserRoundIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { PaymentPopup } from "./PaymentPopup";

const ACCESS_TOKEN = "access";
const currency = "DA";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const currentTheme = localStorage.getItem("vite-ui-theme");
  const ws = useRef(null); // Use useRef to maintain the WebSocket instance
  const token = localStorage.getItem(ACCESS_TOKEN);
  const [selectedNotification, setSelectedNotification] = useState({});

  const navigate = useNavigate();

  // const { toast } = useToast();
  const user = auth?.user;

  function handleLogout() {
    navigate("/logout");
  }

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`
    );

    ws.current.onopen = () => {
      console.log("WebSocket connection opened.");
      //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      //   ws.current.send(JSON.stringify({ message: "Hello from the client!" }));
      //   } else {
      // console.error("WebSocket is not open");
      //   }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.target) {
        case "payment-popup":
          if (data.action === "enable") {
            setShowPaymentPopup(true);
            setSelectedNotification(data.appointment);
          } else if (data.action === "disable") {
            setShowPaymentPopup(false);
          }
          fetchNotifications();
          return;
        default:
          break;
      }
      fetchNotifications();
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed. Please refresh the page to reconnect.");
      // alert("WebSocket closed. Please refresh the page to reconnect.");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleNotificationClick = () => {
    setNotificationCount(0); // Reset the notification count when opening the notifications list
    // TODO: Mark all notifications as seen
  };

  // fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      const response = await api.get("/api/notifications/");
      console.log(response.data);
      setNotifications(response.data);
      // Calculate the count of both arrays
      setNotificationCount(
        response.data.payments.length + response.data.appointments.length
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <PaymentPopup
        open={showPaymentPopup}
        setOpen={setShowPaymentPopup}
        model_data={selectedNotification}
        fetchNotifications={fetchNotifications}
      />
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  // href="/"
                  // to={{ pathname: "/" }}
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  // href="/calendar"
                  to="/calendar_testing"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="sr-only">Calendar</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Calendar</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to="/mycalendar_testing"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="sr-only">My Calendar</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">My Calendar</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to="/stock"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Stock</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Stock</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to="/analytics"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <a
                  href="#settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/calendar_testing"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Calendar
                </Link>
                <Link
                  to="/mycalendar_testing"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  My Calendar
                </Link>
                <Link
                  to="/stock"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Stock
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <a
                  href="#settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex ml-auto md:grow-0 gap-2">
            {/* <ModeToggle /> */}
            <div className="relative w-full">
              <SearchBar />
            </div>
            <div className="w-10 h-10 rounded-full">
              <AddNewPatient />
            </div>
            <div className="relative w-10 h-10 rounded-full">
              <div
                className={`absolute flex items-center justify-center w-5 h-5 right-0 rounded-full ${
                  currentTheme === "dark"
                    ? "text-primary"
                    : "text-primary-foreground"
                } bg-red-500/90`}
              >
                {notificationCount}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="w-10 h-10 rounded-full"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      console.log(
                        "Notification clicked, Checking notifications as Seen"
                      );
                    }}
                  >
                    <Bell size={24} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent asChild>
                  <ScrollArea className="h-96 w-[320px] rounded-md border p-4">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications?.payments?.map((payment) => (
                      <div key={payment.id}>
                        <DropdownMenuItem key={payment.id}>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(payment.created_at).toLocaleString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                                <br />
                              </span>
                              <p className="text-xs text-muted-foreground">
                                <span className="underline">
                                  {/* {payment.model_data.patient} */}
                                  {payment.model_data.patient.full_name}{" "}
                                </span>{" "}
                                has paid{" "}
                                <span className="text-xs text-primary">
                                  {payment.model_data.amount} {currency}
                                </span>
                                .
                                <br />
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </div>
                    ))}

                    {notifications?.appointments?.map((appointment) => (
                      <div
                        key={appointment.id}
                        onClick={() => {
                          if (appointment.opened) return;
                          setShowPaymentPopup(true);
                          setSelectedNotification(appointment.model_data);
                        }}
                      >
                        <DropdownMenuItem>
                          <div
                            className={`flex items-center gap-2 ${
                              appointment.opened
                                ? "cursor-default"
                                : "cursor-pointer"
                            }`}
                          >
                            <Calendar className="h-5 w-5" />
                            <div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(
                                  appointment.created_at
                                ).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                                <br />
                              </span>
                              <p className="text-xs text-muted-foreground">
                                <span className="underline">
                                  {appointment.model_data.patient.full_name}{" "}
                                </span>
                                has finished their appointment.
                                <br />
                                {appointment.opened ? (
                                  <span className="text-primary">
                                    Payment has been made.
                                  </span>
                                ) : (
                                  <span className="text-primary">
                                    Click to make a payment.
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </div>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="hidden md:flex md:items-center md:justify-center md:w-10 md:h-10 rounded-full bg-background hover:bg-primary-foreground"
              asChild
            >
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-primary-foreground"
              >
                {/* <img
                  src="https://ui.shadcn.com/_next/image?url=%2Fplaceholder-user.jpg&w=48&q=75"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                  /> */}
                {/* TODO */}
                <UserRoundIcon
                  size={24}
                  className="transition-all hover:scale-110 text-muted-foreground"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs underline underline-offset-4">
                {user.full_name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <a href="#settings">Settings</a>
              </DropdownMenuItem>

              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
