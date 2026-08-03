import { CalendarDays, Clock3, Sun } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      title: "Hyvää huomenta",
      subtitle: "Toivotamme sinulle mukavaa päivää.",
    };
  }

  if (hour < 18) {
    return {
      title: "Hyvää iltapäivää",
      subtitle: "Toivotamme sinulle mukavaa iltapäivää.",
    };
  }

  return {
    title: "Hyvää iltaa",
    subtitle: "Toivotamme sinulle rauhallista iltaa.",
  };
}

function formatDate() {
  return new Intl.DateTimeFormat("fi-FI", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function formatTime() {
  return new Intl.DateTimeFormat("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function Greeting() {
  const greeting = getGreeting();

  return (
    <section className="relative mb-10 overflow-hidden rounded-[36px] bg-gradient-to-b from-[#eef6ec] via-[#f5f7ef] to-[#e7f2e4] px-6 pb-8 pt-12 shadow-sm">
      {/* Background hills */}
      <div className="absolute inset-x-0 bottom-0 h-52">
        <div className="absolute bottom-0 left-[-10%] h-40 w-[65%] rounded-[100%] bg-[#dcebd7]" />

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
          {greeting.title}!
        </h1>

        <p className="mt-4 max-w-xl text-xl text-muted-foreground">
          {greeting.subtitle}
        </p>

        <div className="mt-8 flex items-center gap-5 rounded-full bg-white px-7 py-4 shadow-lg">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />

            <span className="font-medium capitalize">{formatDate()}</span>
          </div>

          <div className="h-2 w-2 rounded-full bg-[#E6A43B]" />

          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-primary" />

            <span className="font-medium">{formatTime()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
