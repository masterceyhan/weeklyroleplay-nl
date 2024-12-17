import React, { Suspense } from "react"
import Sidebar from "./_components/sidebar"
import SidebarClient from "./_components/sidebar.client"

/*  ["unbans"]: <FaInfoCircle size={15} />,
  ["information"]: <FaInfoCircle size={15} />,
  ["staff-ranks"]: <FaShieldAlt size={15} />,
  ["limited-edition"]: <FaStar size={15} />,
  ["complete-pakketten"]: <FaBox size={15} />,
  ["voertuigen"]: <FaCar size={15} />,
  ["wapens"]: <FaHammer size={15} />,
  ["geld"]: <FaEuroSign size={15} />,
*/

const defaultCategories = [
  {
    name: "Unbans",
    slug: "unbans",
  },
  {
    name: "Informatie",
    slug: "information",
  },
  {
    name: "Staff Ranks",
    slug: "staff-ranks",
  },
  {
    name: "Limited Edition",
    slug: "limited-edition",
  },
  {
    name: "Complete Pakketten",
    slug: "complete-pakketten",
  },
  {
    name: "Voeruigen",
    slug: "voertuigen",
  },
  {
    name: "Wapens",
    slug: "wapens",
  },
  {
    name: "Geld",
    slug: "geld",
  },
]

export default function DonationLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row py-20 container gap-20">
      <Suspense fallback={<SidebarClient categories={defaultCategories} />}>
        <Sidebar />
      </Suspense>
      <main className="w-full">{props.children}</main>
    </div>
  )
}
