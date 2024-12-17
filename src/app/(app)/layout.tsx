import "@/styles/globals.css"

import Providers from "@/components/providers"
import { GeistSans } from "geist/font/sans"
import Announcement from "@/components/home/announcement"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import { Toaster } from "@/components/ui/sonner"

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
