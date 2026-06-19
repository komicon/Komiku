module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'url parameter required' });
  
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'KomikKu/2.0', 'Accept': 'application/json' }
    });
    const data = await r.json();
    res.setHeader('Content-Type', 'application/json');
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
