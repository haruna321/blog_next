export const createAuthenticatedFetcher = (token: string | null) => {
  return async (url: string) => {
    if (!token) {
      throw new Error('認証トークンがありません')
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': token
      }
    })

    if (!response.ok) {
      throw new Error('APIリクエストに失敗しました')
    }

    return response.json()
  }
}