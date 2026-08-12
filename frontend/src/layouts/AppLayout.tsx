import { useEffect, type ReactNode } from "react";

import Header from "@/components/navigation/Header";
import BottomNav from "@/components/navigation/BottomNav";

import { useAuthStore } from "@/store/authStore";
import { useOwnerStore } from "@/store/owner.store";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const user = useAuthStore((state) => state.user);

  const owners = useOwnerStore((state) => state.owners);

  const fetchOwners = useOwnerStore((state) => state.fetchOwners);

  useEffect(() => {
    if (user?.role !== "caretaker" || !user.ownerIds?.length) {
      return;
    }

    if (owners.length > 0) {
      return;
    }

    void fetchOwners(user.ownerIds);
  }, [user, owners.length, fetchOwners]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-4 sm:px-6">
        <Header />

        <main>{children}</main>
      </div>

      <BottomNav />
    </div>
  );
}
