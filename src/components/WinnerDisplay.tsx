import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface WinnerDisplayProps {
  winner: {
    winner: string;
    number: number;
  } | null;
}

export function WinnerDisplay({ winner }: WinnerDisplayProps) {
  return (
    <AnimatePresence>
      {winner && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-twitch-purple p-8 rounded-lg text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="inline-block mb-4"
            >
              <Trophy className="w-16 h-16 text-yellow-400" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Winner!</h2>
            <p className="text-xl mb-4">{winner.winner}</p>
            <p className="text-lg">
              Correctly guessed the number: {winner.number}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}