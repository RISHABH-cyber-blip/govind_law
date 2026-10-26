'use client'

import React, { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let angleX = 0
    let angleY = 0

    // Set canvas dimensions
    const resize = () => {
      if (!canvas) return
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Icosahedron geometry
    const phi = (1 + Math.sqrt(5)) / 2
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ]

    // Normalize vertices
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.hypot(x, y, z)
      return [x / len, y / len, z / len] as [number, number, number]
    })

    // Find edges (distance is approximately equal)
    const edges: [number, number][] = []
    const targetDist = 2 / Math.hypot(1, phi, 0)
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0]
        const dy = vertices[i][1] - vertices[j][1]
        const dz = vertices[i][2] - vertices[j][2]
        const dist = Math.hypot(dx, dy, dz)
        if (Math.abs(dist - targetDist) < 0.2) {
          edges.push([i, j])
        }
      }
    }

    const render = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      angleX += 0.002
      angleY += 0.004

      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)

      const cx = canvas.width * 0.75
      const cy = canvas.height * 0.45
      const baseScale = Math.min(canvas.width, canvas.height) * 0.38

      // Rotate & project vertices
      const projected = vertices.map(([vx, vy, vz]) => {
        // Rotate around Y
        const x1 = vx * cosY - vz * sinY
        const z1 = vx * sinY + vz * cosY

        // Rotate around X
        const y2 = vy * cosX - z1 * sinX
        const z2 = vy * sinX + z1 * cosX

        // Perspective projection
        const fov = 4
        const depth = fov / (fov + z2)
        return {
          x: cx + x1 * baseScale * depth,
          y: cy + y2 * baseScale * depth,
          z: z2,
        }
      })

      // Draw edges
      ctx.lineWidth = 1.2
      edges.forEach(([i, j]) => {
        const p1 = projected[i]
        const p2 = projected[j]
        const avgZ = (p1.z + p2.z) / 2
        const alpha = Math.max(0.15, Math.min(0.65, (avgZ + 1.2) * 0.3))

        ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      })

      // Draw subtle vertex nodes
      projected.forEach((p) => {
        const alpha = Math.max(0.2, (p.z + 1.2) * 0.35)
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
      style={{ pointerEvents: 'none' }}
    />
  )
}
