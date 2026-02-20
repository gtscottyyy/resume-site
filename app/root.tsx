import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { connectToDatabase } from "~/utils/db.server";
import tokensHref from "~/styles/tokens.css";
import spotifyHref from "~/styles/spotify.css";
import terminalHref from "~/styles/terminaloverlay.css";
import SpotifyWidget from "~/components/spotifywidget";
import TerminalOverlay from "~/components/terminaloverlay";
import SnakeGame from "~/components/snakegame";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  { rel: "stylesheet", href: tokensHref },
  { rel: "stylesheet", href: spotifyHref },
  { rel: "stylesheet", href: terminalHref },
];

export async function loader() {
  const { copy } = await connectToDatabase();
  return json({
    headshot_url: (copy as any)?.headshot_url ?? "",
    home_title: (copy as any)?.home_title ?? "",
    home_subtitle: (copy as any)?.home_subtitle ?? "",
    about_body: (copy as any)?.about_body ?? "",
  });
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const konamiRef = useRef<string[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-js", "true");
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // ctrl+shift+y toggles terminal
      if (e.ctrlKey && e.shiftKey && e.code === "KeyY") {
        e.preventDefault();
        setShowGame(false);
        setShowTerminal((prev) => !prev);
        return;
      }

      // Track konami code sequence
      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length);
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        konamiRef.current = [];
        setShowTerminal(false);
        setShowGame((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <SpotifyWidget />
        {showTerminal && (
          <TerminalOverlay onClose={() => setShowTerminal(false)} />
        )}
        {showGame && <SnakeGame onClose={() => setShowGame(false)} />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
