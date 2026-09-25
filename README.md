# Birthday → Proposal Site

A single-flow, scene-by-scene site: intro → cake → gift → reasons → proposal → celebration.
Built with React (Vite), Tailwind CSS, Framer Motion, and canvas-confetti.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`). It's responsive — test on your
phone by visiting your machine's local IP on the same Wi-Fi (Vite prints a "Network" URL too).

To build a static, deployable version:

```bash
npm run build
```

This outputs a `dist/` folder you can host anywhere static (Vercel, Netlify, GitHub Pages, etc.).

## Where to put your stuff

**Everything you need to personalize lives in one file: `src/data/content.js`.**
Open it and edit:

- `herName` — her name, shown on the intro screen
- `audioFile` — filename of the song you drop into `public/audio/`
- `photos` — array of `{ src, caption }`. Drop images into `public/photos/` and reference them
  as `/photos/yourfile.jpg`, or point `src` at any image URL
- `birthdayNote` — the note revealed after the gift box opens
- `reasons` — the 6–8 flip-card lines (edit the list length freely, cards auto-layout)
- `confession`, `question`, `yesLabel`, `noLabel`, `noDodgeLabels` — the proposal scene copy.
  `noDodgeLabels` is the sequence of texts the "No" button cycles through as it dodges; the last
  entry in that array is what turns it into a second "Yes" button
- `celebrationHeading`, `celebrationSub` — the final screen's message

You do not need to touch any other file to customize the content.

## Project structure

```
src/
  data/content.js        <- all your text, photos, audio filename
  components/
    AudioPlayer.jsx       <- top-right play/pause/mute toggle
    FloatingHearts.jsx    <- ambient background hearts
    ProgressDots.jsx      <- bottom progress indicator
  pages/
    IntroPage.jsx
    CakePage.jsx           <- candles + wish + balloons/confetti
    GiftPage.jsx            <- 3-tap unwrap + note + photo carousel
    ReasonsPage.jsx          <- flip-card deck
    ProposalPage.jsx          <- confession + dodging "No" button
    CelebrationPage.jsx        <- fireworks + closing message
  App.jsx                 <- scene order + transitions between them
```

## Notes

- Autoplay: browsers block audio autoplay until the user interacts with the page. The music arms
  itself on the first tap anywhere and then the top-right button just toggles play/pause.
- If a photo path is missing, that photo silently hides instead of showing a broken-image icon —
  swap in real files before sending it to her.
- Everything respects `prefers-reduced-motion`.
