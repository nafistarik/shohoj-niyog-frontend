"use client"

import React from "react"
import { Button } from "@/components/ui/button"

const buttonVariantsList = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const

const buttonSizes = ["default", "sm", "lg", "icon"] as const

export default function ButtonShowcase() {
  return (
    <div className="p-6 space-y-8">
      {buttonVariantsList.map((variant) => (
        <div key={variant} className="space-y-4">
          <h2 className="text-lg font-semibold capitalize">{variant}</h2>
          <div className="flex flex-wrap gap-4">
            {buttonSizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size === "icon" ? "🔔" : `${variant} - ${size}`}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
