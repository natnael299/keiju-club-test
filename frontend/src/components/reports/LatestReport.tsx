import { CheckCircle2, ChevronRight } from "lucide-react";
import Card from "@/components/shared/Card";

const highlights = [
  "Unen keskiarvo 6,5 h viikossa",
  "Keittiöaktiivisuus 5/7 päivää",
  "Aamurutiinit suoritettu useimpina päivinä",
];

export default function LatestReport() {
  return (
    <section className="mb-8">
      <Card className="p-5">
        <h2 className="text-2xl font-extrabold text-primary">
          Viimeisin raportti
        </h2>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-primary">
              MK
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-primary">
                Marja Korhonen
              </h3>
              <p className="text-sm text-muted-foreground">
                VIIKKO 22 · 22.6.–28.6.2026
              </p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-primary" />
        </div>

        <p className="mt-5 text-base leading-7 text-foreground">
          Yleisesti vakaa viikko, jossa kaksi päivää vähentynyttä aktiivisuutta
          ja yksi yö heikon unen vuoksi. Ei välittömiä huolia, mutta unta
          kannattaa seurata tulevalla viikolla.
        </p>

        <h4 className="mt-5 text-sm font-extrabold uppercase text-muted-foreground">
          Kohokohdat
        </h4>

        <div className="mt-3 space-y-2">
          {highlights.map((item) => (
            <p key={item} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 fill-primary text-white" />
              {item}
            </p>
          ))}
        </div>

        <button className="mt-6 flex w-full items-center justify-between text-left text-lg font-extrabold text-primary">
          Näytä koko raportti
          <ChevronRight className="h-5 w-5" />
        </button>
      </Card>
    </section>
  );
}
