import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, RefreshCw } from 'lucide-react';
import { ZodiacSign } from '@/data/zodiacSigns';
import { HoroscopeData, fetchHoroscope } from '@/services/horoscopeService';
import { DaySwitcher } from './DaySwitcher';
import { HoroscopeCard } from './HoroscopeCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Day = 'yesterday' | 'today' | 'tomorrow';

interface HoroscopeViewProps {
  sign: ZodiacSign;
  onBack: () => void;
}

export function HoroscopeView({ sign, onBack }: HoroscopeViewProps) {
  const [selectedDay, setSelectedDay] = useState<Day>('today');
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);

  const loadHoroscope = async () => {
    setIsLoading(true);
    try {
      const result = await fetchHoroscope(sign.id, selectedDay);
      setHoroscope(result.data);
      setFromCache(result.fromCache);
    } catch (error) {
      toast.error('Failed to load horoscope');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHoroscope();
  }, [sign.id, selectedDay]);

  const handleShare = async () => {
    if (!horoscope) return;
    
    const shareText = `✨ ${sign.name} Horoscope for ${horoscope.current_date}\n\n${horoscope.description}\n\n🎨 Lucky Color: ${horoscope.lucky_color}\n🔢 Lucky Number: ${horoscope.lucky_number}\n💫 Mood: ${horoscope.mood}\n❤️ Compatibility: ${horoscope.compatibility}`;
    
    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success('Copied to clipboard!');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <h1 className="font-display text-lg text-gradient-gold">Horoscope Today</h1>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={loadHoroscope}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/30"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            disabled={!horoscope || isLoading}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/30"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-6"
      >
        <DaySwitcher selectedDay={selectedDay} onDayChange={setSelectedDay} />
      </motion.div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        {horoscope ? (
          <HoroscopeCard
            horoscope={horoscope}
            sign={sign}
            fromCache={fromCache}
            isLoading={isLoading}
          />
        ) : (
          <HoroscopeCard
            horoscope={{
              description: '',
              mood: '',
              lucky_color: '',
              lucky_number: '',
              compatibility: '',
              current_date: '',
              date_range: '',
            }}
            sign={sign}
            fromCache={false}
            isLoading={true}
          />
        )}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-xs text-muted-foreground/60 text-center"
      >
        Updated daily • Tap share to spread the cosmic wisdom
      </motion.p>
    </div>
  );
}
