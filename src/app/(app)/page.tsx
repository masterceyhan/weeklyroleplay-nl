import UserCount from "@/components/home/user-count"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <main className="flex flex-col">
      <section className="relative w-full h-[700px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover hidden sm:block dark:opacity-50"
          src="/background.mp4"
          autoPlay
          loop
          muted
        />

        <div className="relative z-20 flex flex-col justify-center h-[100%] gap-6 container items-center xl:items-start">
          <h1 className="font-extrabold text-4xl xl:text-5xl text-center xl:text-left max-w-3xl text-white">
            FiveM Server met volwassen community en <span className="text-blue-500">Hoge </span>{" "}
            Roleplay!
          </h1>

          <h2 className="text-white/80">Waar je elke dag een nieuw verhaald kan beleven.</h2>

          <UserCount />

          <div className="flex gap-2 xl:self-start self-center">
            <Link href="https://cfx.re/join/meojrd" target="blank">
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400 border border-blue-400 hover:text-white"
                size="lg"
              >
                Meespelen
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" size="lg" className="bg-background/80">
                Doneren
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container sm:py-40">
        <h1 className="text-3xl font-bold">Geliefde Pakketten</h1>
      </section>
    </main>
  )
}
