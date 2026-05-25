"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
}

export function Avatar({ src, alt, fallback, className, ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || ""}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#222] text-[#8c8c8c] text-sm font-medium">
          {fallback || "U"}
        </div>
      )}
    </div>
  )
}