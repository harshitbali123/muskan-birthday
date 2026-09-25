import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/content";

const TAPS_NEEDED = 3;

export default function GiftPage({ onNext }) {
  const [taps, setTaps] = useState(0);
  const [opened, setOpened] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleTap = () => {
    if (opened) return;
    const next = taps + 1;
    setTaps(next);
    if (next >= TAPS_NEEDED) {
      setTimeout(() => setOpened(true), 350);
    }
  };

  const photos = content.photos;
  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % photos.length);
  const prevPhoto = () => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center"
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="box"
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <h2 className="mb-2 font-display text-3xl font-medium text-plum sm:text-4xl">
              {content.giftPrompt}
            </h2>
            <p className="mb-10 font-body text-sm text-plum/50">
              Tap it {TAPS_NEEDED - taps} more time{TAPS_NEEDED - taps === 1 ? "" : "s"}
            </p>

            <button onClick={handleTap} aria-label="Unwrap gift" className="relative focus:outline-none">
              <GiftBox taps={taps} />
              {/* particle burst on each tap */}
              <AnimatePresence>
                {taps > 0 && <TapBurst key={taps} />}
              </AnimatePresence>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex w-full max-w-md flex-col items-center"
          >
            <h2 className="mb-4 font-display text-2xl font-medium text-plum sm:text-3xl">
              A little note
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-plum/80">
              {content.birthdayNote}
            </p>

            {/* Polaroid carousel */}
            <div className="relative flex items-center justify-center">
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute -left-10 z-10 text-rose/70 hover:text-rose sm:-left-14"
              >
                <ArrowIcon direction="left" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={photoIndex}
                  initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -2, scale: 1 }}
                  exit={{ opacity: 0, rotate: 6, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-56 rounded-sm border border-white/10 bg-surface p-3 pb-8 shadow-2xl shadow-black/40"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-blush/60">
                    <img
                      src={photos[photoIndex].src}
                      alt={photos[photoIndex].caption}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <p className="mt-3 font-display text-sm text-plum/75">
                    {photos[photoIndex].caption}
                  </p>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute -right-10 z-10 text-rose/70 hover:text-rose sm:-right-14"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            <div className="mt-4 flex gap-1.5">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === photoIndex ? "bg-rose" : "bg-rose/25"}`}
                />
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="mt-10 rounded-full bg-rose px-8 py-3 font-body text-sm font-medium
                         text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GiftBox({ taps }) {
  // ribbon tears progressively with each tap; box "pops" on the final tap
  const ribbonOffset = taps * 14;
  return (
    <motion.svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      animate={taps > 0 ? { scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] } : {}}
      transition={{ duration: 0.35 }}
    >
      <rect x="30" y="80" width="120" height="80" rx="8" fill="#c84f7a" />
      <rect x="30" y="80" width="120" height="80" rx="8" fill="url(#giftShade)" />
      <rect x="20" y="55" width="140" height="30" rx="6" fill="#ff5c8a" />

      {/* vertical ribbon, splits apart as taps increase */}
      <rect x={82 - ribbonOffset / 2} y="55" width="16" height="105" fill="#FCE29B" opacity={taps >= 3 ? 0 : 1} />

      {/* bow */}
      <g opacity={taps >= 3 ? 0 : 1}>
        <circle cx="70" cy="50" r="16" fill="#FCE29B" />
        <circle cx="110" cy="50" r="16" fill="#FCE29B" />
        <circle cx="90" cy="50" r="10" fill="#D8A857" />
      </g>

      <defs>
        <linearGradient id="giftShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.05" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

function TapBurst() {
  const particles = Array.from({ length: 10 });
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const dist = 60;
        return (
          <motion.span
            key={i}
            initial={{ x: 90, y: 90, opacity: 1, scale: 1 }}
            animate={{
              x: 90 + Math.cos(angle) * dist,
              y: 90 + Math.sin(angle) * dist,
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute h-2 w-2 rounded-full bg-gold"
          />
        );
      })}
    </div>
  );
}

function ArrowIcon({ direction }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
