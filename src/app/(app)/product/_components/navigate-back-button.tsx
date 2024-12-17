"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NavigateBackButton(props: { hide?: boolean; catergory?: string }) {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push(`/donate/${props.catergory}`)}
      className={`w-fit ${props.hide ? "-z-10 opacity-0" : ""}`}
      variant={"ghost"}
    >
      <ChevronLeft />
      Terug naar donaties
    </Button>
  )
}
