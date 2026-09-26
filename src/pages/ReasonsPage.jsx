import { useState } from "react";
import { motion } from "framer-motion";
import content from "../data/content";

export default function ReasonsPage({ onNext }) {
  const [flipped, setFlipped] = useState(() => new Set());
  const reasons = content.reasons;
  const allFlipped = flipped.size === reasons.length;

  const toggle = (i) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20"
    >
      <p className="mb-3 font-body text-xs uppercase tracking-[0.28em] text-rose/80">a few things worth keeping</p>
      <h2 className="mb-2 text-center font-display text-3xl font-medium text-plum sm:text-4xl">
        {content.reasonsHeading}
      </h2>
      <p className="mb-10 text-center font-body text-sm text-plum/50">
        Tap each card to flip it
      </p>

      <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
        {reasons.map((reason, i) => (
          <FlipCard
            key={i}
            index={i}
            reason={reason}
            isFlipped={flipped.has(i)}
            onFlip={() => toggle(i)}
          />
        ))}
      </div>

      {allFlipped && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="mt-12 rounded-full bg-rose px-8 py-3 font-body text-sm font-medium
                     text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark"
        >
          Continue
        </motion.button>
      )}
    </motion.div>
  );
}

function FlipCard({ index, reason, isFlipped, onFlip }) {
  return (
    <button
      onClick={onFlip}
      aria-label={`Reason ${index + 1}`}
      className="h-32 w-28 [perspective:1000px] focus:outline-none sm:h-36 sm:w-32"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* front */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br
                     from-rose to-rose-dark shadow-md [backface-visibility:hidden]"
        >
          <span className="font-display text-2xl text-white/90">{index + 1}</span>
        </div>
        {/* back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-rose/20
                     border border-white/10 bg-surface p-3 shadow-xl shadow-black/30 [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-body text-[11px] leading-snug text-plum/85 sm:text-xs">{reason}</p>
        </div>
      </motion.div>
    </button>
  );
}
