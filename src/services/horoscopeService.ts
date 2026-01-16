export interface HoroscopeData {
  description: string;
  mood: string;
  lucky_color: string;
  lucky_number: string;
  compatibility: string;
  current_date: string;
  date_range: string;
}

const CACHE_KEY_PREFIX = 'horoscope_cache_';
const SELECTED_SIGN_KEY = 'selected_zodiac_sign';

// Fallback horoscope data when API is unavailable
const fallbackHoroscopes: Record<string, string[]> = {
  aries: [
    "Today brings opportunities for new beginnings. Your natural leadership shines through, inspiring those around you. Trust your instincts and take bold steps forward.",
    "Energy and enthusiasm are your allies today. Channel your fire into creative pursuits and watch your ideas come to life beautifully.",
    "The stars encourage patience today. Sometimes the greatest victories come from strategic waiting rather than immediate action."
  ],
  taurus: [
    "Stability and comfort are highlighted today. Take time to appreciate the beauty around you and nurture your closest relationships.",
    "Financial matters look promising. Your practical approach serves you well in making sound decisions for your future.",
    "Ground yourself in nature today. A peaceful walk or time in a garden will restore your inner balance wonderfully."
  ],
  gemini: [
    "Communication flows easily today. Express your thoughts clearly and you'll find others are receptive to your ideas.",
    "Curiosity leads you to fascinating discoveries. Embrace learning opportunities that come your way unexpectedly.",
    "Social connections bring joy today. Reach out to friends you haven't spoken with in a while."
  ],
  cancer: [
    "Home and family matters take center stage. Nurturing those you love brings deep satisfaction to your soul.",
    "Trust your intuition today—it's particularly strong. Your emotional intelligence guides you toward the right path.",
    "Self-care is essential now. Create a cozy sanctuary and allow yourself time to recharge fully."
  ],
  leo: [
    "Your creative spark burns bright today. Express yourself boldly and let your unique light shine for all to see.",
    "Recognition for your efforts is on the horizon. Stay confident and continue pursuing your passions with heart.",
    "Generosity returns to you tenfold. Share your warmth with others and watch beautiful connections bloom."
  ],
  virgo: [
    "Attention to detail serves you well today. Your analytical mind spots opportunities others might miss entirely.",
    "Health and wellness are in focus. Small positive changes in your routine create lasting improvements.",
    "Organization brings peace of mind. Tackle that project you've been postponing—you'll feel accomplished."
  ],
  libra: [
    "Harmony in relationships is achievable today. Your diplomatic nature helps resolve any lingering tensions gracefully.",
    "Beauty and art inspire you now. Surround yourself with aesthetically pleasing environments for inner peace.",
    "Balance work and play thoughtfully. Both are essential for your well-being and happiness."
  ],
  scorpio: [
    "Deep insights emerge from reflection today. Your transformative nature helps you release what no longer serves you.",
    "Passion and intensity fuel your endeavors. Channel this powerful energy into meaningful pursuits.",
    "Trust is earned through consistency. Show others your authentic self and connections will deepen."
  ],
  sagittarius: [
    "Adventure calls to you today. Even small explorations can satisfy your wanderlust and expand your horizons.",
    "Optimism is your greatest asset now. Your positive outlook attracts wonderful opportunities and people.",
    "Wisdom comes through experience. Share your knowledge generously with those who seek guidance."
  ],
  capricorn: [
    "Ambition and discipline align today. Your steady progress toward goals is noticed and appreciated by others.",
    "Structure provides freedom. Establish healthy routines that support your long-term vision and dreams.",
    "Professional matters are favored now. Your reputation for reliability opens new doors of opportunity."
  ],
  aquarius: [
    "Innovation and originality define your day. Your unique perspective offers solutions others haven't considered.",
    "Community connections strengthen now. Collaborate with like-minded individuals for greater impact.",
    "Embrace your individuality fully. The world needs your authentic, unconventional approach to life."
  ],
  pisces: [
    "Imagination flows freely today. Creative and spiritual pursuits bring profound satisfaction and meaning.",
    "Compassion guides your interactions. Your empathy helps others feel truly seen and understood.",
    "Dreams hold important messages now. Pay attention to your intuition and inner wisdom."
  ]
};

const moods = ['Optimistic', 'Reflective', 'Energetic', 'Peaceful', 'Creative', 'Determined', 'Playful', 'Intuitive'];
const colors = ['Gold', 'Silver', 'Royal Blue', 'Emerald', 'Rose', 'Violet', 'Coral', 'Ivory', 'Sage', 'Crimson'];
const compatibilities = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

function generateFallbackHoroscope(sign: string, day: string): HoroscopeData {
  const signHoroscopes = fallbackHoroscopes[sign] || fallbackHoroscopes.aries;
  const dayIndex = day === 'yesterday' ? 0 : day === 'today' ? 1 : 2;
  
  const date = new Date();
  if (day === 'yesterday') date.setDate(date.getDate() - 1);
  if (day === 'tomorrow') date.setDate(date.getDate() + 1);
  
  const seedValue = date.getDate() + sign.length;
  
  return {
    description: signHoroscopes[dayIndex % signHoroscopes.length],
    mood: moods[seedValue % moods.length],
    lucky_color: colors[seedValue % colors.length],
    lucky_number: String((seedValue * 7) % 100),
    compatibility: compatibilities[(seedValue + dayIndex) % compatibilities.length],
    current_date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    date_range: ''
  };
}

function getCacheKey(sign: string, day: string): string {
  const date = new Date();
  if (day === 'yesterday') date.setDate(date.getDate() - 1);
  if (day === 'tomorrow') date.setDate(date.getDate() + 1);
  const dateStr = date.toISOString().split('T')[0];
  return `${CACHE_KEY_PREFIX}${sign}_${dateStr}`;
}

export function getCachedHoroscope(sign: string, day: string): HoroscopeData | null {
  try {
    const cached = localStorage.getItem(getCacheKey(sign, day));
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error('Error reading cache:', e);
  }
  return null;
}

function setCachedHoroscope(sign: string, day: string, data: HoroscopeData): void {
  try {
    localStorage.setItem(getCacheKey(sign, day), JSON.stringify(data));
  } catch (e) {
    console.error('Error writing cache:', e);
  }
}

export async function fetchHoroscope(sign: string, day: 'today' | 'tomorrow' | 'yesterday'): Promise<{ data: HoroscopeData; fromCache: boolean }> {
  // Check cache first
  const cached = getCachedHoroscope(sign, day);
  
  try {
    // Try primary API (Aztro)
    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`, {
      method: 'POST',
    });
    
    if (response.ok) {
      const data: HoroscopeData = await response.json();
      setCachedHoroscope(sign, day, data);
      return { data, fromCache: false };
    }
    
    throw new Error('Primary API failed');
  } catch (error) {
    console.log('API unavailable, using fallback');
    
    // If we have cached data, return it
    if (cached) {
      return { data: cached, fromCache: true };
    }
    
    // Generate fallback data
    const fallbackData = generateFallbackHoroscope(sign, day);
    setCachedHoroscope(sign, day, fallbackData);
    return { data: fallbackData, fromCache: false };
  }
}

export function getSelectedSign(): string | null {
  return localStorage.getItem(SELECTED_SIGN_KEY);
}

export function setSelectedSign(sign: string): void {
  localStorage.setItem(SELECTED_SIGN_KEY, sign);
}

export function clearSelectedSign(): void {
  localStorage.removeItem(SELECTED_SIGN_KEY);
}
