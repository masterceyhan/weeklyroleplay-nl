import payloadConfig from "@/payload.config"
import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

async function getSettings() {
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({
    slug: "settings",
  })

  return settings
}

export const getSettingsCached = unstable_cache(getSettings, ["settings"], {
  tags: ["settings"],
  revalidate: 300,
})
