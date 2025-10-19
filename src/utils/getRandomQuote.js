import axios from 'axios';

export const getRandomQuote = async () => {
  try {
    const res = await axios.get('https://zenquotes.io/api/random');
    const quote = res.data[0];
    return `${quote.q}`;
  } catch (err) {
    console.error('Quote fetch failed:', err.message);
    return 'Keep going!';
  }
};
