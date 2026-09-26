import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AudioPlayer from "./components/AudioPlayer";
import FloatingHearts from "./components/FloatingHearts";
import ProgressDots from "./components/ProgressDots";
import IntroPage from "./pages/IntroPage";
import CakePage from "./pages/CakePage";
import GiftPage from "./pages/GiftPage";
import ReasonsPage from "./pages/ReasonsPage";
import FriendshipTimelinePage from "./pages/FriendshipTimelinePage";
import OpenWhenPage from "./pages/OpenWhenPage";
import ProposalPage from "./pages/ProposalPage";
import LetterPage from "./pages/LetterPage";
import CelebrationPage from "./pages/CelebrationPage";

const ORDER = ["intro", "cake", "gift", "reasons", "timeline", "openWhen", "letter", "proposal", "celebration"];

export default function App() {
  const [scene, setScene] = useState("intro");

  const goNext = () => {
    const i = ORDER.indexOf(scene);
    if (i < ORDER.length - 1) setScene(ORDER[i + 1]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      <FloatingHearts />
      <AudioPlayer />
      <ProgressDots current={scene} />

      <AnimatePresence mode="wait" initial>
        {scene === "intro" && <IntroPage key="intro" onNext={goNext} />}
        {scene === "cake" && <CakePage key="cake" onNext={goNext} />}
        {scene === "gift" && <GiftPage key="gift" onNext={goNext} />}
        {scene === "reasons" && <ReasonsPage key="reasons" onNext={goNext} />}
        {scene === "timeline" && <FriendshipTimelinePage key="timeline" onNext={goNext} />}
        {scene === "openWhen" && <OpenWhenPage key="openWhen" onNext={goNext} />}
        {scene === "letter" && <LetterPage key="letter" onNext={goNext} />}
        {scene === "proposal" && <ProposalPage key="proposal" onYes={goNext} />}
        {scene === "celebration" && <CelebrationPage key="celebration" />}
      </AnimatePresence>
    </div>
  );
}
