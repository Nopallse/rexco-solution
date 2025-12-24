// Utility helpers for Instagram links/media

export const getInstagramPostId = (link: string): string | null => {
  try {
    const match = link.match(/instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/);
    return match?.[2] || null;
  } catch {
    return null;
  }
};

export const getInstagramEmbedUrl = (link: string): string | null => {
  const postId = getInstagramPostId(link);
  return postId ? `https://www.instagram.com/p/${postId}/embed/captioned/` : null;
};

export const getInstagramMediaUrl = (link: string): string | null => {
  const postId = getInstagramPostId(link);
  return postId ? `https://instagram.com/p/${postId}/media/?size=m` : null;
};
