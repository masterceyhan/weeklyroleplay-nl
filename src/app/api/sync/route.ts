import { tebexHeadlessClient } from "@/lib/tebex"
import { NextResponse } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"

export const maxDuration = 20

export async function GET() {
  const packages = await tebexHeadlessClient.getPackages()
  const payload = await getPayload({ config: configPromise })
  const existingProducts = (await payload.find({ collection: "products", pagination: false })).docs

  for (const pkg of packages) {
    if (existingProducts.some((product) => product.id === pkg.id)) {
      continue
    }

    console.log("Adding product", pkg.id)
    await payload.create({
      collection: "products",
      data: {
        id: pkg.id,
        name: pkg.name,
        price: pkg.total_price,
        oldPrice: pkg.total_price,
      },
    })

    console.log("Created package ", pkg.name, pkg.id)
  }

  return NextResponse.json({})
}
