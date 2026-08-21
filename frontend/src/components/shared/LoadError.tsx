import { RefreshCw } from "lucide-react";

import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  message?: string | null;
  retrying?: boolean;
  onRetry: () => void | Promise<void>;
};

export default function LoadError({
  title,
  message,
  retrying = false,
  onRetry,
}: Props) {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4"
    >
      <p className="font-semibold text-red-700">{title}</p>

      {message && <p className="mt-1 text-sm text-red-600">{message}</p>}

      <button
        type="button"
        disabled={retrying}
        onClick={() => void onRetry()}
        className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw
          className={["h-4 w-4", retrying ? "animate-spin" : ""].join(" ")}
        />

        {retrying
          ? t("common.retrying", {
              defaultValue: "Trying again...",
            })
          : t("common.tryAgain", {
              defaultValue: "Try again",
            })}
      </button>
    </div>
  );
}
