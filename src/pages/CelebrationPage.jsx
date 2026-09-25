import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import content from "../data/content";

export default function CelebrationPage() {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ["#E4607A", "#D8A857", "#CBB8E8"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ["#E4607A", "#D8A857", "#CBB8E8"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    const burst = () =>
      confetti({
        particleCount: 100,
        spread: 100,
        startVelocity: 40,
        origin: { y: 0.5 },
        colors: ["#E4607A", "#D8A857", "#CBB8E8", "#FFD9DD"],
      });
    burst();
    const t1 = setTimeout(burst, 700);
    const t2 = setTimeout(burst, 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
        className="mb-6"
      >
        <HeartIcon />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="font-display text-4xl font-medium text-plum sm:text-5xl"
      >
        {content.celebrationHeading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-4 max-w-sm font-body text-base text-plum/70"
      >
        {content.celebrationSub}
      </motion.p>
    </motion.div>
  );
}

function HeartIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="#E4607A">
      <path d="M12 21s-7.5-4.7-10.2-9.1C.2 9 1.4 5.4 4.8 4.4c2-.6 4 .1 5.2 1.9 1.2-1.8 3.2-2.5 5.2-1.9 3.4 1 4.6 4.6 3 7.5C19.5 16.3 12 21 12 21z" />
    </svg>
  );
}
