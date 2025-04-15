'use client';
import React from 'react';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'; // ✅ Correct import placement

function Door({ onClick, animating }) {
  // ⚠️ Typo: Should be `animating` (fix this!)
  const doorRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (doorRef.current && !animating) {
      doorRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05 + 0.1;
    }
  });

  return (
    <group>
      {/* Door frame */}
      <mesh position={[0, 1, 0]} receiveShadow>
        <boxGeometry args={[2.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Door */}
      <motion.group
        ref={doorRef}
        position={[0, 1, 0.1]}
        animate={animating ? { rotateY: Math.PI / 2, z: 0.5 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <mesh castShadow>
          <boxGeometry args={[1.8, 2.8, 0.1]} />
          <meshStandardMaterial
            color={hovered ? '#A0522D' : '#6B4226'}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* Door handle */}
        <mesh position={[0.7, 0, 0.1]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </motion.group>

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </group>
  );
}

// ✅ Correct placement of propTypes (before export)
Door.propTypes = {
  onClick: PropTypes.func.isRequired,
  animating: PropTypes.bool.isRequired, // Fix the typo here too!
};

export default Door;
