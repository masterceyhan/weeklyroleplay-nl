import { getPayload } from "payload"
import configPromise from "@payload-config"
import { unstable_cache } from "next/cache"

async function getPayloadProducts() {
  const payload = await getPayload({
    config: configPromise,
  })

  const products = await payload.find({
    collection: "products",
    pagination: false,
  })

  return products.docs
}

export const getPayloadProductsCached = unstable_cache(getPayloadProducts, ["products"], {
  tags: ["products"],
  revalidate: 60 * 60,
})

export async function getPayloadProductCached(id: number) {
  const products = await getPayloadProductsCached()
  return products.find((product) => product.id === id)
}
