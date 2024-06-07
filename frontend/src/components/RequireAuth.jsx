import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRights }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.rights?.find((right) => allowedRights?.includes(right)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
