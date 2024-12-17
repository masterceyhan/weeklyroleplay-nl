import { createContext, useContext, useEffect, useState } from "react"
import { Basket, Package } from "tebex_headless"
import { tebexHeadlessClient } from "@/lib/tebex"
import { usePathname } from "next/navigation"
import { env } from "@/env"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type BasketContext = {
  basket?: Basket
  isLoading: boolean
  isTebexLoading: boolean

  addPackage: (packageId: number) => void
  removePackage: (packageId: number) => void

  setBasket: (basket: Basket | undefined) => void
  authenticate: () => void
}

const Context = createContext<BasketContext | null>(null)

export function BasketProvider(props: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<Package[]>([])
  const [basket, setBasket] = useState<Basket>()
  const [isTebexLoading, setTebexLoading] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const { data: session } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    tebexHeadlessClient.getPackages().then(setPackages)
  }, [])

  function authenticate() {
    setLoading(true)
    const createBasket = async () => {
      const returnUrl = `${env.NEXT_PUBLIC_BASE_URL}${pathname}`
      const basket = await tebexHeadlessClient.createBasket(returnUrl, returnUrl)
      localStorage.setItem("basketIdent", basket.ident)

      const authUrls = await tebexHeadlessClient.getBasketAuthUrl(basket.ident, returnUrl)
      const url = authUrls.find((x) => x.name == "FiveM")
      if (!url) return

      window.location.href = url.url
      setLoading(false)
    }

    createBasket()
  }

  function addPackage(packageId: number) {
    if (!basket) return
    setTebexLoading(true)
    setLoading(true)

    const pkg = packages.find((pkg) => pkg.id === packageId)
    if (pkg) {
      setBasket((b) => {
        if (!b) return b
        return {
          ...b,
          packages: [
            ...b.packages,
            {
              id: pkg.id,
              name: pkg.name,
              description: pkg.description,
              image: pkg.image,
              in_basket: {
                price: pkg.total_price,
                quantity: 1,
                gift_username: null,
                gift_username_id: null,
              },
            },
          ],
        }
      })
    }

    setLoading(false)
    toast.success("Product toegevoegd aan winkelwagen!", {
      action: {
        label: "Bekijk Winkelwagen",
        onClick: () => {
          router.push("/donate/cart")
        },
      },
    })

    tebexHeadlessClient
      .addPackageToBasket(basket.ident, packageId, 1, "single", {
        discord: session?.user?.id,
        discordId: session?.user?.id,
        discord_id: session?.user?.id,
      })
      .then(setBasket)
      .finally(() => setTebexLoading(false))
  }

  function removePackage(packageId: number) {
    if (!basket) return
    setTebexLoading(true)
    setLoading(true)

    setBasket((prevBasket) => {
      if (!prevBasket) return prevBasket

      const packageIndex = prevBasket.packages.findIndex((pkg) => pkg.id === packageId)
      if (packageIndex === -1) return prevBasket

      const updatedPackages = [...prevBasket.packages]
      updatedPackages.splice(packageIndex, 1)

      return {
        ...prevBasket,
        packages: updatedPackages,
      }
    })

    setLoading(false)
    toast.success("Product verwijderd uit winkelwagen!")

    tebexHeadlessClient
      .removePackage(basket.ident, packageId)
      .then(setBasket)
      .finally(() => setTebexLoading(false))
  }

  useEffect(() => {
    const basketIdent = localStorage.getItem("basketIdent")
    if (!basketIdent) return

    tebexHeadlessClient.getBasket(basketIdent).then(setBasket)
  }, [])

  return (
    <Context.Provider
      value={{
        basket,
        isLoading,
        isTebexLoading,
        addPackage,
        removePackage,
        setBasket,
        authenticate,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export function useBasket() {
  const context = useContext(Context)
  if (!context) throw new Error("Basket context not found")

  return context
}
