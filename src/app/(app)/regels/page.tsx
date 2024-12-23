import { punishments, rules } from "@/data/rules"

export default function Page() {
  return (
    <main>
      <section className="mx-auto p-2 sm:container max-w-7xl py-10 space-y-12">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">Onze Regels</h1>
          <p className="opacity-75">
            Onze regels moeten altijd worden nageleeft, indien dit niet wordt gedaan zullen er
            consequenties plaatsvinden. Denk aan het geven van taakstraffen/warnen en evt zelfs een
            ban wat dan kan varieren van een paar uur tot een permanente ban!
          </p>
        </div>
        <div className="p-5 rounded-xl bg-foreground/5 border border-foreground/10 space-y-5">
          <h2 className="font-semibold text-xl">Strafcategorieën</h2>
          <div className="p-2 rounded space-y-3">
            {punishments.map(({ title, description }, index) => (
              <div key={index} className="flex divide-x divide-foreground/20">
                <div className="pr-3">
                  <h3 className="font-semibold">{title}</h3>
                </div>
                <div className="pl-3">
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-xl bg-foreground/5 border border-foreground/10 divide-y divide-foreground/10">
          {rules.map(({ title, description }, index) => (
            <div className="pb-5 pt-5 space-y-3" key={index}>
              <h2 className="font-semibold text-xl">{title}</h2>
              <p className="opacity-75">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
