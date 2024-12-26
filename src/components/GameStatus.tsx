import React from 'react';
import { Crown } from 'lucide-react';

interface GameStatusProps {
  isActive: boolean;
  range?: { min: number; max: number };
  winner?: { winner: string; number: number } | null;
}

export function GameStatus({ isActive, range, winner }: GameStatusProps) {
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Game Status</h2>
      <p className="mb-2">
        Status:{' '}
        <span
          className={`font-medium ${
            isActive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </p>
      {isActive && range && (
        <p>
          Current Range: {range.min} - {range.max}
        </p>
      )}
      {winner && (
        <div className="mt-4 p-4 bg-purple-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold">Winner!</h3>
          </div>
          <p>
            {winner.winner} won with the number {winner.number}
          </p>
        </div>
      )}
    </div>
  );
}