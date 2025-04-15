'use client';
import React from 'react';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

/**
 * Plant component that renders different types of plants
 * @param {Object} props
 * @param {Array} props.position - [x, y, z] position of the plant
 * @param {number} props.scale - Scale of the plant
 * @param {string} props.color - Color of the plant
 * @param {string} props.type - Type of plant (flower, bush, tree)
 * @param {Function} props.onClick - Function to call when plant is clicked
 */
function Plant({ position, scale, color, type, onClick }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef(null);

  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle swaying motion
      groupRef.current.rotation.z =
        Math.sin(state.clock.getElapsedTime() * 0.5 + position[0]) * 0.05;
    }
  });

  // Render different plant types
  const renderPlant = () => {
    switch (type) {
      case 'flower':
        return (
          <>
            {/* Stem */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>

            {/* Flower */}
            <mesh position={[0, 1.2, 0]} castShadow>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );

      case 'bush':
        return (
          <>
            {/* Bush */}
            <mesh position={[0, 0.3, 0]} castShadow>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );

      case 'tree':
        return (
          <>
            {/* Trunk */}
            <mesh position={[0, 0.75, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, 1.5, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Foliage */}
            <mesh position={[0, 1.7, 0]} castShadow>
              <coneGeometry args={[0.6, 1.2, 8]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <motion.group
      ref={groupRef}
      position={position}
      scale={[scale, scale, scale]}
      animate={hovered ? { y: position[1] + 0.1 } : { y: position[1] }}
      transition={{ duration: 0.3 }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {renderPlant()}

      {hovered && (
        <Html position={[0, type === 'tree' ? 2.5 : 1.5, 0]} center>
          <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-emerald-800 whitespace-nowrap">
            Click for info
          </div>
        </Html>
      )}
    </motion.group>
  );
}

export default Plant;
