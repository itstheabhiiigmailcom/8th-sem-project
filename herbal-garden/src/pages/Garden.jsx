'use client';
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  useProgress,
  Html,
  Sky,
} from '@react-three/drei';
import { motion } from 'framer-motion';
import GardenEnvironment from '../components/garden/Environment';
import PlantInfoCard from '../components/garden/PlantInfoCard';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

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

function ErrorFallback({ error }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-xl font-bold text-red-600 mb-2">
        Something went wrong in the 3D scene
      </h2>
      <pre className="text-sm text-gray-700">{error.message}</pre>
      <Link
        to="/home"
        className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md"
      >
        Go Back Home
      </Link>
    </div>
  );
}

function Garden() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const dirLightRef = useRef(null);

  // 🔁 WebGL context loss handler
  useEffect(() => {
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost. Attempting to recover...');
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
      }
    };
  }, []);

  // 📐 Directional light config
  useEffect(() => {
    if (dirLightRef.current) {
      dirLightRef.current.shadow.mapSize.width = 1024;
      dirLightRef.current.shadow.mapSize.height = 1024;
      dirLightRef.current.shadow.bias = -0.0001;
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* 🔙 Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/home"
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-emerald-800 font-medium shadow-md hover:bg-white transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* 🪴 Plant info card */}
      {selectedPlant && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <PlantInfoCard
            plant={selectedPlant}
            onClose={() => setSelectedPlant(null)}
          />
        </motion.div>
      )}

      {/* 🌿 3D Canvas inside ErrorBoundary */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas
          camera={{ position: [0, 5, 15], fov: 60 }}
          shadows
          frameloop="always" // or "demand" if performance issues
        >
          <Suspense fallback={<Loader />}>
            <Sky sunPosition={[100, 10, 100]} />
            <ambientLight intensity={0.5} />
            <directionalLight
              ref={dirLightRef}
              position={[10, 10, 10]}
              intensity={1}
              castShadow
            />

            <GardenEnvironment onSelectPlant={setSelectedPlant} />
            <Environment preset="sunset" />

            <OrbitControls
              enableZoom
              enablePan
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={50}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

export default Garden;
