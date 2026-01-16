import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ZodiacSelection } from '@/components/ZodiacSelection';
import { HoroscopeView } from '@/components/HoroscopeView';
import { CosmicLayout } from '@/components/CosmicLayout';
import { ZodiacSign, getSignById } from '@/data/zodiacSigns';
import { getSelectedSign, setSelectedSign, clearSelectedSign } from '@/services/horoscopeService';

const Index = () => {
  const [selectedSign, setSelectedSignState] = useState<ZodiacSign | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedSignId = getSelectedSign();
    if (savedSignId) {
      const sign = getSignById(savedSignId);
      if (sign) {
        setSelectedSignState(sign);
      }
    }
    setIsInitialized(true);
  }, []);

  const handleSignSelect = (sign: ZodiacSign) => {
    setSelectedSign(sign.id);
    setSelectedSignState(sign);
  };

  const handleBack = () => {
    clearSelectedSign();
    setSelectedSignState(null);
  };

  if (!isInitialized) {
    return (
      <CosmicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl animate-float"
          >
            ✨
          </motion.div>
        </div>
      </CosmicLayout>
    );
  }

  return (
    <CosmicLayout>
      <AnimatePresence mode="wait">
        {selectedSign ? (
          <motion.div
            key="horoscope"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <HoroscopeView sign={selectedSign} onBack={handleBack} />
          </motion.div>
        ) : (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <ZodiacSelection onSelect={handleSignSelect} />
          </motion.div>
        )}
      </AnimatePresence>
    </CosmicLayout>
  );
};

export default Index;
