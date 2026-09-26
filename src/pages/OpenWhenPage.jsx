import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../data/content";

export default function OpenWhenPage({ onNext }) {
  const [opened, setOpened] = useState(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.15, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen flex-col items-center px-6 py-20 text-center">
      <div className="w-full max-w-3xl">
        <p className="font-body text-xs uppercase tracking-[0.28em] text-rose/80">little notes, for real moments</p>
        <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-plum sm:text-5xl">Open when you need it</h2>
        <p className="mx-auto mt-4 max-w-lg font-hand text-2xl leading-relaxed text-gold/90">For every version of you, on every kind of day.</p>
      </div>
      <div className="mt-10 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
        {content.openWhen.map((item, index) => (
          <button key={item.title} onClick={() => setOpened(index)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-6 text-left shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-rose/50 hover:bg-surface">
            <span className="pointer-events-none absolute -right-5 -top-7 rotate-12 font-hand text-8xl text-rose/10">✉</span>
            <span className="relative font-hand text-3xl text-gold">For you, Muskan</span>
            <h3 className="relative mt-3 font-display text-xl leading-snug text-plum">{item.title}</h3>
            <span className="relative mt-5 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-rose/75">
              open this note <span aria-hidden="true" className="text-base normal-case">↗</span>
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {opened !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpened(null)}>
            <motion.div initial={{ y: 25, scale: 0.94, rotate: -2 }} animate={{ y: 0, scale: 1, rotate: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-white/10 bg-surface p-8 text-left shadow-2xl shadow-black/50"
              onClick={(event) => event.stopPropagation()}>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-rose/80">a note for your heart</p>
              <h3 className="mt-3 font-display text-2xl text-plum">{content.openWhen[opened].title}</h3>
              <p className="mt-6 font-hand text-3xl leading-snug text-gold">{content.openWhen[opened].message}</p>
              <button onClick={() => setOpened(null)} className="mt-7 rounded-full border border-rose/30 px-5 py-2 font-body text-xs text-plum/80 transition hover:bg-rose/10">Keep this note</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={onNext}
        className="mt-10 rounded-full bg-rose px-8 py-3 font-body text-sm text-white shadow-lg shadow-rose/30 transition hover:bg-rose-dark">
        Continue to the letter
      </button>
    </motion.div>
  );
}
