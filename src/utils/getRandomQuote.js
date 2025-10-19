import https from 'https';
import axios from 'axios';

const agent = new https.Agent({ rejectUnauthorized: false });

export const getRandomQuote = async () => {
  try {
    const res = await axios.get('https://api.quotable.io/random', {
      httpsAgent: agent,
    });
    return res.data.content;
  } catch (err) {
    console.error('Failed to fetch quote:', err.message);
    return 'Keep going!';
  }
};
