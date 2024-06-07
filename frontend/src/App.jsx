import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import Profile from "./pages/Auth/Profile.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Navbar from "./components/Navbar.jsx";
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

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            {/* <Route element={<ProtectedLayout />}> */}
            <Route element={<Home />} path="/" exact />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Products />} path="/products" />
            {/* </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* Define the React Router Here Later... */}
    </AuthProvider>
  );
}

export default App;
