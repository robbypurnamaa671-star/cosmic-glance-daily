import { motion } from 'framer-motion';
import { zodiacSigns, ZodiacSign } from '@/data/zodiacSigns';
import { ZodiacCard } from './ZodiacCard';
import { Sparkles } from 'lucide-react';

interface ZodiacSelectionProps {
  onSelect: (sign: ZodiacSign) => void;
}

export function ZodiacSelection({ onSelect }: ZodiacSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Daily Cosmic Guidance</span>
        </motion.div>
        
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-gradient-gold mb-4">
          Horoscope Today
        </h1>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
          Select your zodiac sign to discover what the stars have in store for you
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-4xl w-full"
      >
        {zodiacSigns.map((sign, index) => (
          <ZodiacCard
            key={sign.id}
            sign={sign}
            onSelect={onSelect}
            index={index}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-muted-foreground/60 text-center"
      >
        Your selection will be saved for future visits
      </motion.p>
    </div>
  );
}
