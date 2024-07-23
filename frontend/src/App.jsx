import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
// import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Profile from "./pages/Auth/Profile.jsx";
// import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Clinic from "./pages/Clinic/Clinic.jsx";
import Unauthorized from "./pages/Auth/Unauthorized.jsx";
import CalendarTest, { Schedule } from "./pages/Calendar/Calendar.jsx";
import MyCalendar from "./pages/MyCalendar/MyCalendar.jsx";
import Rdv from "./pages/Rdv/Rdv.jsx";
import ProtectedLayout from "./utils/ProtectedLayout.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import Calendar_Testing from "./pages/Calendar/Calendar_Testing.jsx";
import MyCalendar_Testing from "./pages/Calendar/MyCalendar_Testing.jsx";
import HashManager from "./components/HashManager.jsx";
import { Toaster } from "@/components/ui/toaster";

import Register from "./pages/Register";
import Payement from "./pages/Payement";
import NotFound from "./pages/NotFound";
import Patient from "./pages/Patient/Patient.jsx";
import { useToast } from "@/components/ui/use-toast";

function App() {
  const { toast } = useToast();

  function Logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    toast({
      variant: "success",
      title: "Logout Successful!",
    });
    return <Navigate to="/login" />;
  }

  return (
    <AuthProvider className="App px-4 md:px-8 lg:px-12">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {/* <Toaster position="top-right" reverseOrder={false} /> */}
        <Toaster />

        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}

            {/* Protected Routes Accessible By all Users */}
            <Route
              element={
                <PrivateRoutes
                  allowedRoles={["admin", "receptionist", "dentist"]}
                />
              }
            >
              {/* Below this line will be the navbar Only after Logging In (TO-DO) */}
              <Route element={<ProtectedLayout />}>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/calendar" element={<Schedule />} />
                <Route path="/patient/:patientId" element={<Patient />} />
                <Route
                  path="/calendar_testing"
                  element={<Calendar_Testing />}
                />
                <Route
                  path="/mycalendar_testing"
                  element={<MyCalendar_Testing />}
                />
                <Route path="/my-calendar" element={<MyCalendar />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Dentist Routes */}
              <Route element={<PrivateRoutes allowedRoles={["dentist"]} />}>
                <Route path="/rdv" element={<Rdv />} />
              </Route>

              {/* Admin Routes & Receptionist*/}

              <Route
                element={
                  <PrivateRoutes allowedRoles={["admin", "receptionist"]} />
                }
              >
                <Route path="/clinic" element={<Clinic />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>

          <HashManager />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
