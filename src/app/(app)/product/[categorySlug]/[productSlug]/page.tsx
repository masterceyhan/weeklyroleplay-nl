import { getTebexCategoryBySlug } from "@/lib/tebex"
import { CheckCheckIcon } from "lucide-react"
import Image from "next/image"
import NavigateBackButton from "../../_components/navigate-back-button"
import AddToCart from "../../_components/add-to-cart"
import { getPayloadProductCached } from "@/server/products"
import { Media } from "@/payload-types"
import { ProductImages } from "../../_components/product-images"

export default async function Page(props: {
  params: Promise<{ categorySlug: string; productSlug: string }>
}) {
  const { categorySlug, productSlug } = await props.params

  const getCategegory = getTebexCategoryBySlug(categorySlug)
  const getProduct = getPayloadProductCached(Number(productSlug))

  const [category, product] = await Promise.all([getCategegory, getProduct])
  if (!category) return <div>Category not found</div>

  const pkg = category.packages.find((pkg) => pkg.id === Number(productSlug))
  if (!pkg) return <div className="container">Product not found: {productSlug}</div>

  return (
    <div className="container py-20 flex flex-col gap-2">
      <div className="justify-center grid grid-cols-1 lg:grid-cols-5 xl:w-[80%] mx-auto gap-10">
        <ProductImages categorySlug={categorySlug} images={product?.images ?? []} pkg={pkg} />

        <div className="flex flex-col gap-3 lg:col-span-2">
          <NavigateBackButton hide />
          <h1 className="text-2xl font-bold">{pkg.name.replaceAll("_", " ")}</h1>
          <span className="text-lg text-foreground/90 font-medium">€{pkg.base_price}</span>
          <div
            className="text-foreground/80"
            dangerouslySetInnerHTML={{ __html: pkg.description }}
          />

          <div className="py-3 px-4 bg-muted/10 rounded-xl border border-foreground/5">
            <h2 className="font-semibold text-lg">Voorwaarden</h2>
            <ul className="pt-1">
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> U kunt zonder{" "}
                <span className="font-bold">refund</span> worden ontslagen bij inactief gedrag!
              </li>
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> U kunt zonder{" "}
                <span className="font-bold">refund</span> worden ontslagen bij kinderachtig gedrag!
              </li>
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> U kunt bij het overtreden van onze regels worden
                verbannen/verwijderd uit uw functie
              </li>
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> U bent verplicht respectvol te communiceren met
                collegas en spelers.
              </li>
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> Het delen van vertrouwelijke bedrijfsinformatie is
                ten strengste verboden.
              </li>
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> U dient regelmatig deel te nemen aan staffmeetingen
                om uw vaardigheden/kennis bij te werken.
              </li>
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> Het gebruik van bedrijfsmiddelen voor persoonlijke
                doeleinden is niet toegestaan.
              </li>
              <li className="text-sm opacity-75 flex gap-2">
                <CheckCheckIcon color="green" /> In geval van ziekte of afwezigheid, dient u tijdig
                het management team op de hoogte te stellen.
              </li>
            </ul>
          </div>

          <div className="py-5 px-4 bg-muted/10 rounded-xl border border-foreground/5 flex flex-col gap-4 justify-center items-center">
            <span className="font-semibold">
              U ontvangt uw <span className="text-blue-500">producten</span> direct ingame!
            </span>
            <Image src="/tebex.svg" width={100} height={100} alt="logo" />
            <AddToCart packageId={pkg.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
