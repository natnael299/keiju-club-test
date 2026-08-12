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
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(10px,env(safe-area-inset-bottom))] sm:px-5">
      <div className="mx-auto grid w-full max-w-md grid-cols-4 rounded-[22px] border border-border/60 bg-white/95 px-2 py-2 shadow-[0_8px_30px_rgba(23,53,43,0.12)] backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2",
                  "text-[11px] transition-all duration-200",
                  isActive
                    ? "font-extrabold text-primary"
                    : "font-medium text-muted-foreground",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={21} strokeWidth={isActive ? 2.7 : 2} />

                  <span className="w-full truncate text-center">
                    {item.label}
                  </span>

                  <span
                    className={[
                      "absolute bottom-0 h-[3px] rounded-full bg-primary transition-all duration-200",
                      isActive ? "w-5 opacity-100" : "w-0 opacity-0",
                    ].join(" ")}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
