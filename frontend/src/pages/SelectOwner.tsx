import { useEffect } from "react";

import { Check, ChevronRight } from "lucide-react";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";

import Card from "@/components/shared/Card";
import LoadError from "@/components/shared/LoadError";

import { useAuthStore } from "@/store/authStore";
import { useOwnerStore } from "@/store/owner.store";

export default function SelectOwner() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const user = useAuthStore((state) => state.user);

  const owners = useOwnerStore((state) => state.owners);

  const loading = useOwnerStore((state) => state.loading);

  const error = useOwnerStore((state) => state.error);

  const fetchOwners = useOwnerStore((state) => state.fetchOwners);

  const selectedOwnerId = useOwnerStore((state) => state.selectedOwnerId);

  const setSelectedOwnerId = useOwnerStore((state) => state.setSelectedOwnerId);

  const ownerIds = user?.role === "caretaker" ? (user.ownerIds ?? []) : [];

  useEffect(() => {
    if (ownerIds.length === 0 || owners.length > 0) {
      return;
    }

    void fetchOwners(ownerIds);
  }, [ownerIds, owners.length, fetchOwners]);

  const handleRetry = async (): Promise<void> => {
    if (ownerIds.length === 0) {
      return;
    }

    await fetchOwners(ownerIds);
  };

  const handleSelectOwner = (ownerId: string): void => {
    setSelectedOwnerId(ownerId);

    navigate("/app/home", {
      replace: true,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={logo} alt="Keiju Club" className="mx-auto h-12 w-auto" />

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground">
            {t("selectOwner.title")}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {t("selectOwner.description")}
          </p>
        </div>

        {loading && owners.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            {t("selectOwner.loading")}
          </p>
        ) : error ? (
          <LoadError
            title={t("selectOwner.loadError", {
              defaultValue: "People could not be loaded",
            })}
            message={error}
            retrying={loading}
            onRetry={handleRetry}
          />
        ) : owners.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-5 py-6 text-center">
            <p className="font-semibold text-foreground">
              {t("selectOwner.emptyTitle")}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {t("selectOwner.emptyDescription")}
            </p>
          </div>
        ) : (
          <Card className="space-y-2 p-2">
            {owners.map((owner) => {
              const selected = owner.id === selectedOwnerId;

              return (
                <button
                  key={owner.id}
                  type="button"
                  onClick={() => handleSelectOwner(owner.id)}
                  className={[
                    "flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left transition",
                    selected ? "bg-primary/10" : "hover:bg-muted/40",
                  ].join(" ")}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={[
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary",
                      ].join(" ")}
                    >
                      {getInitials(owner.fullName)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-extrabold text-foreground">
                        {owner.fullName}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatBirthDate(owner.birthDate, i18n.language)}
                      </p>
                    </div>
                  </div>

                  {selected ? (
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </button>
              );
            })}
          </Card>
        )}
      </section>
    </main>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatBirthDate(birthDate: string, language: string): string {
  const date = new Date(`${birthDate}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return birthDate;
  }

  let locale = "fi-FI";

  if (language.startsWith("sv")) {
    locale = "sv-FI";
  }

  if (language.startsWith("en")) {
    locale = "en-FI";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
}
