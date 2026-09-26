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
            <h2 className="mb-2 font-display text-2xl font-medium text-plum sm:text-3xl">
              A little memory wall
            </h2>
            <p className="mb-5 font-body text-sm text-plum/55">A few little moments I never want to lose.</p>
            <p className="mb-8 font-body text-base leading-relaxed text-plum/80">
              {content.birthdayNote}
            </p>

            <div className="mb-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((photo, index) => (
                <button key={photo.src} onClick={() => setPhotoIndex(index)}
                  className={`group relative aspect-square overflow-hidden rounded-2xl border transition ${index === photoIndex ? "border-rose shadow-lg shadow-rose/20" : "border-white/10 opacity-80 hover:opacity-100"}`}>
                  <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-2 bottom-2 truncate text-left font-body text-[10px] text-white drop-shadow-md">{photo.caption}</span>
                </button>
              ))}
            </div>
            <AnimatePresence>
              {photoIndex !== null && (
              <motion.div
                key={photos[photoIndex].src}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-6 py-8 backdrop-blur-sm"
                onClick={() => setPhotoIndex(null)}
              >
                <motion.div
                  initial={{ scale: 0.94, rotate: -2 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-full max-w-sm rounded-3xl border border-gold/30 bg-[#21172b] p-4 shadow-2xl shadow-black/60"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={photos[photoIndex].src}
                      alt={photos[photoIndex].caption}
                      className="max-h-[60vh] w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 font-hand text-3xl leading-tight text-gold">
                    {photos[photoIndex].caption}
                  </p>
                  <button
                    onClick={() => setPhotoIndex(null)}
                    className="mt-4 rounded-full border border-rose/30 px-5 py-2 font-body text-xs text-plum/80 transition hover:bg-rose/10"
                  >
                    Close memory
                  </button>
                </motion.div>
              </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {photoIndex !== null && (
                <motion.div key={photoIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-center">
                  <>
                    <p className="font-display text-base text-plum">{photos[photoIndex].caption}</p>
                    <p className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-rose/70">memory {photoIndex + 1} of {photos.length}</p>
                  </>
                </motion.div>
              )}
            </AnimatePresence>

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
