import type { ReactNode } from "react";
import OrganizerHeader from "@/components/navigation/OrganizerHeader";
import OrganizerBottomNav from "@/components/navigation/OrganizerBottomNav";

type OrganizerLayoutProps = {
  children: ReactNode;
};

export default function OrganizerLayout({ children }: OrganizerLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <OrganizerHeader />

        <main className="flex-1 px-5 pb-28 pt-6">{children}</main>

        <OrganizerBottomNav />
      </div>
    </div>
  );
}
