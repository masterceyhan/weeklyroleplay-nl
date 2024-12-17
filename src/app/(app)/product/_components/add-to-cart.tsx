"use client"

import { Button } from "@/components/ui/button"
import { useBasket } from "@/hooks/useBasket"
import { useSession, signIn } from "next-auth/react"
import { useState } from "react"

export default function AddToCart(props: { packageId: number }) {
  const { basket, isLoading, addPackage, authenticate } = useBasket()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  function login() {
    authenticate()
  }

  function addToCart() {
    console.log("aaa")
    addPackage(props.packageId)
  }

  return (
    <>
      {session ? (
        <Button
          className="bg-blue-500 text-white hover:bg-blue-400 border border-blue-400 hover:text-white w-full"
          size="lg"
          onClick={basket ? addToCart : login}
          disabled={isLoading}
        >
          {isLoading ? "Laden..." : basket ? "Toevoegen aan Winkelmand" : "Inloggen met FiveM"}
        </Button>
      ) : (
        <Button
          className="bg-blue-500 text-white hover:bg-blue-400 border border-blue-400 hover:text-white w-full"
          size="lg"
          onClick={() => {
            setLoading(true)
            signIn("discord")
          }}
          disabled={loading}
        >
          Login met Discord
        </Button>
      )}
    </>
  )
}
