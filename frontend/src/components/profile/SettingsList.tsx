import { useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Globe,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";
import { useAuthStore } from "@/store/authStore";

type OpenSetting = "notifications" | "language" | "appearance" | null;

type Appearance = "light" | "dark";

export default function SettingsList() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const logout = useAuthStore((state) => state.logout);

  const [openSetting, setOpenSetting] = useState<OpenSetting>(null);

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem("keiju-notifications-enabled");

    return saved !== "false";
  });

  const [appearance, setAppearance] = useState<Appearance>(() => {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  const toggleSection = (section: Exclude<OpenSetting, null>) => {
    setOpenSetting((current) => (current === section ? null : section));
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);

    localStorage.setItem("keiju-notifications-enabled", String(enabled));
  };

  const handleLanguageChange = async (language: "fi" | "sv" | "en") => {
    await i18n.changeLanguage(language);

    localStorage.setItem("keiju-language", language);
  };

  const handleAppearanceChange = (nextAppearance: Appearance) => {
    setAppearance(nextAppearance);

    document.documentElement.classList.toggle(
      "dark",
      nextAppearance === "dark",
    );

    localStorage.setItem("keiju-appearance", nextAppearance);
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

            <span className="font-semibold text-foreground">Notifications</span>
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
                  App notifications
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Receive alerts and important updates.
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
              <p className="font-semibold text-foreground">Language</p>

              <p className="text-xs text-muted-foreground">
                {getLanguageLabel(i18n.language)}
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
              label="Suomi"
              active={i18n.language.startsWith("fi")}
              onClick={() => void handleLanguageChange("fi")}
            />

            <LanguageOption
              label="Svenska"
              active={i18n.language.startsWith("sv")}
              onClick={() => void handleLanguageChange("sv")}
            />

            <LanguageOption
              label="English"
              active={i18n.language.startsWith("en")}
              onClick={() => void handleLanguageChange("en")}
            />
          </div>
        )}
      </div>

      {/* Appearance */}

      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => toggleSection("appearance")}
          className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-muted/30"
        >
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5 text-primary" />

            <div>
              <p className="font-semibold text-foreground">Appearance</p>

              <p className="text-xs capitalize text-muted-foreground">
                {appearance}
              </p>
            </div>
          </div>

          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              openSetting === "appearance" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSetting === "appearance" && (
          <div className="grid grid-cols-2 gap-3 border-t border-border bg-muted/20 p-4">
            <button
              type="button"
              onClick={() => handleAppearanceChange("light")}
              className={[
                "flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                appearance === "light"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground",
              ].join(" ")}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>

            <button
              type="button"
              onClick={() => handleAppearanceChange("dark")}
              className={[
                "flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                appearance === "dark"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground",
              ].join(" ")}
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
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

          <span className="font-semibold text-destructive">Log out</span>
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

function getLanguageLabel(language: string) {
  if (language.startsWith("fi")) {
    return "Suomi";
  }

  if (language.startsWith("sv")) {
    return "Svenska";
  }

  return "English";
}
