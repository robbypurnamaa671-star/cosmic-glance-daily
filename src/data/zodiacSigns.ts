export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  element: 'fire' | 'earth' | 'air' | 'water';
}

export const zodiacSigns: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'fire' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'earth' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'air' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'water' },
  { id: 'leo', name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'fire' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'earth' },
  { id: 'libra', name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'air' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'water' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'fire' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'earth' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'air' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'water' },
];

export const elementColors: Record<string, string> = {
  fire: 'from-orange-500/20 to-red-600/20',
  earth: 'from-emerald-500/20 to-amber-600/20',
  air: 'from-sky-400/20 to-indigo-500/20',
  water: 'from-blue-400/20 to-purple-600/20',
};

export const getSignById = (id: string): ZodiacSign | undefined => {
  return zodiacSigns.find(sign => sign.id === id);
};
