'use client';
import React from 'react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  useProgress,
  Html,
} from '@react-three/drei';
import { motion } from 'framer-motion';
import Door from '../components/home/Door';
import { useNavigate } from 'react-router-dom';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-emerald-600 font-medium">
          {progress.toFixed(0)}% loaded
        </p>
      </div>
    </Html>
  );
}

function Home() {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);

  const handleDoorClick = () => {
    if (animating) return;
    setAnimating(true);

    // Navigate to garden after door animation completes
    setTimeout(() => {
      navigate('/garden');
    }, 2000);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      {/* Welcome text */}
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-emerald-800 mb-4">
          Welcome to the Garden
        </h1>
        <p className="text-xl text-emerald-600">
          Click the door to enter a world of botanical wonders
        </p>
      </motion.div>

      {/* 3D Door Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.5} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <Door onClick={handleDoorClick} animating={animating} />
            <Environment preset="sunset" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-emerald-700 text-sm">
          Explore hundreds of plant species
        </p>
      </motion.div>
    </div>
  );
}

export default Home;
