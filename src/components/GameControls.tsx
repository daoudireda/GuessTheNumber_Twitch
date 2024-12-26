import React from 'react';

interface GameControlsProps {
  minRange: number;
  maxRange: number;
  isActive: boolean;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onStartGame: () => void;
  onStopGame: () => void;
}

export function GameControls({
  minRange,
  maxRange,
  isActive,
  onMinChange,
  onMaxChange,
  onStartGame,
  onStopGame,
}: GameControlsProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Min Range</label>
          <input
            type="number"
            value={minRange}
            onChange={(e) => onMinChange(parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 rounded-md"
            disabled={isActive}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Max Range</label>
          <input
            type="number"
            value={maxRange}
            onChange={(e) => onMaxChange(parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 rounded-md"
            disabled={isActive}
          />
        </div>
      </div>

      <button
        onClick={isActive ? onStopGame : onStartGame}
        className={`w-full py-3 rounded-md font-medium ${
          isActive
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-purple-500 hover:bg-purple-600'
        } transition-colors`}
      >
        {isActive ? 'Stop Game' : 'Start Game'}
      </button>
    </div>
  );
}