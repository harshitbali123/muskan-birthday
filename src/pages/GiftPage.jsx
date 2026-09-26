import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/content";

const TAPS_NEEDED = 3;

export default function GiftPage({ onNext }) {
  const [taps, setTaps] = useState(0);
  const [opened, setOpened] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewedPhotos, setViewedPhotos] = useState(() => new Set());

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
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-16"
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
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex w-full flex-col items-center"
          >
            <p className="font-body text-xs uppercase tracking-[0.28em] text-rose/80">
              {content.memoryWall.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium text-plum sm:text-5xl">
              {content.memoryWall.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-plum/65 sm:text-base">
              {content.memoryWall.intro}
            </p>
            <p className="mt-4 font-hand text-2xl text-gold/90">{content.memoryWall.note}</p>
            <div className="mb-8 mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
              {photos.map((photo, index) => (
                <motion.button
                  key={photo.src}
                  initial={{ opacity: 0, y: 22, rotate: index % 2 ? 1.5 : -1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: index % 2 ? 1.5 : -1.5 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -6, rotate: 0 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setPhotoIndex(index); setSelectedPhoto(index); setViewedPhotos((current) => new Set(current).add(index)); }}
                  className={`group relative aspect-square overflow-hidden rounded-[1.35rem] border bg-surface p-1.5 shadow-xl shadow-black/25 transition ${index === photoIndex ? "border-rose shadow-rose/20" : "border-white/10 opacity-90 hover:opacity-100"}`}
                >
                  <span className="absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/45 font-body text-[10px] text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative block h-full w-full overflow-hidden rounded-[0.9rem]">
                    <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  </span>
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {selectedPhoto !== null && (
              <motion.div
                key={photos[selectedPhoto].src}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-6 py-8 backdrop-blur-sm"
                onClick={() => setSelectedPhoto(null)}
              >
                <motion.div
                  initial={{ scale: 0.94, rotate: -2 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-full max-w-sm rounded-3xl border border-gold/30 bg-[#21172b] p-4 shadow-2xl shadow-black/60"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={photos[selectedPhoto].src}
                      alt={photos[selectedPhoto].caption}
                      className="max-h-[60vh] w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 font-hand text-3xl leading-tight text-gold">
                    {photos[selectedPhoto].caption}
                  </p>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="mt-4 rounded-full border border-rose/30 px-5 py-2 font-body text-xs text-plum/80 transition hover:bg-rose/10"
                  >
                    Close memory
                  </button>
                </motion.div>
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
              disabled={viewedPhotos.size < photos.length}
              className="mt-10 rounded-full bg-rose px-8 py-3 font-body text-sm font-medium
                         text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark
                         disabled:cursor-not-allowed disabled:opacity-40"
            >
              {viewedPhotos.size < photos.length ? `Open all ${photos.length} memories` : "Continue"}
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
