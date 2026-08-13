import { CalendarDays, Clock3, Moon, Sun, Sunset } from "lucide-react";
import { useTranslation } from "react-i18next";

type GreetingKey = "night" | "morning" | "afternoon" | "evening";

function getGreetingKey(): GreetingKey {
  const hour = new Date().getHours();

  if (hour < 5) {
    return "night";
  }

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

function GreetingIcon({ greetingKey }: { greetingKey: GreetingKey }) {
  if (greetingKey === "night") {
    return <Moon className="h-7 w-7 text-[#5F5AB9]" strokeWidth={2.2} />;
  }

  if (greetingKey === "evening") {
    return <Sunset className="h-7 w-7 text-[#DD8E42]" strokeWidth={2.2} />;
  }

  return <Sun className="h-7 w-7 text-[#F0AF18]" strokeWidth={2.2} />;
}

function getBackgroundClass(greetingKey: GreetingKey) {
  if (greetingKey === "night") {
    return "bg-gradient-to-br from-[#E7E7FF] via-[#ECECFF] to-[#DADCF8]";
  }

  if (greetingKey === "evening") {
    return "bg-gradient-to-br from-[#F9EEE3] via-[#F7E8DC] to-[#EBD9E9]";
  }

  if (greetingKey === "afternoon") {
    return "bg-gradient-to-br from-[#FFF4D8] via-[#FAF0DF] to-[#E9F1DD]";
  }

  return "bg-gradient-to-br from-[#FFF8E8] via-[#F9F4E8] to-[#E7F0DF]";
}

export default function Greeting() {
  const { t, i18n } = useTranslation();

  const greetingKey = getGreetingKey();

  const locale = getLocale(i18n.language);

  return (
    <section
      className={[
        "relative mb-8 overflow-hidden rounded-[30px] px-6 pb-6 pt-6",
        "shadow-[0_14px_40px_rgba(70,75,120,0.10)]",
        "sm:px-8 sm:pb-8 sm:pt-8",
        getBackgroundClass(greetingKey),
      ].join(" ")}
    >
      {/* Decorative background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {greetingKey === "night" && (
          <>
            {/* Stars */}
            <div className="absolute right-[18%] top-[14%] h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.9)]" />

            <div className="absolute right-[30%] top-[23%] h-1 w-1 rounded-full bg-white/80" />

            <div className="absolute right-[11%] top-[33%] h-1 w-1 rounded-full bg-white/70" />

            <div className="absolute left-[14%] top-[43%] h-1 w-1 rounded-full bg-white/60" />

            {/* Clouds */}
            <div className="absolute right-[-20px] top-[42%] h-12 w-28 rounded-full bg-white/22 blur-[1px]" />

            <div className="absolute right-[32px] top-[38%] h-9 w-20 rounded-full bg-white/18 blur-[1px]" />

            {/* Soft lower shape */}
            <div className="absolute -bottom-20 -right-12 h-56 w-64 rounded-full bg-[#BEC4EE]/25" />

            <div className="absolute -bottom-28 left-[-35px] h-52 w-60 rounded-full bg-[#C8CCEF]/20" />
          </>
        )}

        {greetingKey !== "night" && (
          <>
            <div className="absolute -bottom-24 -right-16 h-64 w-72 rounded-full bg-white/20" />

            <div className="absolute -bottom-32 left-[-50px] h-60 w-64 rounded-full bg-primary/5" />
          </>
        )}
      </div>

      <div className="relative z-10">
        {/* Icon */}

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-[0_7px_18px_rgba(62,68,110,0.15)]">
          <GreetingIcon greetingKey={greetingKey} />
        </div>

        {/* Greeting */}

        <div className="mt-7 max-w-[270px] sm:max-w-md">
          <h1
            className={[
              "text-[36px] font-extrabold leading-[1.05] tracking-tight",
              greetingKey === "night" ? "text-[#14203A]" : "text-primary",
              "sm:text-5xl",
            ].join(" ")}
          >
            {t(`greeting.${greetingKey}Title`)}!
          </h1>

          <p
            className={[
              "mt-4 max-w-[250px] text-[16px] leading-6",
              greetingKey === "night"
                ? "text-[#38405B]"
                : "text-muted-foreground",
              "sm:max-w-lg sm:text-lg",
            ].join(" ")}
          >
            {t(`greeting.${greetingKey}Subtitle`)}
          </p>
        </div>

        {/* Date and time panel */}

        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center rounded-[22px] bg-white/95 px-4 py-4 shadow-[0_10px_28px_rgba(68,70,110,0.13)] backdrop-blur-sm sm:w-fit sm:min-w-[390px] sm:px-5">
          <div className="flex items-center gap-2.5">
            <CalendarDays
              className="h-[18px] w-[18px] shrink-0 text-primary"
              strokeWidth={2}
            />

            <span className="text-[13px] font-semibold capitalize leading-5 text-foreground sm:text-sm">
              {formatDate(locale)}
            </span>
          </div>

          <div className="mx-4 h-8 w-px bg-border" />

          <div className="flex items-center justify-end gap-2.5">
            <Clock3
              className="h-[18px] w-[18px] shrink-0 text-primary"
              strokeWidth={2}
            />

            <span className="text-[13px] font-semibold text-foreground sm:text-sm">
              {formatTime(locale)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
