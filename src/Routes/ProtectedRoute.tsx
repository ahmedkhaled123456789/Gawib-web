import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  // لو مفيش توكن → يرجعه على صفحة اللوجين
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // لو فيه توكن → يعرض الصفحة
  return <Outlet />;
};

export default ProtectedRoute;
