import ReportsHeader from "@/components/reports/ReportsHeader";
//import WeeklySummary from "@/components/reports/WeeklySummary";
import LatestReport from "@/components/reports/LatestReport";
import PreviousReports from "@/components/reports/PreviousReports";
import AppLayout from "@/layouts/AppLayout";

export default function Reports() {
  return (
    <AppLayout>
      <ReportsHeader />
      <LatestReport />
      <PreviousReports />
    </AppLayout>
  );
}
