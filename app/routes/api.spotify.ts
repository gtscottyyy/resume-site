import { json } from "@remix-run/node";
import { getNowPlaying } from "~/utils/spotify.server";

export async function loader() {
  const track = await getNowPlaying();
  return json({ track });
}
