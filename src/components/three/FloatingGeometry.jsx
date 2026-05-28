import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

export default function FloatingGeometry() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.3
      ref.current.rotation.x += 0.003
    }
  })
  return (
    <mesh ref={ref} position={[2.5, 0, -1]}>
      <icosahedronGeometry args={[0.8, 1]} />
      <MeshDistortMaterial color="#a78bfa" distort={0.3} speed={2} roughness={0.1} metalness={0.8} />
    </mesh>
  )
}