import axios from 'axios';

export const getRandomQuote = async () => {
  try {
    const res = await axios.get('https://api.quotable.io/random');
    return res.data.content;
  } catch (err) {
    console.error('Failed to fetch quote:', err.message);
    return 'Keep going!';
  }
};
