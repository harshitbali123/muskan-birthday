import { useEffect, useRef } from "react";
import content from "../data/content";

// Request immediate background playback. Browsers can still block audible
// autoplay until the visitor interacts with the page.
export default function AudioPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const start = () => {
      if (audio.paused) audio.play().catch(() => {});
    };
    const retryOnInteraction = () => {
      const attempt = audio.play();
      attempt
        ?.then(() => {
          window.removeEventListener("pointerdown", retryOnInteraction);
          window.removeEventListener("touchstart", retryOnInteraction);
          window.removeEventListener("click", retryOnInteraction);
          window.removeEventListener("keydown", retryOnInteraction);
        })
        .catch(() => {});
    };
    const startFromBegin = () => retryOnInteraction();

    audio.addEventListener("canplay", start);
    window.addEventListener("birthday-start-audio", startFromBegin);
    window.addEventListener("pointerdown", retryOnInteraction);
    window.addEventListener("touchstart", retryOnInteraction, { passive: true });
    window.addEventListener("click", retryOnInteraction);
    window.addEventListener("keydown", retryOnInteraction);
    start();

    return () => {
      audio.removeEventListener("canplay", start);
      window.removeEventListener("birthday-start-audio", startFromBegin);
      window.removeEventListener("pointerdown", retryOnInteraction);
      window.removeEventListener("touchstart", retryOnInteraction);
      window.removeEventListener("click", retryOnInteraction);
      window.removeEventListener("keydown", retryOnInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={`/audio/${content.audioFile}`}
      autoPlay
      loop
      preload="auto"
      playsInline
    />
  );
}
