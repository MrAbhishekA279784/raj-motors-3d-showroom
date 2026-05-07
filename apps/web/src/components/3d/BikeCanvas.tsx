'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BikeModel from './BikeModel';

interface BikeCanvasProps {
  activeBikeId: string | null;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333333" wireframe />
    </mesh>
  );
}

export default function BikeCanvas({ activeBikeId }: BikeCanvasProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: '#09090b' }}>
      <Canvas
        camera={{ position: [4, 2, 4], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: 'default', failIfMajorPerformanceCaveat: false }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Background */}
        <color attach="background" args={['#09090b']} />
        <fog attach="fog" args={['#09090b', 8, 20]} />

        {/* Simple, lightweight lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 3]} intensity={1.5} />
        <directionalLight position={[-3, 5, -3]} intensity={0.4} color="#4488ff" />

        {/* 3D Model with loading fallback */}
        <Suspense fallback={<LoadingFallback />}>
          <group position={[0, -0.5, 0]}>
            <BikeModel bikeId={activeBikeId} />
          </group>
        </Suspense>

        {/* Ground plane for context */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* OrbitControls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={true}
          autoRotateSpeed={1.5}
        />
      </Canvas>

      {/* Status Indicator */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 11, color: '#666', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }}></span>
        WEBGL RENDERER ACTIVE
      </div>
    </div>
  );
}
