"use client"

import React from "react"
import { ThemeProvider } from "./theme-provider"
import { BasketProvider } from "@/hooks/useBasket"
import { SessionProvider } from "next-auth/react"

export default function Providers(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>
        <BasketProvider>{props.children}</BasketProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
