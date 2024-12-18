import { env } from "@/env"
import { Product } from "@/payload-types"
import { revalidatePath, revalidateTag } from "next/cache"
import { CollectionConfig } from "payload"

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: () => false,
  },
  admin: {
    listSearchableFields: ["name"],
  },
  fields: [
    {
      name: "id",
      label: "ID",
      type: "number",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "oldPrice",
      type: "number",
      required: true,
    },
    {
      name: "specifications",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
        },
      ],
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag("products")
      },
      async ({ doc }) => {
        const product: Product = doc
        await fetch(`https://plugin.tebex.io/package/${product.id}`, {
          method: "PUT",
          headers: {
            "X-Tebex-Secret": env.TEBEX_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: product.price,
          }),
        })

        revalidateTag("products")
        revalidateTag("categories")
      },
    ],
  },
}
