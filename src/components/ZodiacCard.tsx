import { motion } from 'framer-motion';
import { ZodiacSign, elementColors } from '@/data/zodiacSigns';

interface ZodiacCardProps {
  sign: ZodiacSign;
  onSelect: (sign: ZodiacSign) => void;
  index: number;
}

export function ZodiacCard({ sign, onSelect, index }: ZodiacCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(sign)}
      className={`
        relative group p-4 rounded-2xl
        bg-card/80 backdrop-blur-md
        border border-primary/20
        transition-all duration-300
        hover:border-primary/50 hover:glow-gold cursor-pointer
        flex flex-col items-center gap-2
      `}
    >
      <motion.div
        className="text-4xl md:text-5xl text-primary drop-shadow-lg"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {sign.symbol}
      </motion.div>
      
      <h3 className="font-display text-sm md:text-base text-foreground font-medium">
        {sign.name}
      </h3>
      
      <p className="text-xs text-muted-foreground">
        {sign.dates}
      </p>
      
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${elementColors[sign.element]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.button>
  );
}
