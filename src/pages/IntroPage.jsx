import { motion } from "framer-motion";
import content from "../data/content";

export default function IntroPage({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-3 font-body text-sm tracking-wide text-rose"
      >
        for {content.herName}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="font-display text-5xl font-medium text-plum sm:text-6xl"
      >
        {content.introHeading}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="mt-4 max-w-sm font-body text-base text-plum/70"
      >
        {content.introSub}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          window.dispatchEvent(new Event("birthday-start-audio"));
          onNext();
        }}
        className="mt-10 rounded-full bg-rose px-8 py-3 font-body text-sm font-medium
                   text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark"
      >
        Begin
      </motion.button>
    </motion.div>
  );
}
