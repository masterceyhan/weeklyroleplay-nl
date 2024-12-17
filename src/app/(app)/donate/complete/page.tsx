import { env } from "@/env"
import { redirect } from "next/navigation"
import { FaCheckCircle } from "react-icons/fa"

type Payment = {
  amount: string
  date: string
  email: string
  player: {
    name: string
    uuid: string
  }
}

export default async function Page(props: { searchParams: Promise<{ transactionId: string }> }) {
  const { transactionId } = await props.searchParams
  if (!transactionId) return redirect("/")

  const response = await fetch(`https://plugin.tebex.io/payments/${transactionId}`, {
    headers: {
      ["X-Tebex-Secret"]: env.TEBEX_SECRET,
    },
  })

  // console
  // if (!response.ok) return redirect("/")
  const payment = (await response.json()) as Payment

  return (
    <div className="flex justify-center gap-4 flex-col items-center">
      <FaCheckCircle
        size={54}
        className="text-white bg-blue-500 border border-blue-400 p-3 rounded-xl"
      />

      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">Bedankt voor uw bestelling!</h1>
        <p className="text-foreground/80 text-sm max-w-md">
          U zulk zo snel mogelijk uw producten ontvangen, dit kan maximaal 15 minuten duren.
        </p>

        <div className="flex flex-col pt-10 max-w-md w-full text-sm gap-1">
          <span className="text-sm font-medium text-left">Betaling Gegevens</span>
          <PaymentField label={"Transactie ID"} value={transactionId} />
          <PaymentField label={"Datum"} value={new Date(payment?.date).toLocaleString()} />
          <PaymentField label={"Totaal"} value={`€${payment?.amount},-`} />
          <PaymentField
            label={"Gebruiker"}
            value={`${payment.player.name} (${payment.player.uuid})`}
          />
          <PaymentField label={"Email"} value={`${payment.email}`} />
        </div>
      </div>
    </div>
  )
}

function PaymentField(props: { label: string; value: string }) {
  return (
    <div className="w-full flex justify-between bg-muted/10 p-2 rounded-lg border border-foreground/5">
      <span className="font-medium">{props.label}</span>
      <span className="text-foreground/90">{props.value}</span>
    </div>
  )
}
