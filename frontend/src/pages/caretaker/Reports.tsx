import { useEffect, useMemo } from "react";

import LatestReport from "@/components/reports/LatestReport";
import PreviousReports from "@/components/reports/PreviousReports";
import ReportsHeader from "@/components/reports/ReportsHeader";
import LoadError from "@/components/shared/LoadError";

import AppLayout from "@/layouts/AppLayout";

import { useOwnerStore } from "@/store/owner.store";
import { useReportsStore } from "@/store/reports.store";

export default function Reports() {
  const selectedOwnerId = useOwnerStore((state) => state.selectedOwnerId);

  const reports = useReportsStore((state) => state.reports);

  const loading = useReportsStore((state) => state.loading);

  const error = useReportsStore((state) => state.error);

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
        (firstReport, secondReport) =>
          new Date(secondReport.startDate).getTime() -
          new Date(firstReport.startDate).getTime(),
      );
  }, [reports, currentReport]);

  const handleRetry = async (): Promise<void> => {
    if (!selectedOwnerId) {
      return;
    }

    await fetchOwnerReports(selectedOwnerId);
  };

  return (
    <AppLayout>
      <ReportsHeader />

      {loading && reports.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          Ladataan raportteja...
        </div>
      ) : error ? (
        <LoadError
          title="Raportteja ei voitu ladata"
          message={error}
          retrying={loading}
          onRetry={handleRetry}
        />
      ) : (
        <>
          <LatestReport report={currentReport} />

          <PreviousReports reports={previousReports} />
        </>
      )}
    </AppLayout>
  );
}
