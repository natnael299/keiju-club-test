import KitchenActivityWidget from "@/components/notification-widgets/KitchenActivityWidget";
import MorningActivityWidget from "@/components/notification-widgets/MorningActivityWidget";
import NotificationOverviewWidget from "@/components/notification-widgets/NotificationOverviewWidget";
import OutOfBedHistory from "@/components/notification-widgets/OutOfBedHistory";
import type { Notification } from "@/types";

type Props = {
  notification: Notification;
};

function normalizeTerm(term: string) {
  return term.trim().toLowerCase().replaceAll("_", " ").replace(/\s+/g, " ");
}

export default function NotificationWidgetRenderer({ notification }: Props) {
  const normalizedTerm = normalizeTerm(notification.term);

  const isDistress = normalizedTerm === "distress";

  const isOutOfBed =
    normalizedTerm === "out of bed" || normalizedTerm === "outofbed";

  const isKitchenActivity =
    normalizedTerm === "no kitchen activity" ||
    normalizedTerm === "kitchen inactivity" ||
    normalizedTerm === "kitchen activity";

  const isMorningActivity =
    normalizedTerm === "low morning activity" ||
    normalizedTerm === "morning activity" ||
    normalizedTerm === "morning routine";

  return (
    <div className="space-y-4">
      <NotificationOverviewWidget notification={notification} />

      {isDistress && (
        <div>{/* Keep or add the distress-specific widget here */}</div>
      )}

      {isOutOfBed && <OutOfBedHistory notification={notification} />}

      {isKitchenActivity && (
        <KitchenActivityWidget notification={notification} />
      )}

      {isMorningActivity && (
        <MorningActivityWidget notification={notification} />
      )}
    </div>
  );
}
