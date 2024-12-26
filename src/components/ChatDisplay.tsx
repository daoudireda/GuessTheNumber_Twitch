import React from 'react';
import { ChatMessage } from './ChatMessage';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  username: string;
  message: string;
  isGuess?: boolean;
}

interface ChatDisplayProps {
  messages: Message[];
}

export function ChatDisplay({ messages }: ChatDisplayProps) {
  return (
    <motion.div
      className="bg-twitch-darkGray rounded-lg p-4 h-[400px] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-lg font-bold mb-4 text-twitch-lightGray">Chat</h3>
      <div className="space-y-2">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            username={msg.username}
            message={msg.message}
            isGuess={msg.isGuess}
          />
        ))}
      </div>
    </motion.div>
  );
}