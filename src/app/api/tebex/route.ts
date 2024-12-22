import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { WebhookPaymentCompleted } from "@/types/tebex"
import { getPayload } from "payload"
import payloadConfig from "@payload-config"

const WEBHOOK_SECRET = "dcabd60fe0d0f9eb194c5b05c4c0d43a"

type WebhookBody = {
  id: string
  type: string
}

type DeliveryBody = {
  serverId: number
  items: Array<{ name: string; count: number }>
  vehicles: Array<{ name: string; count: number }>
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const bodyHash = crypto.createHash("sha256").update(rawBody, "utf8").digest("hex")

    const computedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(bodyHash)
      .digest("hex")

    const incomingSignature = request.headers.get("X-Signature")
    if (!incomingSignature || incomingSignature !== computedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
    }

    const body = JSON.parse(rawBody) as WebhookPaymentCompleted
    const serverId = body.subject.products[0].variables.find(
      (x) => x.identifier == "serverId",
    )?.option
    if (!serverId) return NextResponse.json({ error: "No serverId provided!" }, { status: 500 })

    const productIds = body.subject.products.map((product) => product.id)
    const payload = await getPayload({ config: payloadConfig })
    const { docs: payloadProducts } = await payload.find({
      collection: "products",
      pagination: false,
    })

    const items = []
    const vehicles = []

    for (const productId of productIds) {
      const product = payloadProducts.find((x) => x.id == productId)
      if (!product) continue

      if (product.vehicles) vehicles.push(...product.vehicles)
      if (product.items) items.push(...product.items)
    }

    const response = await fetch("http://185.195.237.17:8080/vx_tebexcommands", {
      method: "POST",
      body: JSON.stringify({
        serverId: Number(serverId),
        items: items,
        vehicles: vehicles,
      }),
    })

    return NextResponse.json({
      id: body.id,
    })
  } catch (error) {
    console.error("Error handling Tebex webhook:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
