'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

export type World = 'sakura' | 'kuro'

interface ThemeContextValue {
  world: World
  isTransitioning: boolean
  toggleWorld: () => void
  setWorld: (world: World) => void
  flashWorld: (world: World, duration?: number) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [world, setWorldState] = useState<World>('sakura')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousWorld = useRef<World>('sakura')

  useEffect(() => {
    const stored = window.localStorage.getItem('kurohana-world')
    if (stored === 'sakura' || stored === 'kuro') {
      setWorldState(stored)
      previousWorld.current = stored
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.world = world
    document.documentElement.classList.toggle('dark', world === 'kuro')
    window.localStorage.setItem('kurohana-world', world)
  }, [world])

  const setWorld = useCallback((next: World) => {
    setWorldState((current) => {
      if (current === next) return current
      setIsTransitioning(true)
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current)
      transitionTimeout.current = setTimeout(() => setIsTransitioning(false), 1600)
      return next
    })
  }, [])

  const toggleWorld = useCallback(() => {
    setWorld(world === 'sakura' ? 'kuro' : 'sakura')
  }, [world, setWorld])

  const flashWorld = useCallback((next: World, duration = 1200) => {
    previousWorld.current = world
    setWorldState(next)
    if (flashTimeout.current) clearTimeout(flashTimeout.current)
    flashTimeout.current = setTimeout(() => {
      setWorldState(previousWorld.current)
    }, duration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeContext.Provider value={{ world, isTransitioning, toggleWorld, setWorld, flashWorld }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useWorld() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useWorld must be used within ThemeProvider')
  return ctx
}
