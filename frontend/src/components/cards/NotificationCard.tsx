import { Bell } from "lucide-react";
import Card from "@/components/shared/Card";
import type { Notification } from "@/types";

type NotificationCardProps = {
  notification: Notification;
  onClick?: () => void;
};

const LEVEL_STYLES: Record<
  Notification["level"],
  { label: string; bg: string; text: string; border: string }
> = {
  "10": {
    label: "Kiireellinen",
    bg: "bg-red-600",
    text: "text-red-600",
    border: "border-red-600",
  },
  "20": {
    label: "Kriittinen",
    bg: "bg-orange-600",
    text: "text-orange-600",
    border: "border-orange-600",
  },
  "30": {
    label: "Tärkeä",
    bg: "bg-orange-500",
    text: "text-orange-500",
    border: "border-orange-500",
  },
  "40": {
    label: "Huomio",
    bg: "bg-yellow-400",
    text: "text-yellow-600",
    border: "border-yellow-400",
  },
  "50": {
    label: "OK",
    bg: "bg-green-500",
    text: "text-green-600",
    border: "border-green-500",
  },
  "80": {
    label: "Tiedoksi",
    bg: "bg-sky-500",
    text: "text-sky-600",
    border: "border-sky-500",
  },
  "90": {
    label: "Ei dataa",
    bg: "bg-gray-400",
    text: "text-gray-500",
    border: "border-gray-400",
  },
  "99": {
    label: "Tuntematon",
    bg: "bg-gray-200",
    text: "text-gray-500",
    border: "border-gray-200",
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getDescription(notification: Notification) {
  if (notification.term === "distress") return "Hätäpainiketta painettu";

  return notification.term.replaceAll("_", " ");
}

export default function NotificationCard({
  notification,
  onClick,
}: NotificationCardProps) {
  const style = LEVEL_STYLES[notification.level];

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <Card className={`border-l-4 ${style.border} px-3 py-2.5 shadow-sm`}>
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.bg} text-white`}
          >
            <Bell size={17} fill="currentColor" strokeWidth={2.2} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`text-sm font-extrabold ${style.text}`}>
                {style.label}
              </h3>

              {notification.reviewed && (
                <span className="rounded-full bg-[#f7eadb] px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                  Käsitelty
                </span>
              )}
            </div>

            <p className="mt-0.5 text-sm leading-snug text-foreground">
              {getDescription(notification)}
            </p>

            <p className="mt-1 text-[11px] text-muted-foreground">
              {formatDate(notification.dt)}
            </p>
          </div>
        </div>
      </Card>
    </button>
  );
}
