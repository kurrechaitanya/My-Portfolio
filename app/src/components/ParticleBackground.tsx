import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef } from "react"

function Particles() {

  const ref = useRef<any>()

  const particles = new Float32Array(2000)

  for (let i = 0; i < particles.length; i++) {
    particles[i] = (Math.random() - 0.5) * 6
  }

  // animation loop
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.00002
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        color="#00E5FF"
        size={0.03}
        transparent
        opacity={0.5}
      />
    </Points>
  )
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-[1] ">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Particles />
      </Canvas>
    </div>
  )
}