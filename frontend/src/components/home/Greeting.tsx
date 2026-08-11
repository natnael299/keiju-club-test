import { CalendarDays, Clock3, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

type GreetingKey = "morning" | "afternoon" | "evening";

function getGreetingKey(): GreetingKey {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "morning";
  }

  if (hour < 18) {
    return "afternoon";
  }

  return "evening";
}

function getLocale(language: string) {
  if (language.startsWith("sv")) {
    return "sv-FI";
  }

  if (language.startsWith("en")) {
    return "en-FI";
  }

  return "fi-FI";
}

function formatDate(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function formatTime(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function Greeting() {
  const { t, i18n } = useTranslation();

  const greetingKey = getGreetingKey();

  const locale = getLocale(i18n.language);

  return (
    <section className="relative mb-10 overflow-hidden rounded-[32px] bg-[#f4f8f1] px-6 py-14 sm:px-10">
      {/* Background hills */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-[-15%] h-48 w-[70%] rounded-[100%] bg-[#e4f1df]" />

        <div className="absolute bottom-0 left-[20%] h-28 w-[70%] rounded-[100%] bg-[#d5e6d2]" />
      </div>

      {/* Decorative trees */}

      <div className="absolute bottom-8 right-10 flex items-end gap-4 opacity-40">
        <div className="h-14 w-6 rounded-full bg-[#6a9775]" />

        <div className="h-24 w-8 rounded-full bg-[#5d8868]" />

        <div className="h-36 w-10 rounded-full bg-[#4f785b]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
          <Sun className="h-9 w-9 text-[#F4B400]" strokeWidth={2} />
        </div>

        <h1 className="text-5xl font-extrabold text-primary">
          {t(`greeting.${greetingKey}Title`)}!
        </h1>

        <p className="mt-4 max-w-xl text-xl text-muted-foreground">
          {t(`greeting.${greetingKey}Subtitle`)}
        </p>

        <div className="mt-8 flex items-center gap-5 rounded-full bg-white px-7 py-4 shadow-lg">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />

            <span className="font-medium capitalize">{formatDate(locale)}</span>
          </div>

          <div className="h-2 w-2 rounded-full bg-[#E6A43B]" />

          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-primary" />

            <span className="font-medium">{formatTime(locale)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
