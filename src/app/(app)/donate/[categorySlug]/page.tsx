import { getTebexCategoryBySlug } from "@/lib/tebex"
import { getPayloadProductsCached } from "@/server/products"
import Image from "next/image"
import Link from "next/link"

export default async function Page(props: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await props.params

  const getCategory = await getTebexCategoryBySlug(categorySlug)
  const getProducts = getPayloadProductsCached()
  const [category, products] = await Promise.all([getCategory, getProducts])
  if (!category) return <div>Category not found</div>

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <div
        className="text-foreground/80"
        dangerouslySetInnerHTML={{ __html: category.description }}
      />

      <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        {category.packages
          .sort((a, b) => b.total_price - a.total_price)
          .map((pkg) => {
            const product = products.find((p) => p.id == pkg.id)

            return (
              <Link
                href={`/product/${categorySlug}/${pkg.id}`}
                key={pkg.id}
                className="flex flex-col dark:bg-muted/10 p-4 rounded-lg border border-foreground/5 gap-2 group hover:bg-foreground/10 transition-colors bg-foreground/5"
              >
                <Image
                  className="self-center group-hover:-translate-y-3 transition-transform"
                  src={pkg.image ?? "/logo.png"}
                  width={256}
                  height={256}
                  alt={pkg.name.replaceAll("_", "")}
                />

                <h2 className="text-lg font-semibold">{pkg.name.replaceAll("_", " ")}</h2>
                <div
                  className="text-foreground/80 text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: pkg.description }}
                />

                <div className="space-x-2">
                  {product && product.oldPrice !== pkg.total_price && (
                    <span className="font-medium text-sm text-foreground/80 line-through">
                      €{product.oldPrice}
                    </span>
                  )}

                  <span className="font-medium text-sm">€{pkg.total_price}</span>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
