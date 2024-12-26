import { Twitch } from 'lucide-react';
import { colors } from '../styles/theme';

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0E0E10] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold mb-2 tracking-tight">
        Guess the Number
      </h1>
      <p className="text-xl text-[#EFEFF1] mb-12 tracking-wide">
        CONTROLLED BY TWITCH CHAT
      </p>
      
      <button
        onClick={onLogin}
        style={{ backgroundColor: colors.twitch.purple }}
        className="hover:bg-[#772CE8] text-white font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-colors"
      >
        <Twitch className="w-5 h-5" />
        LOGIN WITH TWITCH
      </button>
      
      <p className="text-sm text-[#EFEFF1] mt-8">
        By signing in you accept our TOS & Privacy policy.
      </p>
    </div>
  );
}