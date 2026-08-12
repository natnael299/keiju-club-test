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
    <nav className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-around rounded-[28px] border border-border/60 bg-white/95 p-2.5 shadow-[0_12px_35px_rgba(31,69,53,0.10)] backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.to} to={item.to} className="flex-1">
              {({ isActive }) => (
                <div
                  className={[
                    "mx-auto flex w-fit items-center justify-center gap-2 rounded-2xl px-4 py-3 transition-all duration-200",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted/50",
                  ].join(" ")}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 3 : 2}
                    className="shrink-0"
                  />

                  <span
                    className={[
                      "whitespace-nowrap text-sm transition-all",
                      isActive
                        ? "font-extrabold text-primary"
                        : "font-medium text-muted-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
