import { Bell, ClipboardList, Home, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Etusivu", to: "/app/home", icon: Home },
  { label: "Hälytykset", to: "/app/alerts", icon: Bell },
  { label: "Raportit", to: "/app/reports", icon: ClipboardList },
  { label: "Club", to: "/app/club", icon: Star },
];

export default function BottomNav() {
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
