import axios from 'axios';

export const getRandomQuote = async () => {
  try {
    const res = await axios.get('https://zenquotes.io/api/random', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'application/json',
      },
      timeout: 5000,
    });
    const quote = res.data[0];
    return `${quote.q}`;
  } catch (err) {
    console.error(
      'Quote fetch failed:',
      err.code,
      err.message,
      err.response?.status,
    );
    return 'Keep going!';
  }
};
