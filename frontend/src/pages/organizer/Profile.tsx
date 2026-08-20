import { useEffect, useState } from "react";

import { Building2, Mail, MapPin, Phone, UserRound } from "lucide-react";

import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";
import SettingsList from "@/components/profile/SettingsList";

import OrganizerLayout from "@/layouts/OrganizerLayout";

import { organizationsApi } from "@/services/organizations.api";

import { useAuthStore } from "@/store/authStore";

import type { Organization } from "@/types";

export default function OrganizerProfile() {
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);

  const [organization, setOrganization] = useState<Organization | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadOrganization = async () => {
      if (user?.role !== "organizationRep" || !user.organizationId) {
        if (active) {
          setError("No organization is connected to this account.");

          setLoading(false);
        }

        return;
      }

      try {
        const organizationData = await organizationsApi.getById(
          user.organizationId,
        );

        if (!active) {
          return;
        }

        setOrganization(organizationData);
      } catch (error) {
        console.error("ORGANIZATION PROFILE ERROR:", error);

        if (!active) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Organization details could not be loaded.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadOrganization();

    return () => {
      active = false;
    };
  }, [user]);

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {t("organizer.profile", {
            defaultValue: "Profile",
          })}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {t("organizer.profileSubtitle", {
            defaultValue: "View your organization and account information.",
          })}
        </p>
      </section>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("organizer.profileLoading", {
            defaultValue: "Loading organization information...",
          })}
        </p>
      ) : error ? (
        <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4">
          <p className="font-semibold text-destructive">
            {t("organizer.profileError", {
              defaultValue: "Organization information could not be loaded",
            })}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
      ) : organization ? (
        <>
          <Card className="mt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Building2 className="h-8 w-8" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-extrabold text-foreground">
                  {organization.name}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {t("organizer.organization", {
                    defaultValue: "Keiju Club organization",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-border pt-5">
              <InformationRow
                icon={MapPin}
                label={t("organizer.organizationAddress", {
                  defaultValue: "Address",
                })}
                value={`${organization.address}, ${organization.city}`}
              />

              <InformationRow
                icon={Mail}
                label={t("organizer.organizationEmail", {
                  defaultValue: "Email",
                })}
                value={organization.email}
              />

              <InformationRow
                icon={Phone}
                label={t("organizer.organizationPhone", {
                  defaultValue: "Phone",
                })}
                value={organization.phone}
              />
            </div>
          </Card>

          <Card className="my-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <UserRound className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("organizer.representative", {
                    defaultValue: "Organization representative",
                  })}
                </p>

                <h3 className="mt-1 truncate font-extrabold text-foreground">
                  {user?.fullName}
                </h3>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
          </Card>

          <SettingsList />
        </>
      ) : null}
    </OrganizerLayout>
  );
}

type InformationRowProps = {
  icon: typeof Mail;
  label: string;
  value: string;
};

function InformationRow({ icon: Icon, label, value }: InformationRowProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}
