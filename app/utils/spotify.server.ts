export interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) throw new Error("Failed to refresh Spotify access token");

  const data = await res.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return tokenCache.token;
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  try {
    const token = await getAccessToken();

    const cpRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (cpRes.status === 200) {
      const data = await cpRes.json();
      if (data?.item && data.currently_playing_type === "track") {
        return {
          name: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
          albumArt: data.item.album.images.at(-1)?.url ?? "",
          url: data.item.external_urls.spotify,
          isPlaying: data.is_playing,
        };
      }
    }

    const rpRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (rpRes.ok) {
      const data = await rpRes.json();
      const item = data.items?.[0]?.track;
      if (item) {
        return {
          name: item.name,
          artist: item.artists.map((a: { name: string }) => a.name).join(", "),
          albumArt: item.album.images.at(-1)?.url ?? "",
          url: item.external_urls.spotify,
          isPlaying: false,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}
