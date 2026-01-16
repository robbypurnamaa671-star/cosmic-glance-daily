import { motion } from 'framer-motion';

type Day = 'yesterday' | 'today' | 'tomorrow';

interface DaySwitcherProps {
  selectedDay: Day;
  onDayChange: (day: Day) => void;
}

const days: { id: Day; label: string }[] = [
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
];

export function DaySwitcher({ selectedDay, onDayChange }: DaySwitcherProps) {
  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-xl glass-card">
      {days.map((day) => (
        <button
          key={day.id}
          onClick={() => onDayChange(day.id)}
          className={`
            relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
            ${selectedDay === day.id
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {selectedDay === day.id && (
            <motion.div
              layoutId="day-indicator"
              className="absolute inset-0 bg-primary rounded-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{day.label}</span>
        </button>
      ))}
    </div>
  );
}
