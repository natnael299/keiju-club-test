import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

type AllowedRole = "caretaker" | "organizer";

type Props = {
  allowedRoles: AllowedRole[];
};

export default function ProtectedRoute({ allowedRoles }: Props) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (!token || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
