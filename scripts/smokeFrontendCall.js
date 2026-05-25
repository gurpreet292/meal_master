import fetch from 'node-fetch';

const API = process.env.VITE_API_URL || 'http://localhost:5000';

(async () => {
  try {
    const res = await fetch(`${API}/api/meals`);
    const data = await res.json();
    console.log('GET /api/meals ->', res.status, JSON.stringify(data).slice(0,200));
  } catch (err) {
    console.error('Error calling backend:', err.message);
  }
})();
