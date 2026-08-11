import { useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Globe,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";
import { useAuthStore } from "@/store/authStore";
import { type Language, useLanguageStore } from "@/store/languageStore";

type OpenSetting = "notifications" | "language" | null;

export default function SettingsList() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = useAuthStore((state) => state.logout);

  const { language, setLanguage } = useLanguageStore();

  const [openSetting, setOpenSetting] = useState<OpenSetting>(null);

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem("keiju-notifications-enabled");

    return saved !== "false";
  });

  const toggleSection = (section: Exclude<OpenSetting, null>) => {
    setOpenSetting((current) => (current === section ? null : section));
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);

    localStorage.setItem("keiju-notifications-enabled", String(enabled));
  };

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Card className="overflow-hidden p-0">
      {/* Notifications */}

      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => toggleSection("notifications")}
          className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-muted/30"
        >
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />

            <span className="font-semibold text-foreground">
              {t("settings.notifications")}
            </span>
          </div>

          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              openSetting === "notifications" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSetting === "notifications" && (
          <div className="border-t border-border bg-muted/20 px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">
                  {t("settings.appNotifications")}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {t("settings.notificationsDescription")}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={notificationsEnabled}
                onClick={() => handleNotificationsChange(!notificationsEnabled)}
                className={[
                  "relative h-7 w-12 shrink-0 rounded-full transition",
                  notificationsEnabled
                    ? "bg-primary"
                    : "bg-muted-foreground/30",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all",
                    notificationsEnabled ? "left-6" : "left-1",
                  ].join(" ")}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Language */}

      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => toggleSection("language")}
          className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-muted/30"
        >
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />

            <div>
              <p className="font-semibold text-foreground">
                {t("settings.language")}
              </p>

              <p className="text-xs text-muted-foreground">
                {t(`language.${language}`)}
              </p>
            </div>
          </div>

          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              openSetting === "language" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSetting === "language" && (
          <div className="border-t border-border bg-muted/20 p-3">
            <LanguageOption
              label={t("language.fi")}
              active={language === "fi"}
              onClick={() => handleLanguageChange("fi")}
            />

            <LanguageOption
              label={t("language.sv")}
              active={language === "sv"}
              onClick={() => handleLanguageChange("sv")}
            />

            <LanguageOption
              label={t("language.en")}
              active={language === "en"}
              onClick={() => handleLanguageChange("en")}
            />
          </div>
        )}
      </div>

      {/* Logout */}

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-destructive/5"
      >
        <div className="flex items-center gap-3">
          <LogOut className="h-5 w-5 text-destructive" />

          <span className="font-semibold text-destructive">
            {t("settings.logout")}
          </span>
        </div>

        <ChevronRight className="h-5 w-5 text-destructive/60" />
      </button>
    </Card>
  );
}

function LanguageOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted/50",
      ].join(" ")}
    >
      {label}

      {active && <Check className="h-4 w-4" />}
    </button>
  );
}
