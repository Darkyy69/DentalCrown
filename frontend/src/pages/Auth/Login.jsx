import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "/src/components/ModeToggle";
import DisabledGuy from "../../assets/DisabledGuy.svg";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// function Login() {
//   const [currentUser, setCurrentUser] = useState();
//   const [registrationToggle, setRegistrationToggle] = useState(false);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const { auth, setAuth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || "/";
//   // console.log(location);

//   function submitRegistration(e) {
//     e.preventDefault();
//     client
//       .post("/auth/register/", {
//         email: email,
//         username: username,
//         password: password,
//       })
//       .then(function (res) {
//         toast.success("Registration successful!");
//         client
//           .post("/auth/login/", {
//             username: username,
//             password: password,
//           })
//           .then(function (res) {
//             setCurrentUser(true);
//           });
//       })
//       .catch(function (error) {
//         toast.error("Registration failed.");
//       });
//   }

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // useEffect(() => {
  //   client
  //     .get("/auth/user/")
  //     .then(function (res) {
  //       const user = res.data.user;
  //       setAuth({ user });
  //       navigate(from, { replace: true });
  //       setIsLoading(false);
  //     })
  //     .catch(function (error) {
  //       setAuth({ user: null });
  //       console.error(error.response.data);
  //       setIsLoading(false);
  //       // return <Navigate to="/" state={{ prevUrl: location.pathname }} />;
  //     });
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    client
      .get("/auth/user/")
      .then(function (res) {
        const user = res.data.user;
        setAuth({ user });
        navigate(from, { replace: true });
      })
      .catch(function (error) {
        setAuth({ user: null });
        console.error(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setAuth, from, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .post("/auth/login/", {
        username: username,
        password: password,
      })
      .then(function (res) {
        const user = res.data.user;
        setAuth({ user });
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch(function (error) {
        toast.error(error.response.data || "Login failed.");
      });
  };

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="flex flex-col h-dvh justify-center">
      <div className="absolute top-0 right-0 mx-4 my-4">
        <ModeToggle />
      </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription>
            Enter your Username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
