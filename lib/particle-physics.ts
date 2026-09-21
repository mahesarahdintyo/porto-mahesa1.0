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
  depth: number
  wilted: boolean

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height - height
    this.depth = 0.4 + Math.random() * 0.6
    this.size = (6 + Math.random() * 10) * this.depth
    this.baseVx = (Math.random() - 0.5) * 0.4
    this.baseVy = (0.3 + Math.random() * 0.6) * this.depth
    this.vx = this.baseVx
    this.vy = this.baseVy
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.02
    this.swayOffset = Math.random() * Math.PI * 2
    this.swaySpeed = 0.4 + Math.random() * 0.6
    this.wilted = Math.random() < 0.2
  }

  update(width: number, height: number, time: number, pointer: PointerState, speedMultiplier: number) {
    const sway = Math.sin(time * 0.001 * this.swaySpeed + this.swayOffset) * 0.3
    let targetVx = this.baseVx + sway
    let targetVy = this.baseVy

    if (pointer.active) {
      const dx = this.x - pointer.x
      const dy = this.y - pointer.y
      const distSq = dx * dx + dy * dy
      const radius = 130
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

    this.vx += (targetVx - this.vx) * 0.08
    this.vy += (targetVy - this.vy) * 0.08
    this.rotationSpeed *= 0.98

    this.x += this.vx * speedMultiplier
    this.y += this.vy * speedMultiplier
    this.rotation += this.rotationSpeed

    if (this.y > height + 40) {
      this.y = -40
      this.x = Math.random() * width
    }
    if (this.x < -40) this.x = width + 40
    if (this.x > width + 40) this.x = -40
  }

  draw(ctx: CanvasRenderingContext2D, colorAccent: string, colorSoft: string, opacity: number) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.globalAlpha = opacity * (this.wilted ? 0.5 : 0.85)
    const w = this.size
    const h = this.size * 0.75
    ctx.beginPath()
    ctx.moveTo(0, -h)
    ctx.bezierCurveTo(w, -h, w, h * 0.4, 0, h)
    ctx.bezierCurveTo(-w, h * 0.4, -w, -h, 0, -h)
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

  update(width: number, height: number, time: number) {
    this.x += this.vx + Math.sin(time * 0.0006 + this.opacityJitter) * 0.1
    this.y += this.vy

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
