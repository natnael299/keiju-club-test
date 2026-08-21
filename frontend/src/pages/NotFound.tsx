import { ArrowLeft, Home } from "lucide-react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useAuthStore } from "@/store/authStore";

export default function NotFound() {
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);

  const homePath =
    user?.role === "organizationRep"
      ? "/organizer/dashboard"
      : user?.role === "caretaker"
        ? "/app/home"
        : "/login";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          404
        </p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">
          {t("notFound.title", {
            defaultValue: "Page not found",
          })}
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {t("notFound.description", {
            defaultValue:
              "The page may have been moved, removed or the address may be incorrect.",
          })}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition hover:bg-muted/40"
          >
            <ArrowLeft className="h-4 w-4" />

            {t("notFound.back", {
              defaultValue: "Go back",
            })}
          </button>

          <Link
            to={homePath}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Home className="h-4 w-4" />

            {t("notFound.home", {
              defaultValue: "Go to home",
            })}
          </Link>
        </div>
      </section>
    </main>
  );
}
