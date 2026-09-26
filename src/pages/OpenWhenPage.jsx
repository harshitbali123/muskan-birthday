import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/content";

export default function OpenWhenPage({ onNext }) {
  const [opened, setOpened] = useState(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-body text-xs uppercase tracking-[0.28em] text-rose/80">a few little envelopes</p>
      <h2 className="mt-3 font-display text-4xl text-plum sm:text-5xl">Open when you need it</h2>
      <p className="mt-3 max-w-md font-body text-sm text-plum/65">Pick one. No pressure, birthday girl.</p>
      <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {content.openWhen.map((item, index) => (
          <button key={item.title} onClick={() => setOpened(index)}
            className="group relative overflow-hidden rounded-2xl border border-rose/20 bg-gradient-to-br from-rose/15 to-surface p-6 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-rose/50">
            <span className="absolute -right-3 -top-5 rotate-12 text-7xl opacity-10">✉</span>
            <span className="font-hand text-3xl text-gold">For you</span>
            <h3 className="relative mt-2 font-display text-xl text-plum">{item.title}</h3>
            <span className="relative mt-4 inline-block font-body text-[10px] uppercase tracking-[0.2em] text-rose/70">tap to open</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {opened !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpened(null)}>
            <motion.div initial={{ y: 25, scale: 0.94, rotate: -2 }} animate={{ y: 0, scale: 1, rotate: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-gold/30 bg-[#21172b] p-8 text-left shadow-2xl shadow-black/50"
              onClick={(event) => event.stopPropagation()}>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-rose/80">a note for this exact moment</p>
              <h3 className="mt-3 font-display text-2xl text-plum">{content.openWhen[opened].title}</h3>
              <p className="mt-6 font-hand text-3xl leading-snug text-gold">{content.openWhen[opened].message}</p>
              <button onClick={() => setOpened(null)} className="mt-7 rounded-full border border-rose/30 px-5 py-2 font-body text-xs text-plum/80 hover:bg-rose/10">Close the note</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={onNext} className="mt-10 rounded-full bg-rose px-8 py-3 font-body text-sm text-white shadow-lg shadow-rose/30 hover:bg-rose-dark">Try something silly</button>
    </motion.div>
  );
}
