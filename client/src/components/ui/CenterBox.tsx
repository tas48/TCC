import { cn } from "@/lib/utils"
import * as React from "react"

interface CenterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CenterBox({ children, className, ...props }: CenterBoxProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-[var(--card)] border-border rounded-lg shadow-sm p-4"  ,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}