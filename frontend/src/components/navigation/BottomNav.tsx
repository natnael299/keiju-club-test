import { Bell, ClipboardList, Home, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BottomNav() {
  const { t } = useTranslation();

  const navItems = [
    {
      label: t("nav.home"),
      to: "/app/home",
      icon: Home,
    },
    {
      label: t("nav.alerts"),
      to: "/app/alerts",
      icon: Bell,
    },
    {
      label: t("nav.reports"),
      to: "/app/reports",
      icon: ClipboardList,
    },
    {
      label: t("nav.club"),
      to: "/app/club",
      icon: Star,
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
