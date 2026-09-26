import { useEffect, useRef, useState } from "react";
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
import content from "./data/content";

const ORDER = ["intro", "cake", "gift", "reasons", "timeline", "openWhen", "letter", "proposal", "celebration"];

export default function App() {
  const [scene, setScene] = useState("intro");
  const [unlocked, setUnlocked] = useState(0);
  const sectionsRef = useRef({});
  const pendingScene = useRef(null);
  const scrollAnimation = useRef(null);

  const scrollToSection = (nextScene) => {
    const element = sectionsRef.current[nextScene];
    if (!element) return;

    if (scrollAnimation.current) cancelAnimationFrame(scrollAnimation.current);

    const start = window.scrollY;
    const target = element.getBoundingClientRect().top + window.scrollY;
    const distance = target - start;
    const duration = 850;
    const startedAt = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) {
        scrollAnimation.current = requestAnimationFrame(animate);
      } else {
        scrollAnimation.current = null;
      }
    };

    scrollAnimation.current = requestAnimationFrame(animate);
  };

  const goTo = (nextScene) => {
    const nextIndex = ORDER.indexOf(nextScene);
    if (nextIndex < 0 || nextIndex > unlocked + 1) return;
    if (nextIndex > unlocked) {
      setUnlocked(nextIndex);
      pendingScene.current = nextScene;
    } else {
      scrollToSection(nextScene);
    }
    setScene(nextScene);
  };

  const goNext = () => {
    const i = ORDER.indexOf(scene);
    if (i >= ORDER.length - 1) return;
    goTo(ORDER[i + 1]);
  };

  const restartTour = () => {
    if (scrollAnimation.current) cancelAnimationFrame(scrollAnimation.current);
    pendingScene.current = null;
    setUnlocked(0);
    setScene("intro");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const next = pendingScene.current;
    if (!next) return;
    pendingScene.current = null;
    requestAnimationFrame(() => scrollToSection(next));
  }, [unlocked]);

  const section = (name, page) => (
    <section
      key={name}
      id={name}
      ref={(element) => {
        sectionsRef.current[name] = element;
      }}
      className="min-h-screen scroll-mt-0"
    >
      {page}
    </section>
  );

  const introPage = section("intro", <IntroPage key="intro" onNext={() => goTo("cake")} />);
  const pages = [
    section("cake", <CakePage key="cake" onNext={() => goTo("gift")} />),
    section("gift", <GiftPage key="gift" onNext={() => goTo("reasons")} />),
    section("reasons", <ReasonsPage key="reasons" onNext={() => goTo("timeline")} />),
    section("timeline", <FriendshipTimelinePage key="timeline" onNext={() => goTo("openWhen")} />),
    section("openWhen", <OpenWhenPage key="openWhen" onNext={() => goTo("letter")} />),
    section("letter", <LetterPage key="letter" onNext={() => goTo("proposal")} />),
    section("proposal", <ProposalPage key="proposal" onYes={() => goTo("celebration")} />),
    section("celebration", <CelebrationPage key="celebration" onRestart={restartTour} tourAgainLabel={content.tourAgainLabel} />),
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream">
      <div className="page-atmosphere" aria-hidden="true">
        <div className="page-atmosphere__pink" />
        <div className="page-atmosphere__lilac" />
        <div className="page-atmosphere__halo" />
      </div>
      <FloatingHearts />
      <AudioPlayer />
      <ProgressDots current={scene} />
      <div className="intro-cover">{unlocked === 0 && introPage}</div>
      <main className="scroll-experience">{pages.slice(0, unlocked)}</main>
    </div>
  );
}
