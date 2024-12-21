import { env } from "@/env"

type Payment = {
  id: number
  amount: string
  date: string
  currency: {
    iso_4217: string
    symbol: string
  }
  gateway: {
    id: number
    name: string
  }
  status: string
  email: string
  player: {
    id: number
    name: string
    uuid: string
  }
  packages: {
    id: number
    name: string
  }[]
  notes: {
    created_at: string
    note: string
  }[]
  creator_code: string
}

export default async function Page() {
  const response = await fetch("https://plugin.tebex.io/payments", {
    headers: {
      ["X-Tebex-Secret"]: env.TEBEX_SECRET,
    },
    next: {
      revalidate: 300,
    },
  })

  const data = (await response.json()) as Payment[]

  return (
    <main className="flex flex-col items-center w-full h-full gap-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Hoe werkt een donatie?</h1>
        <p className="text-foreground/90 text-center max-w-3xl">
          Een donatie is niet niks, het is daarom erg belangrijk dat u 18+ bent. Zo niet doe dit dan
          in overleg met een voogd. Het claimen van een donatie gaat automatisch, het enige wat u
          moet doen tijdens de betaling is een Server ID meegeven met een discord naam + tag zodat
          er niks mis kan gaan! ER IS GEEN REFUND MOGELIJK OP ONZE PRODUCTEN!
        </p>
      </div>

      <div className="flex flex-col dark:bg-muted/10 p-6 rounded-lg border border-foreground/5 gap-2 group hover:bg-foreground/10 transition-colors bg-foreground/5 w-full">
        <h2 className="text-xl font-semibold">
          Donatie <span className="text-blue-500">Statistieken</span>
        </h2>

        <div></div>
      </div>
    </main>
  )
}
