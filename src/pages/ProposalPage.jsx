import { useRef, useState } from "react";
import { motion } from "framer-motion";
import content from "../data/content";

export default function ProposalPage({ onYes }) {
  const containerRef = useRef(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noStage, setNoStage] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const labels = content.noDodgeLabels;
  const finalStage = labels.length - 1;
  const noBecameYes = noStage >= finalStage;

  const dodge = () => {
    if (noBecameYes) return;
    const bounds = containerRef.current?.getBoundingClientRect();
    const maxX = bounds ? bounds.width / 2 - 80 : 120;
    const maxY = bounds ? bounds.height / 2 - 60 : 80;
    setNoPos({ x: (Math.random() - 0.5) * 2 * maxX, y: (Math.random() - 0.5) * 2 * maxY });
    setNoStage((stage) => Math.min(stage + 1, finalStage));
    setYesScale((scale) => Math.min(scale + 0.06, 1.5));
  };

  return (
    <motion.div ref={containerRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 max-w-md font-body text-base leading-relaxed text-plum/70">{content.confession}</p>
      <h2 className="mb-12 font-display text-4xl font-medium text-plum sm:text-5xl">{content.question}</h2>
      <div className="relative flex h-40 w-full max-w-xs items-center justify-center gap-6">
        <motion.button animate={{ scale: yesScale }} whileTap={{ scale: yesScale * 0.95 }} onClick={onYes}
          className="z-10 rounded-full bg-rose px-8 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-rose/30 hover:bg-rose-dark">
          {content.yesLabel}
        </motion.button>
        <motion.button animate={{ x: noPos.x, y: noPos.y }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onHoverStart={dodge} onClick={noBecameYes ? onYes : dodge}
          className={`z-10 rounded-full px-6 py-3 font-body text-sm font-medium shadow-md ${noBecameYes ? "bg-rose text-white" : "border border-plum/15 bg-surface text-plum/70"}`}>
          {labels[noStage]}
        </motion.button>
      </div>
      <p className="mt-6 font-body text-xs text-plum/40">(one of these buttons is more cooperative than the other)</p>
    </motion.div>
  );
}
