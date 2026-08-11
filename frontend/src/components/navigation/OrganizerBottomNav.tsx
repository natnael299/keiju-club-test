import {
  CalendarPlus,
  LayoutDashboard,
  ListChecks,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OrganizerBottomNav() {
  const { t } = useTranslation();

  const navItems = [
    {
      label: t("organizer.dashboard"),
      to: "/organizer/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: t("organizer.events"),
      to: "/organizer/events",
      icon: ListChecks,
    },
    {
      label: t("organizer.create"),
      to: "/organizer/events/new",
      icon: CalendarPlus,
    },
    {
      label: t("organizer.profile"),
      to: "/organizer/profile",
      icon: UserRound,
    },
  ];

  return (
    <nav>
      <div className="flex items-center justify-around">
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
