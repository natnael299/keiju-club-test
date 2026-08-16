import { useEffect, useState } from "react";
import { Building2, Globe, LogOut, Mail, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Card from "@/components/shared/Card";
import OrganizerLayout from "@/layouts/OrganizerLayout";
import { organizationsApi } from "@/services/organizations.api";
import { useAuthStore } from "@/store/authStore";
import type { Organization } from "@/types";

export default function OrganizerProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const [organization, setOrganization] = useState<Organization | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== "organizationRep" || !user.organizationId) {
      return;
    }

    const fetchOrganization = async () => {
      try {
        setLoading(true);

        const organizationData = await organizationsApi.getById(
          user.organizationId!,
        );

        setOrganization(organizationData);
      } catch (error) {
        console.error("Failed to fetch organization:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchOrganization();
  }, [user]);

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {t("organizerProfile.title")}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {t("organizerProfile.description")}
        </p>

        <Card className="mb-6 mt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
              <Building2 className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-foreground">
                {loading ? "..." : (organization?.name ?? "-")}
              </h2>

              <p className="text-sm text-muted-foreground">
                {t("organizerProfile.partner")}
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                {t("organizerProfile.contactPerson")}
              </p>

              <p className="font-semibold text-foreground">
                {user?.fullName ?? "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                {t("organizerProfile.email")}
              </p>

              <p className="font-semibold text-foreground">
                {user?.email ?? "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                {t("organizerProfile.city")}
              </p>

              <p className="font-semibold text-foreground">
                {loading ? "..." : (organization?.city ?? "-")}
              </p>
            </div>
          </div>
        </Card>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
        >
          <LogOut className="h-5 w-5" />

          {t("settings.logout")}
        </button>
      </section>
    </OrganizerLayout>
  );
}
