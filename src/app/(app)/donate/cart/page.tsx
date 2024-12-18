"use client"

import Image from "next/image"
import { useBasket } from "@/hooks/useBasket"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FaCreditCard, FaTrash } from "react-icons/fa"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const url = "https://servers-frontend.fivem.net/api/servers/single/meojrd"

type Player = {
  id: number
  name: string
  identifiers: string[]
}

export default function Page() {
  const { basket, isLoading, isTebexLoading, removePackage } = useBasket()
  const [players, setPlayers] = useState<Player[]>([])
  const [value, setValue] = useState<string>()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function checkout() {
    if (!basket) return
    window.Tebex.checkout.init({
      ident: basket.ident,
      theme: "dark",
    })

    window.Tebex.checkout.launch()
  }

  useEffect(() => {
    fetch(url, {
      next: {
        revalidate: 60,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlayers(data.Data.players))
      .catch(() => toast.error("Fout bij het ophalen van de spelers!"))
  }, [])

  function registerEvents() {
    window.Tebex.checkout.on("payment:complete", (e) => {
      localStorage.removeItem("basketIdent")

      const transactionId = e.payment.txnId
      router.push(`/donate/complete?transactionId=${transactionId}`)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold">Winkelwagen</h1>
          <span className="text-foreground/80">
            {(basket?.packages?.length ?? 0 > 0)
              ? "Hieronder staan al uw producten!"
              : "Je winkelmand is leeg!"}
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 w-full gap-10">
          <div className="flex flex-col xl:col-span-3">
            <div className="flex gap-2 w-full flex-col">
              {basket?.packages?.map((pkg, i) => (
                <div
                  key={i}
                  className="flex bg-muted/10 p-4 rounded-lg border border-foreground/5 gap-2 w-full"
                >
                  <Image
                    src={pkg?.image ?? "/logo.png"}
                    width={128}
                    height={128}
                    alt={pkg.name.replaceAll("_", " ")}
                  />
                  <div className="pt-4 h-full">
                    <span className="font-bold">{pkg.name.replaceAll("_", " ")}</span>
                    <div
                      className="text-foreground/80 text-sm line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: pkg.description }}
                    />
                    <div className="space-x-2 pt-2">
                      <span className="text-sm align-bottom">{pkg.in_basket.quantity}x</span>
                      <span className="text-sm align-bottom">€{pkg.in_basket.price}</span>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="group"
                    onClick={() => {
                      removePackage(pkg.id)
                    }}
                    disabled={isLoading}
                  >
                    <FaTrash className="mx-4 group-hover:text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col bg-muted/10 p-4 rounded-lg border border-foreground/5 gap-3 w-full xl:col-span-2">
            <h2 className="text-lg font-semibold">Overzicht</h2>
            <Separator />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? players.find((player) => player.id === Number(value))?.name
                    : "Selecteer Speler..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Zoek speler..." />
                  <CommandList>
                    <CommandEmpty>Geen spelers gevonden.</CommandEmpty>
                    <CommandGroup>
                      {players.map((player) => (
                        <CommandItem
                          key={player.id}
                          value={player.id.toString()}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : player.id.toString())
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === player.id.toString() ? "opacity-100" : "opacity-0",
                            )}
                          />
                          [{player.id}] {player.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {!players
              .find((player) => player.id === Number(value))
              ?.identifiers.find((x) => x.startsWith("fivem:"))
              ?.includes(basket?.username_id ?? "dannyisdik") && (
              <span className="text-orange-500 text-xs">
                Waarschuwing: FiveM account komt niet overeen
              </span>
            )}

            <Separator />
            <div className="font-medium text-foreground/90 justify-between flex">
              <span>Subtotaal</span>
              <span>{isTebexLoading ? "Laden..." : `€${basket?.total_price ?? 0.0},-`}</span>
            </div>

            <Button
              className="bg-blue-500 text-white hover:bg-blue-400 border border-blue-400 hover:text-white w-full mt-5"
              disabled={isTebexLoading || basket?.packages?.length === 0}
              onClick={() => checkout()}
              size="lg"
            >
              <FaCreditCard className="mr-2" />
              Afrekenen
            </Button>
          </div>
        </div>
      </div>

      <Script
        src="https://js.tebex.io/v/1.js"
        async
        onLoad={() => {
          registerEvents()
        }}
      />
    </>
  )
}
