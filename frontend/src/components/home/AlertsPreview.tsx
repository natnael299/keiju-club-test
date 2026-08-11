import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NotificationCard from "@/components/cards/NotificationCard";
import NotificationWidgetRenderer from "@/components/alerts/NotificationWidgetRenderer";
import SectionHeader from "@/components/shared/SectionHeader";

import { useNotificationsStore } from "@/store/notifications.store";

import type { Notification } from "@/types";

export default function AlertsPreview() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notifications = useNotificationsStore((state) => state.notifications);

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const closeNotification = () => {
    setSelectedNotification(null);
  };

  return (
    <>
      <section>
        <SectionHeader
          title={t("home.alerts")}
          actionLabel={t("home.showAll")}
          onActionClick={() => navigate("/app/alerts")}
        />

        <div className="space-y-4">
          {notifications.slice(0, 3).map((notification) => (
            <button
              key={notification._id}
              type="button"
              onClick={() => setSelectedNotification(notification)}
              className="block w-full text-left"
            >
              <NotificationCard notification={notification} />
            </button>
          ))}
        </div>
      </section>

      {selectedNotification && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={closeNotification}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[32px] bg-background shadow-2xl sm:max-w-3xl sm:rounded-[32px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur-md sm:px-6">
              <div>
                <h2 className="text-xl font-extrabold text-foreground">
                  {t("alertsPreview.detailsTitle")}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {t("alertsPreview.detailsSubtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={closeNotification}
                aria-label={t("alertsPreview.close")}
                className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-foreground transition hover:bg-secondary/70 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-4 sm:p-6">
              <NotificationWidgetRenderer notification={selectedNotification} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
