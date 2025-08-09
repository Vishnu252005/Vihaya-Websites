// Vercel Serverless Function: Fetch recent LinkedIn posts
// Requires environment variables: LINKEDIN_ACCESS_TOKEN and LINKEDIN_ORGANIZATION_ID or LINKEDIN_PERSON_URN
// Note: LinkedIn API access depends on your app permissions. If access is unavailable, we return an empty feed.

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
    const personUrn = process.env.LINKEDIN_PERSON_URN; // e.g., urn:li:person:XXXXX

    if (!accessToken) {
      return res.status(200).json({ items: [], message: 'LINKEDIN_ACCESS_TOKEN not configured' });
    }

    // Build the UGC posts endpoint
    const author = organizationId ? `urn:li:organization:${organizationId}` : personUrn;
    if (!author) {
      return res.status(200).json({ items: [], message: 'LINKEDIN_ORGANIZATION_ID or LINKEDIN_PERSON_URN not configured' });
    }

    const limit = parseInt((req.query.limit as string) || '9', 10);
    const endpoint = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodeURIComponent(
      author
    )})&count=${limit}`;

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ items: [], error: text });
    }

    const json = await response.json();
    const elements = json.elements || [];

    const items = elements.map((el: any) => {
      const shareContent = el.specificContent?.['com.linkedin.ugc.ShareContent'];
      const text = shareContent?.shareCommentary?.text || '';
      const media = shareContent?.media || [];
      const firstMedia = media[0];
      const mediaUrl = firstMedia?.media || undefined;
      return {
        id: el.id,
        platform: 'linkedin',
        text,
        mediaUrl,
        permalink: `https://www.linkedin.com/feed/update/${encodeURIComponent(el.id)}`,
        timestamp: el.created?.time,
        username: author
      };
    });

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=300');
    return res.status(200).json({ items });
  } catch (error: any) {
    return res.status(500).json({ items: [], error: error?.message || 'Unknown error' });
  }
}

