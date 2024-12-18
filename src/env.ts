import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URI: z.string().url(),
    PAYLOAD_SECRET: z.string(),

    TEBEX_SECRET: z.string(),

    DISCORD_CLIENT: z.string(),
    DISCORD_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_TEBEX_TOKEN: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string(),
  },
  runtimeEnv: {
    DATABASE_URI: process.env.DATABASE_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    TEBEX_SECRET: process.env.TEBEX_SECRET,

    NEXT_PUBLIC_TEBEX_TOKEN: process.env.NEXT_PUBLIC_TEBEX_TOKEN,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,

    DISCORD_CLIENT: process.env.DISCORD_CLIENT,
    DISCORD_SECRET: process.env.DISCORD_SECRET,
  },
  skipValidation: !!process.env.SKIP_CI,
})
