import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ParticleSphere from './ParticleSphere'
import FloatingGeometry from './FloatingGeometry'

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <ParticleSphere />
      <FloatingGeometry />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  )
}