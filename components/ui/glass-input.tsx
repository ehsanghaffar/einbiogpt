"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  glowOnFocus?: boolean
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, type, glowOnFocus = true, ...props }, ref) => {
    return (
      <div className="relative group">
        {glowOnFocus && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        )}
        <input
          type={type}
          className={cn(
            "relative flex h-10 w-full rounded-xl px-3 py-2 text-sm",
            "bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/40",
            "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40",
            "transition-all duration-300",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
GlassInput.displayName = "GlassInput"

export { GlassInput }
