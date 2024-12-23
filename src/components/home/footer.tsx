import Link from "next/link"

const navigationItems = [
  {
    title: "Algemeen",
    items: [
      {
        name: "Regels",
        href: "/regels",
      },
      {
        name: "Doneren",
        href: "/doneren",
      },
    ],
  },
  {
    title: "Discord",
    items: [
      {
        name: "Discord",
        href: "https://discord.gg/weeklyroleplay",
      },
      {
        name: "Overheid",
        href: "https://discord.gg/9ZyeX4BAAh",
      },
      {
        name: "Onderwereld",
        href: "https://discord.gg/weeklyonderwereld",
      },
      {
        name: "Support",
        href: "https://discord.gg/8BGwrMEUGp",
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-foreground/5 w-full py-10">
      <div className="container mx-auto md:flex justify-between">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-xl font-bold">Contact Gegevens</h1>
          <p className="opacity-50 mt-3">Weekly Roleplay</p>
          <p className="opacity-50">weeklyroleplay.info@gmail.com</p>
        </div>
        <div className="md:flex hidden flex-col items-center md:items-start md:flex-row gap-10">
          {navigationItems.map(({ title, items }, key) => (
            <div key={key} className="space-y-3 text-center md:text-left">
              <h3 className="font-semibold text-xl">{title}</h3>
              <ul>
                {items.map((item, index) => (
                  <li key={index} className="hover:text-blue-500 duration-300 text-base">
                    <Link className="text-foreground/80" href={item?.href}>
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* <DiscordAnim className="lg:block hidden" /> */}
      </div>

      <p className="text-center mt-5 text-foreground/20">All rights reserved ©2024 Weekly.</p>
    </footer>
  )
}
