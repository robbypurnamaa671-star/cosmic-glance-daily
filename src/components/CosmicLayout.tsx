import { ReactNode } from 'react';
import cosmicBg from '@/assets/cosmic-bg.jpg';

interface CosmicLayoutProps {
  children: ReactNode;
}

export function CosmicLayout({ children }: CosmicLayoutProps) {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for better text readability - reduced opacity */}
      <div className="absolute inset-0 bg-background/40" />
      
      {/* Starfield animation layer */}
      <div className="absolute inset-0 starfield opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
