const STEPS = ["intro", "cake", "gift", "reasons", "timeline", "openWhen", "letter", "proposal", "celebration"];

export default function ProgressDots({ current }) {
  const index = STEPS.indexOf(current);
  if (index <= 0) return null; // hide on intro

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-2">
      {STEPS.slice(1).map((step, i) => (
        <span
          key={step}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i <= index - 1 ? "w-6 bg-rose" : "w-1.5 bg-rose/25"
          }`}
        />
      ))}
    </div>
  );
}
