import type { ReactNode } from "react";
import Header from "@/components/navigation/Header";
import BottomNav from "@/components/navigation/BottomNav";

type AppLayoutProps = {
  children: ReactNode;
  showBottomNav?: boolean;
};

export default function AppLayout({
  children,
  showBottomNav = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <Header />

        <main className="flex-1 px-5 pb-6 pt-5">{children}</main>

        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
