import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import SelectOwner from "@/pages/SelectOwner";

import Alerts from "@/pages/caretaker/Alerts";
import Club from "@/pages/caretaker/Club";
import Home from "@/pages/caretaker/Home";
import Profile from "@/pages/caretaker/Profile";
import Reports from "@/pages/caretaker/Reports";

import CreateEvent from "@/pages/organizer/CreateEvent";
import OrganizerDashboard from "@/pages/organizer/Dashboard";
import EditEvent from "@/pages/organizer/EditEvent";
import OrganizerEvents from "@/pages/organizer/Events";
import OrganizerProfile from "@/pages/organizer/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={["caretaker"]} />}>
        <Route path="/app" element={<Navigate to="/app/home" replace />} />

        <Route path="/app/select-owner" element={<SelectOwner />} />

        <Route path="/app/home" element={<Home />} />

        <Route path="/app/alerts" element={<Alerts />} />

        <Route path="/app/reports" element={<Reports />} />

        <Route path="/app/club" element={<Club />} />

        <Route path="/app/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["organizationRep"]} />}>
        <Route
          path="/organizer"
          element={<Navigate to="/organizer/dashboard" replace />}
        />

        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />

        <Route path="/organizer/events" element={<OrganizerEvents />} />

        <Route path="/organizer/events/new" element={<CreateEvent />} />

        <Route path="/organizer/events/:eventId/edit" element={<EditEvent />} />

        <Route path="/organizer/profile" element={<OrganizerProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
