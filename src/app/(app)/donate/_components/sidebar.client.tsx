"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { JSX } from "react"
import {
  FaBox,
  FaCar,
  FaEuroSign,
  FaHammer,
  FaInfoCircle,
  FaShieldAlt,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa"
import { Category } from "tebex_headless"
// import { Category } from "tebex_headless"

// const mockedCategories = [
//   {
//     slug: "information",
//     title: "Informatie",
//     icon: <FaInfoCircle size={15} />,
//   },
//   {
//     slug: "staff-ranks",
//     title: "Staff Rank",
//     icon: <FaShieldAlt size={15} />,
//   },
//   {
//     slug: "limited-edition",
//     title: "Limited Edition",
//     icon: <FaStar size={15} />,
//   },
//   {
//     slug: "complete-pakketten",
//     title: "Complete Pakketten",
//     icon: <FaBox size={15} />,
//   },
//   {
//     slug: "voertuigen",
//     title: "Voertuigen",
//     icon: <FaCar size={15} />,
//   },
//   {
//     slug: "wapens",
//     title: "Wapens",
//     icon: <FaHammer size={15} />,
//   },
//   {
//     slug: "geld",
//     title: "Geld",
//     icon: <FaEuroSign size={15} />,
//   },
//   {
//     slug: "unban",
//     title: "Unbans",
//     icon: <FaExclamationCircle size={15} />,
//   },
// ]

const categoryIcons: { [key: string]: JSX.Element } = {
  ["unbans"]: <FaInfoCircle size={15} />,
  ["information"]: <FaInfoCircle size={15} />,
  ["staff-ranks"]: <FaShieldAlt size={15} />,
  ["limited-edition"]: <FaStar size={15} />,
  ["complete-pakketten"]: <FaBox size={15} />,
  ["voertuigen"]: <FaCar size={15} />,
  ["wapens"]: <FaHammer size={15} />,
  ["geld"]: <FaEuroSign size={15} />,
  ["cart"]: <FaShoppingCart size={15} />,
}

export default function SidebarClient(props: {
  categories: { slug: string | null; name: string }[]
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-1 place-items-start max-w-3xl">
      {[
        "information",
        "staff-ranks",
        "limited-edition",
        "complete-pakketten",
        "voertuigen",
        "wapens",
        "geld",
        "unbans",
      ].map((slug) => {
        const category = props.categories.find((cat) => cat.slug === slug)
        if (slug !== "information" && !category) return null

        return (
          <CategoryButton
            key={slug}
            slug={slug == "information" ? "/" : slug}
            icon={category?.slug ?? "information"}
            name={category?.name ?? "Informatie"}
            pathname={pathname}
          />
        )
      })}

      <CategoryButton
        icon="cart"
        name="Winkel Wagen"
        pathname={pathname}
        slug="cart"
        className="pt-10"
      />
    </div>
  )
}

function CategoryButton(props: {
  name: string
  slug: string
  icon: string
  pathname: string
  className?: string
}) {
  const icon = categoryIcons[props.icon ?? "information"]
  let isSelected = props.pathname == `/donate/${props.slug}`

  if (props.pathname == "/donate" && props.slug == "/") {
    isSelected = true
  }

  return (
    <Link
      key={props.name}
      href={`/donate/${props.slug}`}
      className={cn(props.className, "w-full text-left")}
    >
      <Button
        variant={isSelected ? "default" : props.slug == "cart" ? "outline" : "ghost"}
        size="lg"
        className={cn(
          "w-full justify-start",
          isSelected
            ? "bg-blue-500 border hover:bg-blue-400 border-blue-400 text-white"
            : "text-foreground/80",
        )}
      >
        {icon} {props.name}
      </Button>
    </Link>
  )
}
