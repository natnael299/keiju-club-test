import {
  CalendarPlus,
  LayoutDashboard,
  ListChecks,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/organizer/dashboard", icon: LayoutDashboard },
  { label: "Events", to: "/organizer/events", icon: ListChecks },
  { label: "Create", to: "/organizer/events/new", icon: CalendarPlus },
  { label: "Profile", to: "/organizer/profile", icon: UserRound },
];

export default function OrganizerBottomNav() {
  return (
    <nav className="sticky bottom-4 z-20 mx-4 mb-4 rounded-[2rem] bg-white px-4 py-3 shadow-[0_12px_35px_rgba(23,53,43,0.16)]">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center gap-1 text-xs font-semibold transition",
                  isActive ? "text-primary" : "text-muted-foreground",
                ].join(" ")
              }
            >
              <Icon size={24} strokeWidth={2.2} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
