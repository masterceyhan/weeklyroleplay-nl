"use client"

import { Package } from "tebex_headless"
import NextImage from "next/image"

import NavigateBackButton from "./navigate-back-button"
import { Media, Product } from "@/payload-types"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ProductImages(props: {
  pkg: Package
  images: Product["images"]
  categorySlug: string
}) {
  const [selectedImage, setSelectedImage] = useState(props.pkg.image)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    props.images?.forEach((x) => {
      const img = new Image()
      img.src = (x.image as Media).url ?? "/logo.png"
    })
  }, [props.images])

  return (
    <div className="space-y-4 w-full flex flex-col lg:col-span-3">
      <NavigateBackButton catergory={props.categorySlug} />
      <div className="flex flex-col bg-muted/10 p-4 rounded-lg border border-foreground/5 gap-2 group w-full items-center">
        <NextImage
          src={selectedImage ?? "/logo.png"}
          width={350}
          height={350}
          alt={props.pkg.name.replaceAll("_", " ")}
        />
      </div>

      <div className="pt-2 flex flex-wrap gap-2">
        {props.images
          ?.map((x) => x.image as Media)
          .map((image, i) => (
            <div
              key={i}
              className={cn(
                "bg-muted/10 rounded-lg cursor-pointer transition-colors",
                selectedIndex == i && "outline outline-1 outline-blue-500/50",
              )}
              onClick={() => {
                setSelectedImage(image.url ?? "/logo.png")
                setSelectedIndex(i)
              }}
            >
              <NextImage
                src={image.url ?? "/logo.png"}
                width={128}
                height={128}
                alt={props.pkg.name.replaceAll("_", " ")}
                className="max-h-32 object-contain"
              />
            </div>
          ))}
      </div>
    </div>
  )
}
