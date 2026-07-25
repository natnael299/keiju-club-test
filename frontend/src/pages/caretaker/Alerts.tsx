import { useEffect, useMemo, useState } from "react";

import AlertDetailDialog from "@/components/alerts/AlertDetailDialog";
import AlertsFilters, { type Filter } from "@/components/alerts/AlertsFilters";
import AlertsHeader from "@/components/alerts/AlertsHeader";
import AlertsList from "@/components/alerts/AlertsList";
import AppLayout from "@/layouts/AppLayout";
import { useNotificationsStore } from "@/store/notifications.store";
import type { Notification } from "@/types";

export default function Alerts() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const notifications = useNotificationsStore((state) => state.notifications);

  const fetchNotifications = useNotificationsStore(
    (state) => state.fetchNotifications,
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    document.body.style.overflow = selectedNotification ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedNotification]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "urgent") {
      return notifications.filter((item) =>
        ["10", "20", "30"].includes(item.level),
      );
    }

    if (activeFilter === "info") {
      return notifications.filter((item) => item.level === "80");
    }

    return notifications;
  }, [activeFilter, notifications]);

  return (
    <AppLayout>
      <AlertsHeader />

      <AlertsFilters activeFilter={activeFilter} onChange={setActiveFilter} />

      <AlertsList
        notifications={filteredNotifications}
        onNotificationClick={setSelectedNotification}
      />

      <AlertDetailDialog
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </AppLayout>
  );
}
