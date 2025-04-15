'use client';
import React from 'react';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import Plant from './Plant';
import { generatePlants } from '../../lib/PlantData';

/**
 * Garden environment with plants and decorative elements
 * @param {Object} props
 * @param {Function} props.onSelectPlant - Function to call when a plant is selected
 */
function GardenEnvironment({ onSelectPlant }) {
  const groupRef = useRef(null);

  // Generate plants data
  const plants = useMemo(() => generatePlants(150), []);

  // Subtle animation for the entire garden
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5a8a44" />
      </mesh>

      {/* Plants */}
      <group>
        {plants.map((plant, index) => (
          <Plant
            key={index}
            position={[plant.position.x, plant.position.y, plant.position.z]}
            scale={plant.scale}
            color={plant.color}
            type={plant.type}
            onClick={() => onSelectPlant(plant)}
          />
        ))}
      </group>

      {/* Decorative rocks using instancing for performance */}
      <Instances limit={100}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="gray" roughness={0.8} />

        {Array.from({ length: 50 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 80;
          const z = (Math.random() - 0.5) * 80;
          const scale = Math.random() * 0.5 + 0.2;

          return (
            <Instance
              key={i}
              position={[x, -0.3, z]}
              scale={scale}
              rotation={[Math.random(), Math.random(), Math.random()]}
            />
          );
        })}
      </Instances>
    </group>
  );
}

export default GardenEnvironment;
