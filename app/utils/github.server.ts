interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    ref?: string;
    commits?: Array<{ message: string; sha: string }>;
  };
}

export interface ActivityItem {
  repo: string;
  branch: string;
  message: string;
  createdAt: string;
}

const GITHUB_USERNAME = "gtscottyyy";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

let cache: { data: ActivityItem[]; ts: number } | null = null;

export async function getGitHubActivity(): Promise<ActivityItem[]> {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "scotty-henry-portfolio",
        },
      }
    );

    if (!res.ok) return cache?.data ?? [];

    const events: GitHubEvent[] = await res.json();

    const data = events
      .filter((e) => e.type === "PushEvent" && e.payload.commits?.length)
      .slice(0, 6)
      .map((e) => ({
        repo: e.repo.name.replace(`${GITHUB_USERNAME}/`, ""),
        branch: (e.payload.ref ?? "refs/heads/main").replace(
          "refs/heads/",
          ""
        ),
        message: e.payload.commits![0].message.split("\n")[0],
        createdAt: e.created_at,
      }));

    cache = { data, ts: Date.now() };
    return data;
  } catch {
    return cache?.data ?? [];
  }
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
