import { useEffect } from "react";

import OwnerSwitcher from "@/components/profile/OwnerSwitcher";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SettingsList from "@/components/profile/SettingsList";
import UserCard from "@/components/profile/UserCard";
import LoadError from "@/components/shared/LoadError";

import AppLayout from "@/layouts/AppLayout";

import { useAuthStore } from "@/store/authStore";
import { useOwnerStore } from "@/store/owner.store";

export default function Profile() {
  const user = useAuthStore((state) => state.user);

  const owners = useOwnerStore((state) => state.owners);

  const loading = useOwnerStore((state) => state.loading);

  const error = useOwnerStore((state) => state.error);

  const fetchOwners = useOwnerStore((state) => state.fetchOwners);

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

  return (
    <AppLayout>
      <ProfileHeader />

      {loading && owners.length === 0 ? (
        <p className="mb-6 text-sm text-muted-foreground">Loading...</p>
      ) : error ? (
        <div className="mb-6">
          <LoadError
            title="People could not be loaded"
            message={error}
            retrying={loading}
            onRetry={handleRetry}
          />
        </div>
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
