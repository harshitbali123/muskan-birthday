import { useRef, useState } from "react";
import { motion } from "framer-motion";
import content from "../data/content";

export default function ProposalPage({ onYes }) {
  const containerRef = useRef(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noStage, setNoStage] = useState(0); // index into noDodgeLabels
  const [yesScale, setYesScale] = useState(1);

  const labels = content.noDodgeLabels;
  const finalStage = labels.length - 1;
  const noBecameYes = noStage >= finalStage;

  const dodge = () => {
    if (noBecameYes) return;
    const bounds = containerRef.current?.getBoundingClientRect();
    const maxX = bounds ? bounds.width / 2 - 80 : 120;
    const maxY = bounds ? bounds.height / 2 - 60 : 80;
    const x = (Math.random() - 0.5) * 2 * maxX;
    const y = (Math.random() - 0.5) * 2 * maxY;
    setNoPos({ x, y });
    setNoStage((s) => Math.min(s + 1, finalStage));
    setYesScale((s) => Math.min(s + 0.06, 1.5));
  };

  const handleNoActivate = () => {
    if (noBecameYes) {
      onYes();
      return;
    }
    dodge();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 max-w-md font-body text-base leading-relaxed text-plum/70"
      >
        {content.confession}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 font-display text-4xl font-medium text-plum sm:text-5xl"
      >
        {content.question}
      </motion.h2>

      <div className="relative flex h-40 w-full max-w-xs items-center justify-center gap-6">
        <motion.button
          animate={{ scale: yesScale }}
          whileTap={{ scale: yesScale * 0.95 }}
          onClick={onYes}
          className="z-10 rounded-full bg-rose px-8 py-3 font-body text-sm font-semibold
                     text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark"
        >
          {content.yesLabel}
        </motion.button>

        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onHoverStart={dodge}
          onClick={handleNoActivate}
          className={`z-10 rounded-full px-6 py-3 font-body text-sm font-medium shadow-md transition-colors ${
            noBecameYes
              ? "bg-rose text-white hover:bg-rose-dark"
              : "border border-plum/15 bg-surface text-plum/70"
          }`}
        >
          {labels[noStage]}
        </motion.button>
      </div>

      <p className="mt-6 font-body text-xs text-plum/40">
        (one of these buttons is more cooperative than the other)
      </p>
    </motion.div>
  );
}
