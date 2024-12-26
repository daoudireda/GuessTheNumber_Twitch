import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface Message {
  id: string;
  username: string;
  message: string;
  isGuess?: boolean;
}

export function useTwitchChat(socket: Socket | null) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('chatMessage', (message: Message) => {
      setMessages((prev) => [...prev.slice(-49), message]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [socket]);

  return { messages };
}