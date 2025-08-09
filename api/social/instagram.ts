// Vercel Serverless Function: Fetch recent Instagram posts via Instagram Basic Display API
// Requires environment variable: INSTAGRAM_ACCESS_TOKEN

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(200).json({ items: [], message: 'INSTAGRAM_ACCESS_TOKEN not configured' });
    }

    const limit = parseInt((req.query.limit as string) || '9', 10);
    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'permalink',
      'thumbnail_url',
      'timestamp',
      'username'
    ].join(',');

    const endpoint = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ items: [], error: text });
    }
    const json = await response.json();

    const items = (json.data || []).map((p: any) => ({
      id: p.id,
      platform: 'instagram',
      text: p.caption,
      mediaUrl: p.media_url || p.thumbnail_url,
      permalink: p.permalink,
      timestamp: p.timestamp,
      username: p.username
    }));

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=300');
    return res.status(200).json({ items });
  } catch (error: any) {
    return res.status(500).json({ items: [], error: error?.message || 'Unknown error' });
  }
}

