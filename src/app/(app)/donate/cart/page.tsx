"use client"

import Image from "next/image"
import { useBasket } from "@/hooks/useBasket"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FaCreditCard, FaDiscord, FaTrash } from "react-icons/fa"
import { useState } from "react"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { tebexHeadlessClient } from "@/lib/tebex"
import { Input } from "@/components/ui/input"
import { signIn, useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Page() {
  const { basket, isLoading, isTebexLoading, removePackage, setBasket } = useBasket()
  const [serverId, setValue] = useState<number>()

  const { data: session } = useSession()
  const router = useRouter()

  function checkout() {
    if (!basket) return
    ;(async () => {
      const packages = basket.packages.map((pkg) => ({
        id: pkg.id,
        quantity: pkg.in_basket.quantity,
      }))
      for (const pkg of packages) {
        await tebexHeadlessClient.removePackage(basket.ident, pkg.id)
      }

      for (const pkg of packages) {
        await tebexHeadlessClient.addPackageToBasket(basket.ident, pkg.id, pkg.quantity, "single", {
          serverId: serverId,
        })
      }

      window.Tebex.checkout.init({
        ident: basket.ident,
        theme: "dark",
      })

      window.Tebex.checkout.launch()
    })()
  }

  function registerEvents() {
    window.Tebex.checkout.on("payment:complete", (e) => {
      localStorage.removeItem("basketIdent")
      setBasket(undefined)

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
                    className="group ml-auto"
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

            <div className="w-full rounded-lg">
              <p className="text-sm text-foreground/80">
                U kunt uw Server ID bekijken doormiddel van Z ingedrukt te houden!
              </p>
              <Input
                placeholder="Server ID"
                className="w-full bg-background/20 h-10 mt-2"
                value={serverId || 0}
                onChange={(e) => {
                  const value = e.target.value
                  if (/^\d*$/.test(value)) {
                    setValue(Number(value))
                  }
                }}
              />
            </div>

            {session?.user ? (
              <div className="flex gap-5 items-center pt-4">
                <Image
                  src={session.user.image ?? "/logo.png"}
                  width={128}
                  height={128}
                  className="w-10 rounded-full"
                  alt="Profile Picture"
                />

                <span className="font-bold text-foreground/90">{session.user.name}</span>
                <Button
                  className="ml-auto"
                  variant="destructive"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Uitloggen
                </Button>
              </div>
            ) : (
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400 border border-blue-400 hover:text-white"
                onClick={() => {
                  signIn("discord")
                }}
              >
                <FaDiscord className="mr-2" />
                Login met Discord
              </Button>
            )}

            <Separator />
            <div className="font-medium text-foreground/90 justify-between flex">
              <span>Subtotaal</span>
              <span>{isTebexLoading ? "Laden..." : `€${basket?.total_price ?? 0.0},-`}</span>
            </div>

            <Button
              className="bg-blue-500 text-white hover:bg-blue-400 border border-blue-400 hover:text-white w-full mt-5"
              disabled={
                isTebexLoading || basket?.packages?.length === 0 || !serverId || !session?.user
              }
              onClick={() => {
                checkout()
              }}
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
