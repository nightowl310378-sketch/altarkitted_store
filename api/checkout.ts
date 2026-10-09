interface VercelRequest {
  method?: string;
  body?: any;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: any): void;
}

const TEBEX_CHECKOUT_URL = 'https://plugin.tebex.io/checkout';
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
    const tebexRes = await fetch(TEBEX_CHECKOUT_URL, {
      method: 'POST',
      headers: {
        'X-Tebex-Secret': secretKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        package_id: String(packageId),
        username: username.trim(),
      }),
    });

    const data = await tebexRes.json().catch(() => null);

    if (!tebexRes.ok || !data?.url) {
      console.error('Tebex checkout URL creation failed:', tebexRes.status, JSON.stringify(data));
      const userError =
        tebexRes.status === 400 && data?.error_message
          ? data.error_message
          : 'Could not start checkout. Please try again in a moment.';
      res.status(502).json({ error: userError });
      return;
    }

    res.status(200).json({ checkoutUrl: data.url });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
