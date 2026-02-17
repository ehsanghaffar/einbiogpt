"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  glowOnFocus?: boolean
  label?: string
  error?: string
}

const GlassTextarea = React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ className, glowOnFocus = true, label, error, id, ...props }, ref) => {
    const textareaId = id || "glass-textarea-id"
    const errorId = `${textareaId}-error`

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <div className="relative group">
          {glowOnFocus && (
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          )}
          <textarea
            id={textareaId}
            className={cn(
              "relative flex min-h-[80px] w-full rounded-xl px-4 py-3 text-sm",
              "bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/40",
              "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40",
              "transition-all duration-300 resize-none",
              error && "border-red-400/50 focus:ring-red-400/30",
              className,
            )}
            ref={ref}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    )
  },
)
GlassTextarea.displayName = "GlassTextarea"

export { GlassTextarea }
