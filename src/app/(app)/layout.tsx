import "@/styles/globals.css"

import Providers from "@/components/providers"
import { GeistSans } from "geist/font/sans"
import Announcement from "@/components/home/announcement"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import { Toaster } from "@/components/ui/sonner"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weekly Roleplay",
  description: "Waar je elke dag een nieuw verhaal kan beleven.",
  keywords: [
    "FiveM",
    "Roleplay",
    "Dutch",
    "Nederlands",
    "Weekly",
    "Doneren",
    "Ideal",
    "Paypal",
    "Solliciteren",
    "Server",
    "Politie",
  ],
  authors: [
    {
      name: "Thoo",
      url: "https://vertexscripts.com",
    },
  ],
  alternates: {
    canonical: `https://www.weeklyroleplay.nl`,
  },
  creator: "Thoo",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.weeklyroleplay.nl",
    title: "Weekly Roleplay",
    description:
      "Op onze website kunt u de status zien en is het mogelijk om te doneren/solliciteren en om meer te weten te komen over ons! Ook kunt u via hier onze server regels bekijken!",
    siteName: "Weekly Roleplay",
    images: [`https://www.weeklyroleplay.nl/logo.png`],
  },
  twitter: {
    card: "summary",
    title: "Weekly Roleplay",
    description:
      "Op onze website kunt u de status zien en is het mogelijk om te doneren/solliciteren en om meer te weten te komen over ons! Ook kunt u via hier onze server regels bekijken!",
    images: [`https://www.weeklyroleplay.nl/logo.png`],
    creator: "@thoo",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`dark ${GeistSans.className}`}
      style={{
        colorScheme: "dark",
      }}
    >
      <body className="bg-neutral-100 dark:bg-neutral-900">
        <Providers>
          <main className="flex flex-col min-h-screen">
            <Announcement />
            <Header />

            <div className="h-full flex-1">{props.children}</div>

            <Footer />

            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  )
}
