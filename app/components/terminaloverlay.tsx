import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useFetcher, useRouteLoaderData } from "@remix-run/react";

interface Line {
  type: "input" | "output" | "error" | "system";
  text: string;
}

interface RootData {
  home_title: string;
  home_subtitle: string;
  about_body: string;
}

const WELCOME: Line[] = [
  { type: "system", text: "scotty-henry.sh — interactive terminal" },
  { type: "system", text: "type 'help' for available commands." },
  { type: "system", text: "" },
];

const HELP_LINES = [
  "  ls                   list site sections",
  "  whoami               about scotty",
  "  cat [file]           about · experience · contact",
  "  cd [path]            navigate to a section",
  "  ask [question]       ask the AI anything about scotty",
  "  clear                clear the terminal",
  "  exit                 close",
  "",
];

export default function TerminalOverlay({ onClose }: { onClose: () => void }) {
  const root = useRouteLoaderData("root") as RootData | undefined;
  const navigate = useNavigate();
  const fetcher = useFetcher<{ answer: string }>();

  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, isAsking]);

  // Handle AI response coming back
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && isAsking) {
      const answer = fetcher.data.answer;
      setLines((prev) => [
        ...prev,
        { type: "output", text: answer },
        { type: "output", text: "" },
      ]);
      setIsAsking(false);
    }
  }, [fetcher.state, fetcher.data, isAsking]);

  const push = useCallback(
    (texts: string[], type: Line["type"] = "output") => {
      setLines((prev) => [
        ...prev,
        ...texts.map((text) => ({ type, text })),
      ]);
    },
    []
  );

  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      setLines((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);

      const parts = cmd.split(/\s+/);
      const command = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ");

      switch (command) {
        case "help":
          push(HELP_LINES);
          break;

        case "ls":
          push([
            "  /             home",
            "  /about        about scotty",
            "  /experience   work history",
            "  /contact      get in touch",
            "",
          ]);
          break;

        case "whoami":
          push([
            `  ${root?.home_title ?? "Scotty Henry"}`,
            `  ${root?.home_subtitle ?? "Software Developer"}`,
            "  6+ years across native iOS, React Native, and full-stack web.",
            "  based in Cincinnati, OH.",
            "",
          ]);
          break;

        case "cat": {
          const file = arg.replace(/\.(txt|sh|md)$/, "").toLowerCase();
          if (!file) {
            push(["  usage: cat [about|experience|contact]", ""], "error");
          } else if (file === "about") {
            push([root?.about_body ?? "no content available.", ""]);
          } else if (file === "experience") {
            push([
              "  6+ years across fintech, healthcare, AI/LLM, e-commerce,",
              "  and enterprise SaaS. native iOS, React Native, React,",
              "  and full-stack.",
              "",
              "  → run 'cd /experience' to see the full timeline.",
              "",
            ]);
          } else if (file === "contact") {
            push([
              "  → linkedin.com/in/scottyhenry",
              "  → run 'cd /contact' to send a message.",
              "",
            ]);
          } else {
            push([`  cat: ${arg}: no such file`, ""], "error");
          }
          break;
        }

        case "cd": {
          const dest =
            arg === "/" || arg === "~" || arg === "home"
              ? "/"
              : arg.startsWith("/")
              ? arg
              : `/${arg}`;

          const valid: Record<string, string> = {
            "/": "/",
            "/about": "/about",
            "/experience": "/experience",
            "/contact": "/contact",
          };

          if (valid[dest]) {
            push([`  → ${dest}`, ""]);
            setTimeout(() => {
              navigate(dest);
              onClose();
            }, 350);
          } else {
            push([`  cd: ${arg}: no such directory`, ""], "error");
          }
          break;
        }

        case "ask": {
          if (!arg) {
            push(["  usage: ask [your question about scotty]", ""], "error");
            break;
          }
          setIsAsking(true);
          fetcher.load(`/api/ask?q=${encodeURIComponent(arg)}`);
          break;
        }

        case "clear":
          setLines([]);
          break;

        case "exit":
        case "quit":
        case "q":
          onClose();
          break;

        default:
          push(
            [`  command not found: ${command}. try 'help'.`, ""],
            "error"
          );
      }
    },
    [root, navigate, onClose, push, fetcher]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="t-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="t-window">
        <div className="t-titlebar">
          <span
            className="terminal-dot dot-red"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
          <span className="t-title">scotty-henry.sh</span>
          <span className="t-hint">ctrl+shift+y to toggle</span>
        </div>

        <div
          className="t-body"
          onClick={() => !isAsking && inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className={`t-line t-line-${line.type}`}>
              {line.text}
            </div>
          ))}

          {isAsking && (
            <div className="t-line t-line-output t-thinking">
              · thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="t-input-row">
          <span className="t-prompt">$</span>
          <input
            ref={inputRef}
            className="t-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            disabled={isAsking}
            placeholder={isAsking ? "" : "type a command..."}
          />
        </div>
      </div>
    </div>
  );
}
