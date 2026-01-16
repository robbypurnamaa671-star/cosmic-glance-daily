import { motion } from 'framer-motion';
import { HoroscopeData } from '@/services/horoscopeService';
import { ZodiacSign } from '@/data/zodiacSigns';
import { Heart, Palette, Hash, Users, Calendar, Cloud } from 'lucide-react';

interface HoroscopeCardProps {
  horoscope: HoroscopeData;
  sign: ZodiacSign;
  fromCache: boolean;
  isLoading: boolean;
}

export function HoroscopeCard({ horoscope, sign, fromCache, isLoading }: HoroscopeCardProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-3xl p-6 md:p-8 space-y-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
        </div>
      </motion.div>
    );
  }

  const infoItems = [
    { icon: Heart, label: 'Mood', value: horoscope.mood },
    { icon: Palette, label: 'Lucky Color', value: horoscope.lucky_color },
    { icon: Hash, label: 'Lucky Number', value: horoscope.lucky_number },
    { icon: Users, label: 'Compatibility', value: horoscope.compatibility },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-6 md:p-8 space-y-6"
    >
      {fromCache && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 text-sm text-muted-foreground"
        >
          <Cloud className="w-4 h-4" />
          <span>Showing last available horoscope</span>
        </motion.div>
      )}

      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl md:text-4xl animate-pulse-glow"
        >
          {sign.symbol}
        </motion.div>
        
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-gradient-gold">
            {sign.name}
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{horoscope.current_date}</span>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-foreground/90 text-base md:text-lg leading-relaxed"
      >
        {horoscope.description}
      </motion.p>

      <div className="grid grid-cols-2 gap-3">
        {infoItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
          >
            <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
