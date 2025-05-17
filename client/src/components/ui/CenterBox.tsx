import { cn } from "@/lib/utils"
import * as React from "react"

interface CenterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CenterBox({ children, className, ...props }: CenterBoxProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-chart-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}