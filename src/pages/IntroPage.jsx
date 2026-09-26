import { useState } from "react";
import { motion } from "framer-motion";
import content from "../data/content";

export default function IntroPage({ onNext }) {
  const [ready, setReady] = useState(false);
  const stars = Array.from({ length: 18 }, (_, index) => index);

  const begin = () => {
    window.dispatchEvent(new Event("birthday-start-audio"));
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star) => (
          <span key={star} className="absolute h-1 w-1 rounded-full bg-rose/60 shadow-[0_0_12px_rgba(255,92,138,0.8)]"
            style={{ left: `${(star * 47) % 100}%`, top: `${(star * 71) % 100}%`, opacity: 0.25 + (star % 4) * 0.15 }} />
        ))}
        <div className="absolute left-1/2 top-1/2 h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/10 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }} className="relative max-w-xl">
        <p className="font-body text-xs uppercase tracking-[0.35em] text-rose/80">a tiny universe, made for one person</p>
        <h1 className="mt-5 font-display text-5xl font-medium leading-[0.95] text-plum sm:text-7xl">
          Hey, <span className="italic text-rose">Muskan</span>...
        </h1>
        <p className="mx-auto mt-6 max-w-sm font-body text-base leading-relaxed text-plum/65">
          I made something for you. Seven years of friendship deserves more than a birthday text.
        </p>

        {!ready ? (
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setReady(true)}
            className="mt-10 rounded-full border border-rose/30 bg-surface/70 px-8 py-3 font-body text-sm text-plum shadow-xl shadow-black/20 backdrop-blur-sm hover:border-rose">
            Promise me you’ll stay till the end
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
            <p className="font-display text-xl italic text-gold">Good. This is all yours.</p>
            <button onClick={begin} className="mt-5 rounded-full bg-rose px-9 py-3 font-body text-sm font-medium text-white shadow-lg shadow-rose/30 hover:bg-rose-dark">
              Enter your birthday universe
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
