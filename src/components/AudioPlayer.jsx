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
      start();
      window.removeEventListener("pointerdown", retryOnInteraction);
      window.removeEventListener("keydown", retryOnInteraction);
    };

    audio.addEventListener("canplay", start);
    window.addEventListener("pointerdown", retryOnInteraction, { once: true });
    window.addEventListener("keydown", retryOnInteraction, { once: true });
    start();

    return () => {
      audio.removeEventListener("canplay", start);
      window.removeEventListener("pointerdown", retryOnInteraction);
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
