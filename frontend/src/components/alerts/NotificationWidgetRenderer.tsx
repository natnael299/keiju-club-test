import NotificationOverviewWidget from "@/components/notification-widgets/NotificationOverviewWidget";
import OutOfBedHistoryWidget from "@/components/notification-widgets/outOfBedHistoryWidget";
import SleepHistoryWidget from "@/components/notification-widgets/SleepHistoryWidget";
import type { Notification } from "@/types";

type Props = {
  notification: Notification;
};

export default function NotificationWidgetRenderer({ notification }: Props) {
  return (
    <div className="space-y-4">
      <NotificationOverviewWidget notification={notification} />
      {notification.term === "distress" && (
        <>
          <OutOfBedHistoryWidget />
          <SleepHistoryWidget />
        </>
      )}

      {notification.term === "outOfBed" && (
        <>
          <OutOfBedHistoryWidget />
          <SleepHistoryWidget />
        </>
      )}

      {notification.term === "sleep_interruption" && <SleepHistoryWidget />}
    </div>
  );
}
