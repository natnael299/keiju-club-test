import { X } from "lucide-react";

import NotificationCard from "@/components/cards/NotificationCard";
import NotificationWidgetRenderer from "@/components/alerts/NotificationWidgetRenderer";
import type { Notification } from "@/types";

type AlertDetailDialogProps = {
  notification: Notification | null;
  onClose: () => void;
};

export default function AlertDetailDialog({
  notification,
  onClose,
}: AlertDetailDialogProps) {
  if (!notification) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-dialog-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-5"
      onMouseDown={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] bg-background shadow-2xl sm:rounded-[28px]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2
              id="alert-dialog-title"
              className="text-xl font-extrabold text-foreground"
            >
              Hälytyksen tiedot
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Lisätiedot ja tapahtumaan liittyvät näkymät
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Sulje"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-5">
          <div className="space-y-4">
            <NotificationCard notification={notification} />

            <NotificationWidgetRenderer notification={notification} />
          </div>
        </div>
      </div>
    </div>
  );
}
