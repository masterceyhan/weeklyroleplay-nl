import CfxProfilePicture from "@/components/cfx-profile-picture"
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

export const revalidate = 300
const serverCosts = 1750

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
  const currentMonthPayments = data.filter((payment) => {
    const paymentDate = new Date(payment.date)
    const currentDate = new Date()
    return (
      paymentDate.getMonth() === currentDate.getMonth() &&
      paymentDate.getFullYear() === currentDate.getFullYear()
    )
  })

  const recentDonations = currentMonthPayments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 15)

  const topDonator = currentMonthPayments
    .filter((x) => x.packages.length > 0)
    .reduce((prev, current) => {
      const prevAmount = parseFloat(prev.amount)
      const currentAmount = parseFloat(current.amount)
      return currentAmount > prevAmount ? current : prev
    }, currentMonthPayments[0])

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

      <div className="flex flex-col dark:bg-muted/10 p-6 rounded-lg border border-foreground/5 gap-2 transition-colors bg-foreground/5 w-full">
        <h2 className="font-semibold text-2xl">
          Donatie <span className="text-blue-500">Statistieken</span>
        </h2>
        <span className="font-semibold pt-2">Donateur van de maand</span>
        <div className="flex flex-col xl:flex-row gap-5">
          <div className="flex bg-muted/10 p-4 rounded-lg border border-foreground/5 w-1/2 xl:w-1/3 gap-5">
            <CfxProfilePicture
              username={topDonator.player.name}
              className="w-16 h-16 rounded-full"
            />

            <div className="flex flex-col">
              <span className="font-semibold">{topDonator.player.name}</span>
              <span className="text-sm text-foreground/80">
                €
                {data
                  .filter((payment) => {
                    const paymentDate = new Date(payment.date)
                    const currentDate = new Date()
                    return (
                      paymentDate.getMonth() === currentDate.getMonth() &&
                      paymentDate.getFullYear() === currentDate.getFullYear()
                    )
                  })
                  .reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <div className="w-full xl:w-2/3">
            <span className="font-semibold">Server Kosten</span>
            <div className="w-full dark:bg-background/30 bg-muted h-6 rounded-md">
              <div
                className="bg-blue-500 h-6 rounded-md from-blue-400 to-blue-500 bg-gradient-to-br"
                style={{
                  width: `${(currentMonthPayments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0) / serverCosts) * 100}%`,
                }}
              ></div>
            </div>

            <div className="mt-2">
              <span className="text-sm text-foreground/80 rounded-md">
                €
                {currentMonthPayments.reduce(
                  (sum, payment) => sum + parseFloat(payment.amount),
                  0,
                ) / serverCosts}
                {" / "}
              </span>
              <span className="text-sm text-blue-400">€{serverCosts}</span>
            </div>
          </div>
        </div>

        <span className="font-semibold mt-4">Recente Donaties</span>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {recentDonations.map((payment) => (
            <div
              className="flex bg-muted/10 p-4 rounded-lg border border-foreground/5 w-full gap-5"
              key={payment.id}
            >
              <CfxProfilePicture
                username={topDonator.player.name}
                className="w-16 h-16 rounded-full"
              />

              <div className="flex flex-col">
                <span className="font-semibold">{topDonator.player.name}</span>
                <span className="text-sm text-foreground/80">
                  {payment.packages.map((pkg) => pkg.name).join(", ")}
                </span>
                <span className="text-foreground/80 text-xs">
                  {new Date(payment.date).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
