import { motion } from "framer-motion";
import content from "../data/content";

export default function FriendshipTimelinePage({ onNext }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen flex-col items-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <p className="mb-3 text-center font-body text-xs uppercase tracking-[0.28em] text-rose/80">seven years of us</p>
        <h2 className="text-center font-display text-4xl font-medium leading-tight text-plum sm:text-5xl">{content.timelineHeading}</h2>
        <p className="mx-auto mt-4 max-w-lg text-center font-body text-base leading-relaxed text-plum/70">{content.timelineIntro}</p>
        <div className="relative mt-12 space-y-8 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-gradient-to-b before:from-rose before:via-lilac before:to-transparent sm:space-y-20 sm:before:left-1/2">
          {content.timeline.map((chapter, index) => (
            <motion.article key={chapter.label} initial={{ opacity: 0, y: 55, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.7, delay: 0.08 }}
              className="relative rounded-2xl border border-white/10 bg-surface/80 p-5 pl-12 shadow-xl shadow-black/20 sm:w-[calc(50%-1.5rem)] sm:pl-5"
              style={{ marginLeft: index % 2 ? "auto" : undefined }}>
              <span className="absolute left-3 top-6 h-3 w-3 rounded-full bg-rose shadow-[0_0_0_5px_rgba(255,92,138,0.12)] sm:-right-[1.9rem] sm:left-auto" />
              <p className="font-body text-[10px] tracking-[0.25em] text-gold">{chapter.label}</p>
              <h3 className="mt-2 font-display text-xl text-plum">{chapter.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-plum/65">{chapter.text}</p>
            </motion.article>
          ))}
        </div>
        <button onClick={onNext} className="mx-auto mt-10 block rounded-full bg-rose px-8 py-3 font-body text-sm font-medium text-white shadow-lg shadow-rose/30 hover:bg-rose-dark">
          {content.timelineButton}
        </button>
      </div>
    </motion.div>
  );
}
