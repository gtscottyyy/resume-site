import { useEffect, useRef, useCallback } from "react";

const CELL = 20;
const COLS = 26;
const ROWS = 20;

const C_BG = "#0D1823";
const C_SNAKE = "#34e397";
const C_FOOD = "#ffffff";
const C_GRID = "rgba(52, 227, 151, 0.04)";
const SPEED = 110;

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Pt = { x: number; y: number };

const OPPOSITE: Record<Dir, Dir> = {
  UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT",
};

const KEY_MAP: Record<string, Dir> = {
  ArrowUp: "UP", w: "UP", W: "UP",
  ArrowDown: "DOWN", s: "DOWN", S: "DOWN",
  ArrowLeft: "LEFT", a: "LEFT", A: "LEFT",
  ArrowRight: "RIGHT", d: "RIGHT", D: "RIGHT",
};

function randomFood(snake: Pt[]): Pt {
  let pt: Pt;
  do {
    pt = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === pt.x && s.y === pt.y));
  return pt;
}

function initialState() {
  const snake: Pt[] = [{ x: 13, y: 10 }, { x: 12, y: 10 }, { x: 11, y: 10 }];
  return { snake, dir: "RIGHT" as Dir, nextDir: "RIGHT" as Dir, food: randomFood(snake), score: 0, over: false };
}

export default function SnakeGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(initialState());

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { snake, food, score, over } = stateRef.current;
    const W = COLS * CELL;
    const H = ROWS * CELL;

    // Background
    ctx.fillStyle = C_BG;
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = C_GRID;
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke();
    }

    // Snake
    snake.forEach((seg, i) => {
      const alpha = Math.max(0.2, 1 - i * 0.04);
      ctx.fillStyle = i === 0 ? C_SNAKE : `rgba(52, 227, 151, ${alpha})`;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, i === 0 ? 3 : 2);
      ctx.fill();
    });

    // Food — pulsing dot
    ctx.fillStyle = C_FOOD;
    ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Score
    ctx.fillStyle = C_SNAKE;
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`score: ${score}`, 8, 16);

    // Game over screen
    if (over) {
      ctx.fillStyle = "rgba(13, 24, 35, 0.72)";
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = C_SNAKE;
      ctx.textAlign = "center";
      ctx.font = "bold 22px 'JetBrains Mono', monospace";
      ctx.fillText("game over", W / 2, H / 2 - 20);

      ctx.font = "13px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(160,160,160,0.8)";
      ctx.fillText(`score: ${score}`, W / 2, H / 2 + 8);
      ctx.fillText("press r to restart  ·  esc to exit", W / 2, H / 2 + 30);
      ctx.textAlign = "left";
    }
  }, []);

  const step = useCallback(() => {
    const g = stateRef.current;
    if (g.over) return;

    g.dir = g.nextDir;
    const head = g.snake[0];
    const next: Pt = {
      x: head.x + (g.dir === "RIGHT" ? 1 : g.dir === "LEFT" ? -1 : 0),
      y: head.y + (g.dir === "DOWN" ? 1 : g.dir === "UP" ? -1 : 0),
    };

    if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS || g.snake.some((s) => s.x === next.x && s.y === next.y)) {
      g.over = true;
      draw();
      return;
    }

    g.snake.unshift(next);
    if (next.x === g.food.x && next.y === g.food.y) {
      g.score += 10;
      g.food = randomFood(g.snake);
    } else {
      g.snake.pop();
    }
    draw();
  }, [draw]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "r" || e.key === "R") {
        stateRef.current = initialState();
        draw();
        return;
      }
      const next = KEY_MAP[e.key];
      if (next && next !== OPPOSITE[stateRef.current.dir]) {
        stateRef.current.nextDir = next;
      }
      // Prevent arrow keys from scrolling the page
      if (e.key.startsWith("Arrow")) e.preventDefault();
    };

    draw();
    const id = setInterval(step, SPEED);
    window.addEventListener("keydown", handleKey);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", handleKey);
    };
  }, [step, draw, onClose]);

  return (
    <div
      className="game-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="game-container">
        <div className="game-header">
          <span className="game-title">// snake.exe</span>
          <span className="game-hint">wasd / arrow keys · r restart · esc exit</span>
        </div>
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="game-canvas"
        />
      </div>
    </div>
  );
}
