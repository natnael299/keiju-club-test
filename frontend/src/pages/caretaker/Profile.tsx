import { useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";

import ProfileHeader from "@/components/profile/ProfileHeader";
import UserCard from "@/components/profile/UserCard";
import SettingsList from "@/components/profile/SettingsList";

import { useOwnerStore } from "@/store/owner.store";

export default function Profile() {
  const fetchOwners = useOwnerStore((state) => state.fetchOwners);

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  return (
    <AppLayout>
      <ProfileHeader />

      <UserCard />

      <SettingsList />
    </AppLayout>
  );
}
