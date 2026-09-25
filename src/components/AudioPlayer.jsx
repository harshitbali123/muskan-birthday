import { useEffect, useRef, useState } from "react";
import content from "../data/content";

// Browsers require a user gesture before allowing audible autoplay. The first
// interaction starts the looping track; no in-page pause control is exposed.
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const arm = () => {
      if (armed) return;
      setArmed(true);
      audioRef.current?.play().catch(() => {});
    };
    window.addEventListener("pointerdown", arm, { once: true });
    return () => window.removeEventListener("pointerdown", arm);
  }, [armed]);

  return <audio ref={audioRef} src={`/audio/${content.audioFile}`} loop preload="auto" />;
}
