import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { GameDashboard } from './components/GameDashboard';
import { useSocket } from './hooks/useSocket';
import { useTwitchAuth } from './hooks/useTwitchAuth';

function App() {
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const { gameState, winner, startGame, stopGame } = useSocket();
  const { user, loading, login, logout } = useTwitchAuth();

  const handleStartGame = () => {
    startGame({ min: minRange, max: maxRange });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-twitch-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LandingPage onLogin={login} />;
  }

  return (
    <GameDashboard
      user={user}
      onLogout={logout}
      minRange={minRange}
      maxRange={maxRange}
      gameState={gameState}
      winner={winner}
      onMinChange={setMinRange}
      onMaxChange={setMaxRange}
      onStartGame={handleStartGame}
      onStopGame={stopGame}
    />
  );
}

export default App;