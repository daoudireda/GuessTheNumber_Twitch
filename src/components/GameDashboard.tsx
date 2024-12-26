import React from 'react';
import { TwitchUser } from '../types';
import { GameControls } from './GameControls';
import { GameStatus } from './GameStatus';
import { ChatDisplay } from './ChatDisplay';
import { WinnerDisplay } from './WinnerDisplay';
import { LogOut } from 'lucide-react';
import { useTwitchChat } from '../hooks/useTwitchChat';
import { useSocket } from '../hooks/useSocket';

interface GameDashboardProps {
  user: TwitchUser;
  onLogout: () => void;
  minRange: number;
  maxRange: number;
  gameState: { active: boolean; range: { min: number; max: number } };
  winner: { winner: string; number: number } | null;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onStartGame: () => void;
  onStopGame: () => void;
}

export function GameDashboard({
  user,
  onLogout,
  minRange,
  maxRange,
  gameState,
  winner,
  onMinChange,
  onMaxChange,
  onStartGame,
  onStopGame,
}: GameDashboardProps) {
  const { socket } = useSocket();
  const { messages } = useTwitchChat(socket);

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return (
    <div className="min-h-screen bg-twitch-black text-white p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-[1fr_300px] gap-4">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img
                src={user.profile_image_url}
                alt={user.display_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{user.display_name}</h2>
                <p className="text-sm text-twitch-lightGray">Streamer</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-twitch-lightGray hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-twitch-darkGray rounded-lg p-8 shadow-xl">
            <GameControls
              minRange={minRange}
              maxRange={maxRange}
              isActive={gameState.active}
              onMinChange={onMinChange}
              onMaxChange={onMaxChange}
              onStartGame={onStartGame}
              onStopGame={onStopGame}
            />

            <GameStatus
              isActive={gameState.active}
              range={gameState.range}
              winner={winner}
            />
          </div>
        </div>

        <ChatDisplay messages={messages} />
      </div>

      <WinnerDisplay winner={winner} />
    </div>
  );
}