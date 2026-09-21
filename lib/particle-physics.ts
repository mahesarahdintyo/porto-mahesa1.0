export interface PointerState {
  x: number
  y: number
  active: boolean
}

export class Petal {
  x: number
  y: number
  size: number
  baseVx: number
  baseVy: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  swayOffset: number
  swaySpeed: number
  flip: number
  flipSpeed: number
  depth: number
  wilted: boolean

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    // Distribute across entire screen height initially so petals are visible immediately
    this.y = Math.random() * height
    this.depth = 0.5 + Math.random() * 0.5
    this.size = (8 + Math.random() * 10) * this.depth
    this.baseVx = 0.15 + (Math.random() - 0.5) * 0.4
    this.baseVy = (0.6 + Math.random() * 0.8) * this.depth
    this.vx = this.baseVx
    this.vy = this.baseVy
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.02
    this.swayOffset = Math.random() * Math.PI * 2
    this.swaySpeed = 0.4 + Math.random() * 0.6
    this.flip = Math.random() * Math.PI * 2
    this.flipSpeed = 0.015 + Math.random() * 0.03
    this.wilted = Math.random() < 0.25
  }

  update(
    width: number,
    height: number,
    time: number,
    pointer: PointerState,
    speedMultiplier: number,
    dt: number = 1,
  ) {
    const sway = Math.sin(time * 0.001 * this.swaySpeed + this.swayOffset) * 0.4
    let targetVx = this.baseVx + sway
    let targetVy = this.baseVy

    if (pointer.active) {
      const dx = this.x - pointer.x
      const dy = this.y - pointer.y
      const distSq = dx * dx + dy * dy
      const radius = 140
      if (distSq < radius * radius && distSq > 0.01) {
        const dist = Math.sqrt(distSq)
        const force = (1 - dist / radius) * 2.8
        const nx = dx / dist
        const ny = dy / dist
        targetVx += nx * force + -ny * 0.9
        targetVy += ny * force + nx * 0.9
        this.rotationSpeed = (Math.random() - 0.5) * 0.15
      }
    }

    const ease = Math.min(1, 0.08 * dt)
    this.vx += (targetVx - this.vx) * ease
    this.vy += (targetVy - this.vy) * ease
    this.rotationSpeed *= Math.pow(0.98, dt)

    this.x += this.vx * speedMultiplier * dt
    this.y += this.vy * speedMultiplier * dt
    this.rotation += this.rotationSpeed * dt
    this.flip += this.flipSpeed * speedMultiplier * dt

    // Reset when exiting viewport
    if (this.y > height + 25) {
      this.y = -25
      this.x = Math.random() * width
    }
    if (this.x < -30) this.x = width + 30
    if (this.x > width + 30) this.x = -30
  }

  draw(ctx: CanvasRenderingContext2D, colorAccent: string, colorSoft: string, opacity: number) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)

    // Realistic 3D leaf/petal tumbling flutter
    const flipScale = Math.cos(this.flip)
    ctx.scale(1, flipScale)

    ctx.globalAlpha = opacity * (this.wilted ? 0.6 : 0.88) * (0.55 + 0.45 * Math.abs(flipScale))
    const w = this.size
    const h = this.size * 0.8

    ctx.beginPath()
    ctx.moveTo(0, -h)
    // Delicate sakura petal profile with curved edges
    ctx.bezierCurveTo(w * 1.15, -h * 0.7, w * 0.9, h * 0.5, 0, h)
    ctx.bezierCurveTo(-w * 0.9, h * 0.5, -w * 1.15, -h * 0.7, 0, -h)
    ctx.fillStyle = this.wilted ? colorSoft : colorAccent
    ctx.fill()
    ctx.restore()
  }
}

export class AshParticle {
  x: number
  y: number
  size: number
  vx: number
  vy: number
  depth: number
  opacityJitter: number
  isEmber: boolean

  constructor(width: number, height: number, isEmber: boolean) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.depth = 0.3 + Math.random() * 0.7
    this.size = isEmber ? 1.5 + Math.random() * 2 : (1 + Math.random() * 3) * this.depth
    this.vx = (Math.random() - 0.5) * 0.15
    this.vy = -(0.05 + Math.random() * 0.15) * this.depth
    this.opacityJitter = Math.random() * Math.PI * 2
    this.isEmber = isEmber
  }

  update(width: number, height: number, time: number, dt: number = 1) {
    this.x += (this.vx + Math.sin(time * 0.0006 + this.opacityJitter) * 0.1) * dt
    this.y += this.vy * dt

    if (this.y < -20) {
      this.y = height + 20
      this.x = Math.random() * width
    }
    if (this.x < -20) this.x = width + 20
    if (this.x > width + 20) this.x = -20
  }

  draw(ctx: CanvasRenderingContext2D, time: number, opacity: number) {
    const flicker = this.isEmber ? 0.5 + Math.sin(time * 0.003 + this.opacityJitter) * 0.5 : 1
    ctx.save()
    ctx.globalAlpha = opacity * (this.isEmber ? 0.6 * flicker : 0.35 * this.depth)
    ctx.fillStyle = this.isEmber ? '#b51e39' : '#a09a95'
    if (this.isEmber) {
      ctx.shadowColor = '#b51e39'
      ctx.shadowBlur = 6
    }
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
