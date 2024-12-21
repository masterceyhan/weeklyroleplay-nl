import { getTebexCategoryBySlug } from "@/lib/tebex"
import { getPayloadProductsCached } from "@/server/products"
import ProductCard from "../_components/product-card"

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
              <ProductCard categorySlug={categorySlug} pkg={pkg} product={product} key={pkg.id} />
            )
          })}
      </div>
    </div>
  )
}
