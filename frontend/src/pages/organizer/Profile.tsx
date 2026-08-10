import { Building2, Globe, LogOut, Mail, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/shared/Card";
import OrganizerLayout from "@/layouts/OrganizerLayout";
import { useAuthStore } from "@/store/authStore";

export default function OrganizerProfile() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <OrganizerLayout>
      <section>
        <h1 className="text-3xl font-extrabold text-primary">Profile</h1>

        <p className="mt-2 text-muted-foreground">
          Manage organization details.
        </p>

        <Card className="mb-6 mt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
              <Building2 className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-foreground">
                {user?.organizationName ?? "Turku Senioriliikunta ry"}
              </h2>

              <p className="text-sm text-muted-foreground">
                Keiju Club partner
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">Contact person</p>

              <p className="font-semibold text-foreground">
                {user?.fullName ?? "Sari Lahtinen"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">Email</p>

              <p className="font-semibold text-foreground">
                {user?.email ?? "sari@senioriliikunta.fi"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">City</p>

              <p className="font-semibold text-foreground">Turku</p>
            </div>
          </div>
        </Card>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </section>
    </OrganizerLayout>
  );
}
