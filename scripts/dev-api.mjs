import { createServer } from 'node:http';

const TEBEX_API_BASE = 'https://api.tebex.io/v1';
const MINECRAFT_USERNAME_RE = /^[a-zA-Z0-9_]{3,16}$/;
const PORT = process.env.PORT || 3001;

const server = createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/api/checkout') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  const secretKey = process.env.TEBEX_SECRET_KEY;
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    try {
      if (!secretKey) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server is not configured (missing TEBEX_SECRET_KEY).' }));
        return;
      }

      const { packageId, username } = JSON.parse(body || '{}');

      if (typeof packageId !== 'number' || !Number.isInteger(packageId) || packageId <= 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid package.' }));
        return;
      }
      if (typeof username !== 'string' || !MINECRAFT_USERNAME_RE.test(username.trim())) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Enter a valid Minecraft username (3-16 letters, numbers or underscores).' }));
        return;
      }

      const tebexRes = await fetch(`${TEBEX_API_BASE}/baskets`, {
        method: 'POST',
        headers: {
          'Authorization': secretKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          items: [{ package_id: packageId, quantity: 1 }],
        }),
      });

      const data = await tebexRes.json().catch(() => null);

      if (!tebexRes.ok || !data?.links?.checkout) {
        console.error('Tebex basket creation failed:', tebexRes.status, JSON.stringify(data));
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Could not start checkout. Please try again in a moment.' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ checkoutUrl: data.links.checkout }));
    } catch (err) {
      console.error('Checkout error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`API dev server running at http://localhost:${PORT}/api/checkout`);
});
