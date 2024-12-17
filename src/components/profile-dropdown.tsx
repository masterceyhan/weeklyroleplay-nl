"use client"

import { useBasket } from "@/hooks/useBasket"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import CfxProfilePicture from "./cfx-profile-picture"

export default function ProfileDropdown() {
  const { basket, setBasket } = useBasket()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {basket?.username && (
          <CfxProfilePicture username={basket.username} className="w-10 h-10 rounded-full" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{basket?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setBasket(undefined)}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
