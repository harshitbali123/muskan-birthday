import { motion } from "framer-motion";
import content from "../data/content";

export default function LetterPage({ onNext }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-7 shadow-2xl shadow-black/30 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose/15 blur-3xl" />
        <p className="font-body text-xs uppercase tracking-[0.25em] text-rose/80">a letter for Muskan</p>
        <h2 className="mt-3 font-display text-4xl text-plum">{content.letter.heading}</h2>
        <div className="mt-7 space-y-4 font-body text-base leading-relaxed text-plum/75">
          {content.letter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <p className="mt-7 font-display text-lg text-plum">— Harshit</p>
        <button onClick={onNext} className="mt-8 rounded-full bg-rose px-8 py-3 font-body text-sm text-white shadow-lg shadow-rose/30 hover:bg-rose-dark">Finish the birthday surprise</button>
      </div>
    </motion.div>
  );
}
