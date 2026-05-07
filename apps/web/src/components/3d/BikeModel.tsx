import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Color } from 'three';

interface BikeModelProps {
  bikeId: string | null;
}

export default function BikeModel({ bikeId }: BikeModelProps) {
  const groupRef = useRef<Group>(null);

  // Determine colors based on active bike id
  const bikeColor = useMemo(() => {
    switch (bikeId) {
      case '1': return new Color('#dc2626'); // Red
      case '2': return new Color('#3b82f6'); // Blue 
      case '3': return new Color('#10b981'); // Green
      case '4': return new Color('#f59e0b'); // Gold
      default: return new Color('#ef4444'); // Default Red
    }
  }, [bikeId]);

  // Subtle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      if (!bikeId) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.03;
      } else {
        groupRef.current.position.y = 0;
      }
    }
  });

  return (
    <group ref={groupRef} scale={1.0}>
      {/* Main Body (Tank/Fairing) */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[2.2, 0.5, 0.7]} />
        <meshStandardMaterial color={bikeColor} metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Engine Block */}
      <mesh position={[0.1, 0.3, 0]} castShadow>
        <boxGeometry args={[1.0, 0.6, 0.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Seat */}
      <mesh position={[-0.5, 1.0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 0.5]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* Front Fork */}
      <mesh position={[1.3, 0.5, 0]} rotation={[0, 0, -Math.PI / 7]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 12]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Handlebars */}
      <mesh position={[0.9, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* Exhaust */}
      <mesh position={[-0.7, 0.2, 0.35]} rotation={[0, 0, Math.PI / 10]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.3, 12]} />
        <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Front Wheel */}
      <mesh position={[1.5, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.08, 12, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      <mesh position={[1.5, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color={bikeColor} metalness={0.8} />
      </mesh>

      {/* Back Wheel */}
      <mesh position={[-1.0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.1, 12, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      <mesh position={[-1.0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
        <meshStandardMaterial color={bikeColor} metalness={0.8} />
      </mesh>

      {/* Headlight */}
      <mesh position={[1.15, 0.95, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffff88" emissiveIntensity={0.5} />
      </mesh>

      {/* Taillight */}
      <mesh position={[-1.1, 0.85, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}
