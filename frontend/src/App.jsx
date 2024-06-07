import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Auth/Profile.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Clinic from "./pages/Clinic/Clinic.jsx";
import Unauthorized from "./pages/Auth/Unauthorized.jsx";
import Rdv from "./pages/Rdv/Rdv.jsx";
// import useAuth from "./hooks/useAuth";
import ProtectedLayout from "./utils/ProtectedLayout.jsx";

function App() {
  return (
    <AuthProvider className="App px-4 md:px-8 lg:px-12 max-w-screen-2xl">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Unauthorized />} path="/unauthorized" />

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
            {/* <Route element={<ProtectedLayout />}>   */}
            <Route element={<Home />} path="/" exact />
            <Route element={<Profile />} path="/profile" />
          </Route>

          {/* Dentist Routes */}
          <Route element={<PrivateRoutes allowedRoles={["dentist"]} />}>
            <Route element={<Rdv />} path="/rdv" />
          </Route>

          {/* Admin Routes & Receptionist*/}

          <Route
            element={<PrivateRoutes allowedRoles={["admin", "receptionist"]} />}
          >
            <Route element={<Clinic />} path="/clinic" />
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
