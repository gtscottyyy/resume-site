import { useState, useRef, useEffect } from "react";
import { useFetcher } from "@remix-run/react";

const PROMPTS = [
  "who are you?",
  "your email?",
  "what's on your mind?",
  "send it? [y/n]",
];

interface TerminalEntry {
  prompt: string;
  value: string;
}

export default function TerminalContact() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [done, setDone] = useState<"sent" | "cancelled" | "error" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher<{ ok: boolean }>();
  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (!done) inputRef.current?.focus();
  }, [step, done]);

  useEffect(() => {
    const data = fetcher.data;
    if (!data) return;
    if (data.ok) setDone("sent");
    else setDone("error");
  }, [fetcher.data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const val = input.trim();
    if (!val) return;

    if (step < 3) {
      setHistory((h) => [...h, { prompt: PROMPTS[step], value: val }]);
      setInput("");
      setStep((s) => s + 1);
    } else {
      const answer = val.toLowerCase();
      setHistory((h) => [...h, { prompt: PROMPTS[3], value: val }]);
      setInput("");
      if (answer === "n" || answer === "no") {
        setDone("cancelled");
        return;
      }
      if (answer !== "y" && answer !== "yes") return;
      const [name, email, message] = history.map((h) => h.value);
      fetcher.submit(
        { name, email, message },
        { method: "post", action: "/contact" }
      );
    }
  };

  const reset = () => {
    setStep(0);
    setInput("");
    setHistory([]);
    setDone(null);
  };

  return (
    <div className="terminal">
      <div className="terminal-titlebar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-filename">contact.sh</span>
      </div>
      <div
        className="terminal-body"
        onClick={() => !done && inputRef.current?.focus()}
      >
        {/* honeypot — bots fill this, humans don't */}
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: "none" }}
          autoComplete="off"
        />

        {history.map((entry, i) => (
          <div key={i} className="terminal-entry dim">
            <div className="terminal-row">
              <span className="terminal-arrow">›</span>
              <span>{entry.prompt}</span>
            </div>
            <div className="terminal-row terminal-response">
              <span className="terminal-underscore">_</span>
              <span>{entry.value}</span>
            </div>
          </div>
        ))}

        {done === "sent" && (
          <p className="terminal-result success">✓ sent. i'll be in touch.</p>
        )}

        {done === "cancelled" && (
          <p className="terminal-result cancelled">
            ok, maybe next time.{" "}
            <button className="terminal-reset" onClick={reset}>
              start over?
            </button>
          </p>
        )}

        {done === "error" && (
          <p className="terminal-result error">
            ✗ something went wrong.{" "}
            <button className="terminal-reset" onClick={reset}>
              try again?
            </button>
          </p>
        )}

        {!done && (
          <div className="terminal-entry">
            <div className="terminal-row">
              <span className="terminal-arrow">›</span>
              <span>{PROMPTS[step]}</span>
            </div>
            <div className="terminal-row terminal-response">
              <span className="terminal-underscore">_</span>
              <input
                ref={inputRef}
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSubmitting}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
