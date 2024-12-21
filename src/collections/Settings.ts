import { GlobalConfig } from "payload"

export const Settings: GlobalConfig = {
  slug: "settings",
  fields: [
    {
      name: "featuredProducts",
      label: "Geliefde Pakketten",
      type: "array",
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          label: "Product",
          required: true,
          admin: {
            description: "Selecteer een product",
          },
        },
      ],
    },
  ],
}
