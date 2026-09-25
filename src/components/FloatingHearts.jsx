const HEART_COUNT = 10;

// Purely decorative ambient layer — soft glowing hearts drifting upward.
// Sits behind page content (pointer-events disabled) on every scene.
export default function FloatingHearts() {
  const hearts = Array.from({ length: HEART_COUNT }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((i) => {
        const left = (i * 97) % 100;
        const delay = (i * 1.3) % 8;
        const duration = 7 + (i % 5);
        const size = 10 + (i % 4) * 6;
        return (
          <span
            key={i}
            className="absolute bottom-0 animate-float"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <Heart size={size} />
          </span>
        );
      })}
    </div>
  );
}

function Heart({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#ff5c8a"
      opacity="0.35"
    >
      <path d="M12 21s-7.5-4.7-10.2-9.1C.2 9 1.4 5.4 4.8 4.4c2-.6 4 .1 5.2 1.9 1.2-1.8 3.2-2.5 5.2-1.9 3.4 1 4.6 4.6 3 7.5C19.5 16.3 12 21 12 21z" />
    </svg>
  );
}
