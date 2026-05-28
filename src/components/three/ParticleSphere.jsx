import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleSphere({ count = 2000 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      arr[i * 3]     = Math.sin(phi) * Math.cos(theta) * 2
      arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * 2
      arr[i * 3 + 2] = Math.cos(phi) * 2
    }
    return arr
  }, [count])

  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.1 })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#6366f1" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}