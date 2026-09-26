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

  // ── Step 4: Seven-year friendship ──
  timelineHeading: "Seven years, still my favourite kind of chaos",
  timelineIntro:
    "A tiny timeline for the friendship that survived distance, random conversations, and all of our wonderfully silly moments.",
  timeline: [
    {
      label: "CHAPTER 01",
      title: "Somehow, it all started",
      text: "And then one conversation became another, and suddenly we had years of stories to look back on.",
    },
    {
      label: "CHAPTER 02",
      title: "The days worth keeping",
      text: "The little updates, the dramatic stories, the jokes that made no sense to anyone else — somehow, they all mattered.",
    },
    {
      label: "CHAPTER 03",
      title: "Distance, but never really far",
      text: "Seven years of friendship across miles is proof that the right people keep finding their way into your day.",
    },
    {
      label: "CHAPTER 04",
      title: "Still here",
      text: "Still talking. Still laughing. Still grateful that life gave me you as my favourite silly person.",
    },
  ],
  timelineButton: "Keep going, birthday girl",

  // ── Step 8: Proposal ──
  confession:
    "After seven years of friendship, random conversations, and being your favourite silly person from a distance, I still want to ask you properly.",
  question: "Will you be my girlfriend?",
  yesLabel: "Yes",
  noDodgeLabels: ["No", "Really?", "Are you sure?", "Think again?", "Last chance...", "Yes"],

  openWhen: [
    { title: "Open when you need a smile", message: "Official reminder: you are still the same silly girl who can turn one tiny update into a full evening of conversation. Now go smile." },
    { title: "Open when distance feels annoying", message: "Seven years of friendship has already proved that miles are not stronger than the people who keep showing up." },
    { title: "Open when you need motivation", message: "You have handled more than you give yourself credit for. Take a breath, fix your crown, and continue being wonderfully you." },
    { title: "Open when you want something sweet", message: "You are loved, celebrated, and very much allowed to make today all about yourself. Birthday rules." },
  ],

  letter: {
    heading: "Dear Muskan,",
    paragraphs: [
      "Seven years is a long time to know someone, especially when most of the friendship happens across distance. Somehow, through the random conversations, silly moments, long calls, and everyday updates, you became one of the most familiar and important people in my life.",
      "Today is not about explaining everything I like about you. It is just about making sure you feel celebrated.",
      "I hope this year is kind to you. I hope you laugh loudly, get spoiled properly, and continue being exactly as silly and wonderful as you are.",
      "Happy birthday, birthday girl.",
    ],
  },

  // ── Celebration screen ──
  celebrationHeading: "Here’s to your next chapter.",
  celebrationSub: "May this year bring you soft days, loud laughs, good surprises, and every lovely thing you deserve.",
};

export default content;
