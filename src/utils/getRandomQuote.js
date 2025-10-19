import axios from 'axios';
const fallbackQuotes = ['Keep going!', 'You can do it!', 'Never give up!'];

export const getRandomQuote = async () => {
  try {
    const res = await axios.get('https://api.quotable.io/random');
    return res.data.content;
  } catch {
    console.warn('Quotable fetch failed, using fallback.');
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
};
