export type SocialPlatform = 'instagram' | 'linkedin';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  text?: string;
  mediaUrl?: string;
  permalink: string;
  timestamp?: string | number;
  username?: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchInstagramPosts(limit = 9): Promise<SocialPost[]> {
  try {
    const data = await fetchJson<{ items: SocialPost[] }>(`/api/social/instagram?limit=${limit}`);
    return data.items || [];
  } catch (e) {
    return [];
  }
}

export async function fetchLinkedInPosts(limit = 9): Promise<SocialPost[]> {
  try {
    const data = await fetchJson<{ items: SocialPost[] }>(`/api/social/linkedin?limit=${limit}`);
    return data.items || [];
  } catch (e) {
    return [];
  }
}

export async function fetchAllSocialPosts(limitPerPlatform = 9): Promise<SocialPost[]> {
  const [ig, li] = await Promise.all([
    fetchInstagramPosts(limitPerPlatform),
    fetchLinkedInPosts(limitPerPlatform)
  ]);
  const all = [...ig, ...li];
  return all.sort((a, b) => {
    const ta = typeof a.timestamp === 'string' ? Date.parse(a.timestamp) : Number(a.timestamp || 0);
    const tb = typeof b.timestamp === 'string' ? Date.parse(b.timestamp) : Number(b.timestamp || 0);
    return tb - ta;
  });
}

