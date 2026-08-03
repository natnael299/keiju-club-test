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

export default function Greeting() {
  const greeting = getGreeting();

  return (
    <section className="mb-10">
      <h1 className="text-3xl font-extrabold leading-tight text-primary">
        {greeting.title}!
      </h1>

      <p className="mt-4 text-xl text-muted-foreground">{greeting.subtitle}</p>
    </section>
  );
}
