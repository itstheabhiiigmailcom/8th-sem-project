'use client';
import React from 'react';
import { X } from 'lucide-react';

/**
 * Plant information card component
 * @param {Object} props
 * @param {Object} props.plant - Plant data object
 * @param {Function} props.onClose - Function to call when card is closed
 */
function PlantInfoCard({ plant, onClose }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden max-w-md w-full mx-auto">
      <div className="relative">
        <div
          className="h-32 w-full"
          style={{
            backgroundColor: plant.color,
            backgroundImage:
              'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(0,0,0,0.1))',
          }}
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
        >
          <X size={20} className="text-gray-700" />
        </button>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{plant.name}</h2>
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
            {plant.type.charAt(0).toUpperCase() + plant.type.slice(1)}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{plant.scientificName}</span>
        </div>

        <p className="text-gray-600 mb-4">{plant.description}</p>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Height</span>
            <span className="text-sm font-medium">{plant.height}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Native to</span>
            <span className="text-sm font-medium">{plant.nativeTo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Sunlight</span>
            <span className="text-sm font-medium">{plant.sunlight}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Water needs</span>
            <span className="text-sm font-medium">{plant.waterNeeds}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Care Tips
          </h3>
          <p className="text-sm text-gray-600">{plant.careTips}</p>
        </div>
      </div>
    </div>
  );
}

export default PlantInfoCard;
