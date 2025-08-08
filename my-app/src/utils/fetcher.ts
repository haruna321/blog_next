export const publicFetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('APIリクエストに失敗しました');
  return res.json();
};

export const createAuthenticatedFetcher = (token: string | null) => {
  return async (url: string) => {
    if (!token) throw new Error('認証トークンがありません');
    const res = await fetch(url, { headers: { Authorization: token } });
    if (!res.ok) throw new Error('APIリクエストに失敗しました');
    return res.json();
  };
};