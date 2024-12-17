"use client"

import Lottie from "lottie-react"
import Discord from "./animations/discord.json"
import Payment from "./animations/betaling.json"

export function DiscordAnim({ ...props }) {
  return <Lottie {...props} animationData={Discord}></Lottie>
}

export function PaymentAnim({ ...props }) {
  return <Lottie {...props} animationData={Payment}></Lottie>
}

export function ClientAnim({
  animationData,
  className,
}: {
  animationData: any
  className?: string
}) {
  return <Lottie className={className} animationData={animationData}></Lottie>
}
