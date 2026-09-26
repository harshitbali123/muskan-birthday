import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import content from "../data/content";

const BALLOON_COLORS = ["#ff5c8a", "#f5c76b", "#b99be8", "#ff9fbe"];

export default function CakePage({ onNext }) {
  const [blownOut, setBlownOut] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const handleBlow = () => {
    if (blownOut) return;
    setBlownOut(true);

    confetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 45,
      origin: { y: 0.55 },
      colors: ["#ff5c8a", "#f5c76b", "#b99be8", "#ff9fbe", "#ffffff"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.6 },
        colors: ["#ff5c8a", "#f5c76b"],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.6 },
        colors: ["#b99be8", "#ff9fbe"],
      });
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/10 blur-3xl" />
      {/* Rising balloons, appear once candles are blown */}
      {blownOut && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "20vh", opacity: 0 }}
              animate={{ y: "-120vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5 + (i % 3), delay: i * 0.15, ease: "easeIn" }}
              className="absolute bottom-0"
              style={{ left: `${8 + i * 11}%` }}
            >
              <Balloon color={BALLOON_COLORS[i % BALLOON_COLORS.length]} />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!ready && !blownOut ? (
          <motion.div
            key="cakePrelude"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-[25rem] flex-col items-center justify-center"
          >
            <span className="font-hand text-4xl text-gold">A little moment for you...</span>
            <span className="mt-3 font-body text-xs uppercase tracking-[0.3em] text-rose/70">close your eyes and wish</span>
          </motion.div>
        ) : (
          <motion.div
            key="cakeReveal"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative max-w-xl font-display text-3xl font-medium leading-tight text-plum sm:text-4xl"
            >
              {blownOut ? "Wish made. Let's see it come true." : content.wishPrompt}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="relative mt-3 font-body text-xs uppercase tracking-[0.28em] text-rose/80"
            >
              a little sweetness for you
            </motion.p>

            <button
              onClick={handleBlow}
              aria-label="Blow out the candles"
              className="group relative mt-8 rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-5 py-4 shadow-2xl shadow-rose/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rose/60 sm:px-10 sm:py-6"
            >
              <Cake blownOut={blownOut} />
            </button>

            <p className="relative mt-6 font-body text-sm text-plum/50">
              {blownOut ? "" : content.cakeSubtext}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {blownOut && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="mt-8 rounded-full bg-rose px-8 py-3 font-body text-sm font-medium
                       text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark"
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Cake({ blownOut }) {
  const candleXs = [104, 132, 160, 188, 216];

  return (
    <svg width="320" height="260" viewBox="0 0 320 260" className="relative drop-shadow-[0_20px_28px_rgba(255,92,138,0.25)]">
      <defs>
        <linearGradient id="cakeBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc0d6" />
          <stop offset="0.48" stopColor="#ec709d" />
          <stop offset="1" stopColor="#b83d72" />
        </linearGradient>
        <filter id="cakeGlow"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>

      {/* plate and soft shadow */}
      <ellipse cx="160" cy="230" rx="132" ry="14" fill="#7c3b67" opacity="0.5" />
      <ellipse cx="160" cy="220" rx="122" ry="18" fill="#ef91b6" />
      <ellipse cx="160" cy="216" rx="112" ry="12" fill="#ffe5ef" />

      {/* simple single-layer cake */}
      <rect x="52" y="126" width="216" height="84" rx="16" fill="url(#cakeBase)" />
      <rect x="52" y="126" width="216" height="22" rx="11" fill="#ffb6d0" />
      <path d="M52 145 Q66 132 80 145 T108 145 T136 145 T164 145 T192 145 T220 145 T248 145 T268 145"
        fill="none" stroke="#fff0f6" strokeWidth="13" strokeLinecap="round" />
      <path d="M70 177 Q84 190 98 177 T126 177 T154 177 T182 177 T210 177 T238 177 T250 177"
        fill="none" stroke="#ad3d71" strokeWidth="5" opacity="0.65" />
      <path d="M72 199 Q86 188 100 199 T128 199 T156 199 T184 199 T212 199 T240 199"
        fill="none" stroke="#f58caf" strokeWidth="4" opacity="0.8" />

      {/* candle glow */}
      {!blownOut && <ellipse cx="160" cy="92" rx="86" ry="36" fill="#ff5c8a" opacity="0.12" filter="url(#cakeGlow)" />}
      {candleXs.map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y="86" width="8" height="34" rx="3" fill={i % 2 ? "#f5c76b" : "#b99be8"} />
          {!blownOut ? (
            <g className="origin-bottom animate-flicker" style={{ transformOrigin: `${x}px 86px` }}>
              <path d={`M${x} 66 C ${x + 7} 72, ${x + 7} 79, ${x} 84 C ${x - 7} 79, ${x - 7} 72, ${x} 66 Z`} fill="#ff5c8a" />
              <path d={`M${x} 71 C ${x + 3} 75, ${x + 3} 81, ${x} 84 C ${x - 3} 81, ${x - 3} 75, ${x} 71 Z`} fill="#fff0ae" />
            </g>
          ) : (
            <SmokeWisp x={x} />
          )}
        </g>
      ))}

      {/* sugar pearls */}
      {[96, 120, 200, 224].map((x) => <circle key={x} cx={x} cy="151" r="3.5" fill="#fff3f7" />)}
    </svg>
  );
}

function SmokeWisp({ x }) {
  return (
    <motion.path
      d={`M${x} 55 C ${x + 4} 45, ${x - 4} 35, ${x} 25`}
      stroke="#d9b9d0"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      initial={{ opacity: 0.8, pathLength: 0, y: 0 }}
      animate={{ opacity: 0, pathLength: 1, y: -20 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
    />
  );
}

function Balloon({ color }) {
  return (
    <svg width="46" height="70" viewBox="0 0 46 70">
      <ellipse cx="23" cy="26" rx="22" ry="26" fill={color} opacity="0.9" />
      <path d="M23 52 Q26 60 23 70 Q20 60 23 52" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}
