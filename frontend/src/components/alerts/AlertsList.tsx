import NotificationCard from "@/components/cards/NotificationCard";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Notification } from "@/types";

type AlertsListProps = {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
};

function getDateLabel(date: string) {
  const value = new Date(date);
  const today = new Date();

  if (value.toDateString() === today.toDateString()) {
    return "Tänään";
  }

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (value.toDateString() === yesterday.toDateString()) {
    return "Eilen";
  }

  return new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value);
}

function groupByDate(notifications: Notification[]) {
  return notifications.reduce<Record<string, Notification[]>>(
    (groups, notification) => {
      const label = getDateLabel(notification.dt);

      groups[label] ??= [];
      groups[label].push(notification);

      return groups;
    },
    {},
  );
}

export default function AlertsList({
  notifications,
  onNotificationClick,
}: AlertsListProps) {
  const groupedNotifications = groupByDate(notifications);

  return (
    <div className="space-y-7">
      {Object.entries(groupedNotifications).map(([date, items]) => (
        <section key={date}>
          <SectionHeader title={date} />

          <div className="space-y-3">
            {items.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onClick={() => onNotificationClick(notification)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
