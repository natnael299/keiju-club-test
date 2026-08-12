import { useEffect } from "react";

import OwnerSwitcher from "@/components/profile/OwnerSwitcher";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SettingsList from "@/components/profile/SettingsList";
import UserCard from "@/components/profile/UserCard";

import AppLayout from "@/layouts/AppLayout";

import { useAuthStore } from "@/store/authStore";
import { useOwnerStore } from "@/store/owner.store";

export default function Profile() {
  const user = useAuthStore((state) => state.user);

  const fetchOwners = useOwnerStore((state) => state.fetchOwners);

  const owners = useOwnerStore((state) => state.owners);

  const loading = useOwnerStore((state) => state.loading);

  useEffect(() => {
    if (user?.role !== "caretaker" || !user.ownerIds?.length) {
      return;
    }

    /*
     * Avoid fetching them again every time
     * the Profile page is opened.
     */
    if (owners.length > 0) {
      return;
    }

    void fetchOwners(user.ownerIds);
  }, [user, owners.length, fetchOwners]);

  return (
    <AppLayout>
      <ProfileHeader />

      {loading && owners.length === 0 ? (
        <p className="mb-6 text-sm text-muted-foreground">Loading...</p>
      ) : (
        <>
          <UserCard />

          <OwnerSwitcher />

          <SettingsList />
        </>
      )}
    </AppLayout>
  );
}
