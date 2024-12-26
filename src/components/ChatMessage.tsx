import React from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  username: string;
  message: string;
  isGuess?: boolean;
}

export function ChatMessage({ username, message, isGuess }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-2 rounded-md mb-2 ${
        isGuess ? 'bg-twitch-darkGray' : 'bg-twitch-gray'
      }`}
    >
      <span className="font-bold text-purple-400">{username}</span>
      <span className="text-twitch-lightGray ml-2">{message}</span>
    </motion.div>
  );
}