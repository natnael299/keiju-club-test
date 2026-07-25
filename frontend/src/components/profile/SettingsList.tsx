import { Bell, ChevronRight, Globe, LogOut, Moon, Shield } from "lucide-react";

import Card from "@/components/shared/Card";

const items = [
  { icon: Bell, label: "Notifications" },
  { icon: Globe, label: "Language" },
  { icon: Moon, label: "Appearance" },
  { icon: Shield, label: "Privacy" },
  { icon: LogOut, label: "Log out" },
];

export default function SettingsList() {
  return (
    <Card className="overflow-hidden p-0">
      {items.map(({ icon: Icon, label }, index) => (
        <button
          key={label}
          className={[
            "flex w-full items-center justify-between px-4 py-4 text-left",
            index !== items.length - 1 ? "border-b border-border" : "",
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-medium">{label}</span>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      ))}
    </Card>
  );
}
