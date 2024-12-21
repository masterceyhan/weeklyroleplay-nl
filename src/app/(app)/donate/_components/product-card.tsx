import { Package } from "tebex_headless"
import Link from "next/link"
import Image from "next/image"
import { Product } from "@/payload-types"

export default function ProductCard(props: {
  pkg: Package
  categorySlug: string
  product?: Product
}) {
  return (
    <Link
      href={`/product/${props.categorySlug}/${props.pkg.id}`}
      className="flex flex-col dark:bg-muted/10 p-4 rounded-lg border border-foreground/5 gap-2 group hover:bg-foreground/10 transition-colors bg-foreground/5"
    >
      <Image
        className="self-center group-hover:-translate-y-3 transition-transform"
        src={props.pkg.image ?? "/logo.png"}
        width={256}
        height={256}
        alt={props.pkg.name.replaceAll("_", "")}
      />

      <h2 className="text-lg font-semibold">{props.pkg.name.replaceAll("_", " ")}</h2>
      <div
        className="text-foreground/80 text-sm line-clamp-2"
        dangerouslySetInnerHTML={{ __html: props.pkg.description }}
      />

      <div className="space-x-2">
        {props.product && props.product.oldPrice !== props.pkg.total_price && (
          <span className="font-medium text-sm text-foreground/80 line-through">
            €{props.product.oldPrice}
          </span>
        )}

        <span className="font-medium text-sm">€{props.pkg.total_price}</span>
      </div>
    </Link>
  )
}
