import { env } from "@/env"
import { unstable_cache } from "next/cache"
import { TebexHeadless } from "tebex_headless"

export const tebexHeadlessClient = new TebexHeadless(env.NEXT_PUBLIC_TEBEX_TOKEN)

async function getTebexCategories() {
  const categories = await tebexHeadlessClient.getCategories(true)
  return categories
}

export async function getTebexCategoryBySlug(slug: string) {
  const categories = await getCachedTebexCategories()
  return categories.find((category) => category.slug === slug)
}

export const getCachedTebexCategories = unstable_cache(getTebexCategories, ["categories"], {
  revalidate: 300,
  tags: ["categories"],
})
