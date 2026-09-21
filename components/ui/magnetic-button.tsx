'use client'

import { useRef, useState, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react'

interface MagneticButtonProps<T extends ElementType> {
  as?: T
  children: ReactNode
  className?: string
}

export function MagneticButton<T extends ElementType = 'button'>({
  as,
  children,
  className,
  ...props
}: MagneticButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>) {
  const Component = (as || 'button') as ElementType
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setOffset({ x: x * 0.3, y: y * 0.3 })
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <Component
      ref={ref as React.Ref<never>}
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.25s cubic-bezier(0.33,1,0.68,1)',
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
