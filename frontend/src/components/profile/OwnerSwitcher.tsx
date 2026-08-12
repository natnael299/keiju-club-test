import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";
import { useOwnerStore } from "@/store/owner.store";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function OwnerSwitcher() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const owners = useOwnerStore((state) => state.owners);

  const selectedOwnerId = useOwnerStore((state) => state.selectedOwnerId);

  const setSelectedOwnerId = useOwnerStore((state) => state.setSelectedOwnerId);

  const selectedOwner = owners.find((owner) => owner.id === selectedOwnerId);

  /*
   * No switcher is needed when the caretaker
   * only has access to one elderly person.
   */
  if (owners.length <= 1 || !selectedOwner) {
    return null;
  }

  const handleSelectOwner = (ownerId: string) => {
    setSelectedOwnerId(ownerId);
    setOpen(false);
  };

  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
        {t("ownerSwitcher.title")}
      </h2>

      <Card className="overflow-hidden p-0">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-muted/30"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
              {getInitials(selectedOwner.fullName)}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                {t("ownerSwitcher.currentlyViewing")}
              </p>

              <p className="truncate font-extrabold text-foreground">
                {selectedOwner.fullName}
              </p>
            </div>
          </div>

          <ChevronDown
            className={[
              "h-5 w-5 shrink-0 text-primary transition-transform duration-200",
              open ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>

        {open && (
          <div className="border-t border-border bg-muted/10 p-2">
            {owners.map((owner) => {
              const selected = owner.id === selectedOwnerId;

              return (
                <button
                  key={owner.id}
                  type="button"
                  onClick={() => handleSelectOwner(owner.id)}
                  className={[
                    "flex w-full items-center justify-between gap-4 rounded-2xl px-3 py-3 text-left transition",
                    selected ? "bg-primary/10" : "hover:bg-muted/50",
                  ].join(" ")}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-primary",
                      ].join(" ")}
                    >
                      {getInitials(owner.fullName)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">
                        {owner.fullName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {formatBirthDate(owner.birthDate)}
                      </p>
                    </div>
                  </div>

                  {selected && (
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </section>
  );
}

function formatBirthDate(birthDate: string) {
  const date = new Date(`${birthDate}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return birthDate;
  }

  return new Intl.DateTimeFormat("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
}
