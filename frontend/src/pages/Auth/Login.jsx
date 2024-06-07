import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function Login() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  // console.log(location);
  useEffect(() => {
    client
      .get("/auth/user/")
      .then(function (res) {
        setCurrentUser(true);
        const user = res.data.user;
        // const rights = response.data.rights.split(" ");
        // console.log(rights);
        // setAuth({ username, rights });
        setAuth({ user });
        navigate(from, { replace: true });
      })
      .catch(function (error) {
        setCurrentUser(false);
        setAuth({ user: null });
        // return <Navigate to="/" state={{ prevUrl: location.pathname }} />;
        // console.log(error.response.data);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client
      .post("/auth/register/", {
        email: email,
        username: username,
        password: password,
      })
      .then(function (res) {
        toast.success("Registration successful!");
        client
          .post("/auth/login/", {
            username: username,
            password: password,
          })
          .then(function (res) {
            setCurrentUser(true);
          });
      })
      .catch(function (error) {
        toast.error("Registration failed.");
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    client
      .post("/auth/login/", {
        username: username,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
        const user = res.data.user;
        setAuth({ user });
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch(function (error) {
        toast.error(error.response.data || "Login failed.");
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client
      .post("/auth/logout/", { withCredentials: true })
      .then(function (res) {
        setCurrentUser(false);
        toast.success("Logout successful!");
      })
      .catch(function (error) {
        toast.error("Logout failed.");
      });
  }

  if (currentUser) {
    return (
      <div>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg">Authentication App</div>
            <form onSubmit={(e) => submitLogout(e)} className="inline">
              <button
                type="submit"
                className="bg-white text-gray-800 py-2 px-4 rounded"
              >
                Log out
              </button>
            </form>
          </div>
        </nav>
        <div className="flex justify-center mt-10">
          <h2 className="text-2xl">You're logged in!</h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg">Authentication App</div>
          <button
            id="form_btn"
            onClick={update_form_btn}
            className="bg-white text-gray-800 py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </nav>
      {registrationToggle ? (
        <div className="flex justify-center mt-10">
          <form
            onSubmit={(e) => submitRegistration(e)}
            className="w-full max-w-sm"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <form onSubmit={(e) => submitLogin(e)} className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
