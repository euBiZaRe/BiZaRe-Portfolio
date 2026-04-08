const base = import.meta.env.BASE_URL;

export const projects = [
  {
    id: 1,
    title: "Grid Up Sim Racing",
    description: "A fully featured sim racing league platform built from scratch. Features event pages for 19+ races, a live race management system with driver roster overrides, an admin dashboard, Discord integration, and a polished responsive design for the community.",
    type: "Website",
    tags: ["HTML", "CSS", "JavaScript", "Firebase"],
    link: "https://eubizare.github.io/grid-up-racing-website/index.html",
    repo: "https://github.com/eubizare/grid-up-racing-website",
    image: `${base}images/grid_up.png`
  },
  {
    id: 2,
    title: "AeroByte Shop",
    description: "A premium e-commerce and product showcase website for the AeroByte brand. Clean, modern storefront with product listings, customer-facing design, and a polished UI that reflects the brand's premium identity.",
    type: "Website",
    tags: ["E-Commerce", "Web Design", "Branding"],
    link: "https://www.aerobyte.shop/",
    repo: "#",
    image: `${base}images/aerobyte_shop.png`
  },
  {
    id: 3,
    title: "AeroByte Cinema",
    description: "An all-in-one cross-platform media centre built with Flutter. Stream movies, TV shows, music and manga — powered by a built-in libtorrent engine, TMDB metadata, Deezer music, Real-Debrid/TorBox, live sports, IPTV, and auto-updates. Available on Windows, Linux, macOS, and Android.",
    type: "Application",
    tags: ["Flutter", "Dart", "Windows", "Android", "Cross-Platform"],
    link: "https://www.aerobyte.shop/",
    repo: "#",
    image: `${base}images/aerobyte_cinema.png`
  },
  {
    id: 4,
    title: "AeroByte Among Us Mod Menu",
    description: "A premium BepInEx mod menu for Among Us (Steam IL2CPP). Features an intuitive 7-tab interface with comprehensive movement and visual cheats, including speed hack, crewmate venting, no-clip, impostor ESP, role reveals, satellite view, and anti-lights. Built with a sleek animated UI and tools for hosting, sabotage control, teleportation, and radar — all packed into a single DLL.",
    type: "Application",
    tags: ["C#", "BepInEx", "IL2CPP", "Game Modding"],
    link: "#",
    repo: "#",
    image: `${base}images/among_us_mod.png`
  },
  {
    id: 5,
    title: "AeroByte AI Rocket League Bot Trainer",
    description: "A deep reinforcement learning agent for Rocket League, built on top of RLGym and RocketSim. Features a sleek, dark-themed GUI trainer dashboard with real-time telemetry monitoring, multi-tier engine core modes (Potato to SSL Ultra), and integrated terminal logs for process tracking. Powered by a custom PPO learner with a C++ physics engine for simulation.",
    type: "Application",
    tags: ["Python", "C++", "C#", "Reinforcement Learning", "RLBot"],
    link: "#",
    repo: "#",
    image: `${base}images/rl_bot.png`
  }
];
