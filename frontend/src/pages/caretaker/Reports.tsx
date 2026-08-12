import { useEffect, useMemo } from "react";

import ReportsHeader from "@/components/reports/ReportsHeader";
import LatestReport from "@/components/reports/LatestReport";
import PreviousReports from "@/components/reports/PreviousReports";
import AppLayout from "@/layouts/AppLayout";

import { useOwnerStore } from "@/store/owner.store";
import { useReportsStore } from "@/store/reports.store";

export default function Reports() {
  const selectedOwnerId = useOwnerStore((state) => state.selectedOwnerId);

  const reports = useReportsStore((state) => state.reports);

  const loading = useReportsStore((state) => state.loading);

  const fetchOwnerReports = useReportsStore((state) => state.fetchOwnerReports);

  useEffect(() => {
    if (!selectedOwnerId) {
      return;
    }

    void fetchOwnerReports(selectedOwnerId);
  }, [selectedOwnerId, fetchOwnerReports]);

  const currentReport = useMemo(() => {
    return reports.find((report) => report.isCurrent) ?? reports[0] ?? null;
  }, [reports]);

  const previousReports = useMemo(() => {
    return reports
      .filter((report) => report.id !== currentReport?.id)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );
  }, [reports, currentReport]);

  return (
    <AppLayout>
      <ReportsHeader />

      {loading ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          Ladataan raportteja...
        </div>
      ) : (
        <>
          <LatestReport report={currentReport} />

          <PreviousReports reports={previousReports} />
        </>
      )}
    </AppLayout>
  );
}
