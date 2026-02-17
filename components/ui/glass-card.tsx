"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowEffect?: boolean
  children: React.ReactNode
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glowEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative group", className)}
        {...props}
      >
        {glowEffect && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        <div
          className={cn(
            "relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20",
            "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
            "before:absolute before:inset-0 before:rounded-2xl",
            "before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
          )}
        >
          {children}
        </div>
      </div>
    )
  },
)
GlassCard.displayName = "GlassCard"

const GlassCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
GlassCardHeader.displayName = "GlassCardHeader"

const GlassCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight text-white", className)}
    {...props}
  />
))
GlassCardTitle.displayName = "GlassCardTitle"

const GlassCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/60", className)}
    {...props}
  />
))
GlassCardDescription.displayName = "GlassCardDescription"

const GlassCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
GlassCardContent.displayName = "GlassCardContent"

const GlassCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
GlassCardFooter.displayName = "GlassCardFooter"

export { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter }
