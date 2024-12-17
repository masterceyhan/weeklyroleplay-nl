"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { createProfilePictureUrl, getCfxUser } from "@/lib/cfx"

import { Skeleton } from "./ui/skeleton"

export default function CfxProfilePicture(props: { username: string; className?: string }) {
  const [profilePicture, setProfilePicture] = useState<string>(
    localStorage.getItem(`cfx-avatar-${props.username}`) ?? "",
  )

  useEffect(() => {
    if (profilePicture) return

    getCfxUser(props.username).then((user) => {
      if (!user) return

      const profilePicture = createProfilePictureUrl(user)
      if (profilePicture) {
        setProfilePicture(profilePicture)
        localStorage.setItem(`cfx-avatar-${props.username}`, profilePicture)
      }
    })
  }, [props.username, profilePicture])

  return (
    <>
      {profilePicture ? (
        <Image
          alt={props.username}
          className={props.className}
          src={profilePicture}
          width={64}
          height={64}
        />
      ) : (
        <Skeleton className={props.className} />
      )}
    </>
  )
}
