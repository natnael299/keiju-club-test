import { Building2, Globe, LogOut, Mail, UserRound } from "lucide-react";

import Card from "@/components/shared/Card";
import OrganizerLayout from "@/layouts/OrganizerLayout";

export default function OrganizerProfile() {
  return (
    <OrganizerLayout>
      <section className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Manage organization details.
        </p>
      </section>

      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
            <Building2 className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              Turku Senioriliikunta ry
            </h2>
            <p className="text-sm text-muted-foreground">Keiju Club partner</p>
          </div>
        </div>
      </Card>

      <Card className="mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <UserRound className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Contact person</p>
            <p className="font-semibold text-foreground">Sari Lahtinen</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-semibold text-foreground">
              sari@senioriliikunta.fi
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
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground"
      >
        <LogOut className="h-5 w-5" />
        Log out
      </button>
    </OrganizerLayout>
  );
}
