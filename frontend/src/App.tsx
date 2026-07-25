import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import Home from "@/pages/caretaker/Home";
import Alerts from "@/pages/caretaker/Alerts";
import Reports from "@/pages/caretaker/Reports";
import Club from "@/pages/caretaker/Club";
import Profile from "@/pages/caretaker/Profile";

import OrganizerDashboard from "@/pages/organizer/Dashboard";
import OrganizerEvents from "@/pages/organizer/Events";
import CreateEvent from "@/pages/organizer/CreateEvent";
import EditEvent from "@/pages/organizer/EditEvent";
import OrganizerProfile from "@/pages/organizer/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/app" element={<Navigate to="/app/home" replace />} />
      <Route path="/app/home" element={<Home />} />
      <Route path="/app/alerts" element={<Alerts />} />
      <Route path="/app/reports" element={<Reports />} />
      <Route path="/app/club" element={<Club />} />
      <Route path="/app/profile" element={<Profile />} />

      <Route
        path="/organizer"
        element={<Navigate to="/organizer/dashboard" replace />}
      />
      <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
      <Route path="/organizer/events" element={<OrganizerEvents />} />
      <Route path="/organizer/events/new" element={<CreateEvent />} />
      <Route path="/organizer/events/:eventId/edit" element={<EditEvent />} />
      <Route path="/organizer/profile" element={<OrganizerProfile />} />
    </Routes>
  );
}

export default App;
