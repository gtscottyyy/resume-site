import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import type { SpotifyTrack } from "~/utils/spotify.server";

export default function SpotifyWidget() {
  const fetcher = useFetcher<{ track: SpotifyTrack | null }>();

  useEffect(() => {
    fetcher.load("/api/spotify");
    const id = setInterval(() => fetcher.load("/api/spotify"), 30_000);
    return () => clearInterval(id);
  // fetcher.load is stable — intentional empty-ish dep
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const track = fetcher.data?.track;
  if (!track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="spotify-widget"
    >
      {track.albumArt && (
        <img src={track.albumArt} alt={track.name} className="spotify-art" />
      )}
      <div className="spotify-text">
        <span className="spotify-track">{track.name}</span>
        <span className="spotify-artist">{track.artist}</span>
        <div className="spotify-status">
          <span className={`spotify-dot${track.isPlaying ? " playing" : ""}`} />
          <span>{track.isPlaying ? "listening now" : "last played"}</span>
        </div>
      </div>
    </a>
  );
}
