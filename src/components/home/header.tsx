import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import ProfileDropdown from "../profile-dropdown"
import ThemeSwitcher from "../theme-switcher"

export default function Header() {
  return (
    <div className="border border-b">
      <header className="py-3 flex gap-5 items-center container justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              width={128}
              height={128}
              alt="Weekly Roleplay"
              className="w-14 h-14"
            />
          </Link>

          <Link href="/donate">
            <Button variant="ghost" size="lg" className="font-semibold text-base uppercase h-10">
              Doneren
            </Button>
          </Link>
        </div>

        <div className="flex gap-2">
          <ProfileDropdown />
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  )
}
