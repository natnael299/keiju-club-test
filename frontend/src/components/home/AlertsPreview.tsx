import { useNavigate } from "react-router-dom";

import NotificationCard from "@/components/cards/NotificationCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { useNotificationsStore } from "@/store/notifications.store";

export default function AlertsPreview() {
  const navigate = useNavigate();

  const notifications = useNotificationsStore((state) => state.notifications);

  return (
    <section className="mb-8">
      <SectionHeader
        title="Alerts"
        actionLabel="Show all"
        onActionClick={() => navigate("/app/alerts")}
      />

      <div className="space-y-4">
        {notifications.slice(0, 3).map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
          />
        ))}
      </div>
    </section>
  );
}
