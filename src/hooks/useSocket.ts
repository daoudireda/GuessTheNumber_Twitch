import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { GameState, Winner } from '../types';

interface UseSocketReturn {
  socket: Socket | null;
  gameState: GameState;
  winner: Winner | null;
  startGame: (range: { min: number; max: number }) => void;
  stopGame: () => void;
}

const initialGameState: GameState = {
  active: false,
  range: { min: 1, max: 100 }
};

export function useSocket(): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [winner, setWinner] = useState<Winner | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3000');

      socketRef.current.on('gameState', (state: GameState) => {
        setGameState(state);
      });

      socketRef.current.on('gameWon', (data: Winner) => {
        setWinner(data);
        setGameState(prev => ({ ...prev, active: false }));
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const startGame = (range: { min: number; max: number }) => {
    socketRef.current?.emit('startGame', range);
    setWinner(null);
  };

  const stopGame = () => {
    socketRef.current?.emit('stopGame');
  };

  return {
    socket: socketRef.current,
    gameState,
    winner,
    startGame,
    stopGame
  };
}