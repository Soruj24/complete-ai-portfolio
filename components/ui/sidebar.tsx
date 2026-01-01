"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

const useSidebar = () => React.useContext(SidebarContext)

const sidebarVariants = cva(
  "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 ease-in-out",
  {
    variants: {
      state: {
        open: "translate-x-0",
        closed: "-translate-x-full",
      },
    },
    defaultVariants: {
      state: "open",
    },
  }
)

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, defaultOpen = true, open: controlledOpen, onOpenChange, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen

    const setIsOpen = React.useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
      },
      [isControlled, onOpenChange]
    )

    const contextValue = React.useMemo(
      () => ({ isOpen: open, setIsOpen }),
      [open, setIsOpen]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(sidebarVariants({ state: open ? "open" : "closed" }), className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("absolute top-4 -right-12", className)}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
SidebarTitle.displayName = "SidebarTitle"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

export {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarTitle,
  SidebarContent,
  useSidebar,
}