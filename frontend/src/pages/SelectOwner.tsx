import { Check, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";
import Card from "@/components/shared/Card";

import { useAuthStore } from "@/store/authStore";
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

export default function SelectOwner() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const owners = useOwnerStore((state) => state.owners);

  const loading = useOwnerStore((state) => state.loading);

  const fetchOwners = useOwnerStore((state) => state.fetchOwners);

  const selectedOwnerId = useOwnerStore((state) => state.selectedOwnerId);

  const setSelectedOwnerId = useOwnerStore((state) => state.setSelectedOwnerId);

  useEffect(() => {
    if (user?.role !== "caretaker" || !user.ownerIds?.length) {
      return;
    }

    if (owners.length === 0) {
      void fetchOwners(user.ownerIds);
    }
  }, [user, owners.length, fetchOwners]);

  const handleSelectOwner = (ownerId: string) => {
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

          <h1 className="mt-6 text-3xl font-extrabold text-foreground">
            Select person
          </h1>

          <p className="mt-2 text-muted-foreground">
            Choose whose information you want to view.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-sm text-muted-foreground">
            Loading...
          </p>
        ) : (
          <Card className="space-y-2 p-2">
            {owners.map((owner) => {
              const selected = owner.id === selectedOwnerId;

              return (
                <button
                  key={owner.id}
                  type="button"
                  onClick={() => handleSelectOwner(owner.id)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left transition hover:bg-primary/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
                      {getInitials(owner.fullName)}
                    </div>

                    <div>
                      <p className="font-extrabold text-foreground">
                        {owner.fullName}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {owner.birthDate}
                      </p>
                    </div>
                  </div>

                  {selected ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
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
