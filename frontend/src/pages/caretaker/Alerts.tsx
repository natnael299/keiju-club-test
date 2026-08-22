import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import AlertDetailDialog from "@/components/alerts/AlertDetailDialog";
import AlertsFilters, { type Filter } from "@/components/alerts/AlertsFilters";
import AlertsHeader from "@/components/alerts/AlertsHeader";
import AlertsList from "@/components/alerts/AlertsList";
import LoadError from "@/components/shared/LoadError";

import AppLayout from "@/layouts/AppLayout";

import { useNotificationsStore } from "@/store/notifications.store";
import { useOwnerStore } from "@/store/owner.store";

import type { Notification } from "@/types";

export default function Alerts() {
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const selectedOwnerId = useOwnerStore((state) => state.selectedOwnerId);

  const notifications = useNotificationsStore((state) => state.notifications);

  const loading = useNotificationsStore((state) => state.loading);

  const error = useNotificationsStore((state) => state.error);

  const fetchOwnerNotifications = useNotificationsStore(
    (state) => state.fetchOwnerNotifications,
  );

  useEffect(() => {
    if (!selectedOwnerId) {
      return;
    }

    void fetchOwnerNotifications(selectedOwnerId);
  }, [selectedOwnerId, fetchOwnerNotifications]);

  useEffect(() => {
    document.body.style.overflow = selectedNotification ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedNotification]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "urgent") {
      return notifications.filter((notification) =>
        ["10", "20", "30"].includes(notification.level),
      );
    }

    if (activeFilter === "info") {
      return notifications.filter(
        (notification) => notification.level === "80",
      );
    }

    return notifications;
  }, [activeFilter, notifications]);

  const handleRetry = async (): Promise<void> => {
    if (!selectedOwnerId) {
      return;
    }

    await fetchOwnerNotifications(selectedOwnerId);
  };

  return (
    <AppLayout>
      <AlertsHeader />

      {loading && notifications.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          {t("alerts.loading", {
            defaultValue: "Loading alerts...",
          })}
        </div>
      ) : error ? (
        <LoadError
          title={t("alerts.loadError", {
            defaultValue: "Alerts could not be loaded",
          })}
          message={error}
          retrying={loading}
          onRetry={handleRetry}
        />
      ) : (
        <>
          <AlertsFilters
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />

          <AlertsList
            notifications={filteredNotifications}
            onNotificationClick={setSelectedNotification}
          />
        </>
      )}

      <AlertDetailDialog
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </AppLayout>
  );
}
