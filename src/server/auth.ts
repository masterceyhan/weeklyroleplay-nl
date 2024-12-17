import NextAuth from "next-auth"
import DiscordAuthProvider from "next-auth/providers/discord"
import { JWT } from "@auth/core/jwt"
import { Session } from "@auth/core"

import { env } from "@/env"
import { AdapterUser } from "@auth/core/adapters"

declare module "@auth/core/jwt" {
  interface JWT {
    id: string
  }
}

declare module "@auth/core" {
  interface Session extends AdapterUser {
    user: {
      discordId: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    DiscordAuthProvider({
      clientId: env.DISCORD_CLIENT,
      clientSecret: env.DISCORD_SECRET,
    }),
  ],
  callbacks: {
    session: ({ token, session }) => {
      const regex = /\/avatars\/(\d+)\//
      const match = session.user.image?.match(regex)
      if (match) {
        session.user.id = match[1]
      }

      return session
    },
  },
})
