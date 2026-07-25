import { Clock3, MapPin } from "lucide-react";

import Card from "@/components/shared/Card";
import type { Notification } from "@/types";

type Props = {
  notification: Notification;
};

export default function NotificationOverviewWidget({ notification }: Props) {
  const location =
    notification.position?.area ??
    notification.position?.address ??
    "Sijainti ei tiedossa";

  return (
    <Card className="p-4">
      <h3 className="text-lg font-extrabold text-foreground">
        Tapahtuman tiedot
      </h3>

      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">Tyyppi</p>
          <p className="font-semibold text-foreground">
            {notification.term.replaceAll("_", " ")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-primary" />
          <span>{new Date(notification.dt).toLocaleString("fi-FI")}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{location}</span>
        </div>
      </div>
    </Card>
  );
}
