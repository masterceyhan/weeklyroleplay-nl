"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { FaMoon, FaSun } from "react-icons/fa"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  function switchTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button className="" size="icon" variant="outline" onClick={switchTheme}>
      {theme === "dark" ? <FaSun size={15} /> : <FaMoon size={15} />}
    </Button>
  )
}
