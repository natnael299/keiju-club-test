import OwnerSwitcher from "@/components/profile/OwnerSwitcher";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SettingsList from "@/components/profile/SettingsList";
import UserCard from "@/components/profile/UserCard";

import AppLayout from "@/layouts/AppLayout";

export default function Profile() {
  return (
    <AppLayout>
      <ProfileHeader />

      <UserCard />

      <OwnerSwitcher />

      <SettingsList />
    </AppLayout>
  );
}
