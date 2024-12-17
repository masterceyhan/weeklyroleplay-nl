import SidebarClient from "./sidebar.client"
import { getCachedTebexCategories } from "@/lib/tebex"

export default async function Sidebar() {
  const categories = await getCachedTebexCategories()
  return <SidebarClient categories={categories} />
}
