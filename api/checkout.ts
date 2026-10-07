interface VercelRequest {
  method?: string;
  body?: any;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: any): void;
}

const TEBEX_API_BASE = 'https://api.tebex.io/v1';
const MINECRAFT_USERNAME_RE = /^[a-zA-Z0-9_]{3,16}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secretKey = process.env.TEBEX_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: 'Server is not configured (missing TEBEX_SECRET_KEY).' });
    return;
  }

  const { packageId, username } = req.body ?? {};

  if (typeof packageId !== 'number' || !Number.isInteger(packageId) || packageId <= 0) {
    res.status(400).json({ error: 'Invalid package.' });
    return;
  }
  if (typeof username !== 'string' || !MINECRAFT_USERNAME_RE.test(username.trim())) {
    res.status(400).json({ error: 'Enter a valid Minecraft username (3-16 letters, numbers or underscores).' });
    return;
  }

  try {
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
        complete_url: `${req.headers.origin ?? ''}/`,
        return_url: `${req.headers.origin ?? ''}/`,
      }),
    });

    const data = await tebexRes.json().catch(() => null);

    if (!tebexRes.ok || !data?.links?.checkout) {
      console.error('Tebex basket creation failed:', tebexRes.status, JSON.stringify(data));
      res.status(502).json({ error: 'Could not start checkout. Please try again in a moment.' });
      return;
    }

    res.status(200).json({ checkoutUrl: data.links.checkout });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
