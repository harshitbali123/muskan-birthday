// ─────────────────────────────────────────────────────────────
// EVERYTHING YOU NEED TO CUSTOMIZE LIVES IN THIS ONE FILE.
// Edit the values below — you don't need to touch any other file.
// ─────────────────────────────────────────────────────────────

const content = {
  // Her name — used across the site
  herName: "Muskan Upadhyay",

  // ── Intro scene ──
  introHeading: "Happy Birthday",
  introSub: "A small birthday surprise, made just for you.",

  // ── Background music ──
  // Drop an mp3/ogg file into /public/audio/ and put its filename here.
  // Example: "song.mp3" -> plays from /public/audio/song.mp3
  audioFile: "birthday-song.mp3",

  // ── Step 1: Cake ──
  wishPrompt: "Make a wish, birthday girl.",
  cakeSubtext: "Tap the cake when you're ready.",

  // ── Step 2: Gift box ──
  giftPrompt: "A little birthday box for my favourite silly girl.",
  birthdayNote:
    "Seven years of long-distance friendship, countless conversations, and your wonderfully silly way of making ordinary days memorable. I hope today reminds you how loved, celebrated, and important you are — even from miles away. Happy birthday, Muskan.",

  // Photo gallery — use the actual files in /public/photos/
  photos: [
    { src: "/photos/1.jpeg", caption: "The mirror selfie that feels very you" },
    { src: "/photos/2.jpeg", caption: "You in pink, looking effortlessly pretty" },
    { src: "/photos/3.jpeg", caption: "That white dress really suited you" },
    { src: "/photos/4.jpeg", caption: "Us, with a pretty view behind us" },
    { src: "/photos/5.jpeg", caption: "You found the perfect garden frame" },
  ],

  // ── Step 3: Reasons card deck ──
  reasonsHeading: "Open these little birthday thoughts",
  reasons: [
    "Seven years and you still manage to make me laugh at the most random things.",
    "Distance has never stopped you from showing up in the ways that matter.",
    "You can turn one tiny story into a full dramatic episode — and I love hearing every minute.",
    "Your voice, your little updates, and your silly messages have made so many ordinary days better.",
    "Today is your reminder to be spoiled, celebrated, and a little extra dramatic.",
    "I hope this year brings you soft days, loud laughs, good surprises, and everything you have been waiting for.",
    "No matter how far apart we are, seven years of friendship is something truly special.",
    "This day is all about you, birthday girl. Please enjoy the attention; you have earned it.",
  ],

  // ── Step 4: Proposal ──
  confession:
    "Somewhere between the everyday conversations, the silly photos, and that hilltop view, you became someone really special to me.",
  question: "Will you be my girlfriend?",
  yesLabel: "Yes",
  noLabel: "No",
  noDodgeLabels: ["No", "Really?", "Are you sure?", "Think again?", "Last chance...", "Yes"],

  // ── Celebration screen ──
  celebrationHeading: "Best birthday plot twist ever.",
  celebrationSub: "Okay. So it's official — first date, my treat. I'll text you the details. 🎉",
};

export default content;
