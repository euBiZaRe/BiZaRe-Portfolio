const base = import.meta.env.BASE_URL;

export const projects = [
  {
    id: 1,
    title: "Grid Up Sim Racing",
    description: "A fully featured sim racing league platform built from scratch. Features event pages for 19+ races, a live race management system with driver roster overrides, an admin dashboard, Discord integration, and a polished responsive design for the community.",
    longDescription: "Grid Up Sim Racing is a comprehensive platform built to organize, manage, and scale a competitive sim racing league. It centralizes 19+ race events, offers an integrated admin dashboard for live race management, and handles driver roster overrides on the fly. The system integrates tightly with Discord to foster community engagement and features a highly responsive, polished interface that provides a premium experience for members.",
    features: [
      "Event management for 19+ concurrent races",
      "Live race management system with roster overrides",
      "Fully secured Admin Dashboard via Firebase Auth",
      "Automated Discord integration for community updates",
      "Highly responsive, mobile-first design"
    ],
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
    longDescription: "The AeroByte Shop serves as the central digital storefront for the AeroByte brand. Designed with a clean, modern aesthetic, it provides users with an intuitive browsing and purchasing experience. The interface emphasizes premium branding, dynamic product showcases, and a seamless customer-facing design tailored to convert visitors into users.",
    features: [
      "Modern, premium e-commerce storefront",
      "Dynamic product listings and showcases",
      "Clean UI/UX emphasizing brand identity",
      "Optimized for high performance and fast load times"
    ],
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
    longDescription: "AeroByte Cinema is an ambitious cross-platform media center designed to aggregate all forms of entertainment into a single application. Built with Flutter, it streams movies, TV shows, music, and manga natively. The application leverages a built-in libtorrent engine for decentralized streaming, integrates with TMDB for rich metadata, supports Deezer for high-quality audio, and fully supports Real-Debrid and TorBox for premium cached streams. It also features live sports, IPTV capabilities, and an automated silent update system.",
    features: [
      "Cross-platform support (Windows, Linux, macOS, Android)",
      "Built-in libtorrent engine for seamless streaming",
      "Integration with Real-Debrid and TorBox for premium caches",
      "Aggregates Movies, TV, Music (Deezer), and Manga",
      "Live Sports and IPTV native app playback",
      "Automated over-the-air (OTA) update system"
    ],
    type: "Application",
    tags: ["Flutter", "Dart", "Windows", "Android", "Cross-Platform"],
    link: "https://www.aerobyte.shop/cinema.html",
    repo: "#",
    image: `${base}images/aerobyte_cinema.png`
  },
  {
    id: 4,
    title: "AeroByte Among Us Mod Menu",
    description: "A premium BepInEx mod menu for Among Us (Steam IL2CPP). Features an intuitive 7-tab interface with comprehensive movement and visual cheats, including speed hack, crewmate venting, no-clip, impostor ESP, role reveals, satellite view, and anti-lights. Built with a sleek animated UI and tools for hosting, sabotage control, teleportation, and radar — all packed into a single DLL.",
    longDescription: "This premium mod menu for Among Us (Steam IL2CPP versions) completely overrides the game's internal constraints to offer a massive suite of features. Injected via BepInEx, it boasts a gold-standard animated user interface with categorised tabs for Cheat, Host, Sabotage, Radar, Teleport, Log, and Settings. It manipulates memory and game state to enable features like AeroSpeed, Quantum No-Clip, AeroVision (Anti-Lights), Impostor ESP, and an active tactical threat radar—all bundled neatly into a single deployable DLL.",
    features: [
      "Memory injection via BepInEx (IL2CPP)",
      "7-Tab custom animated ImGui-style menu",
      "Movement Control: Speed hacks, No-Clip, Crewmate Venting",
      "Visual Enhancements: Impostor ESP, Satellite View, Anti-Lights",
      "Lobby Management: Host tools and Sabotage control",
      "Tactical real-time threat radar tracking players globally"
    ],
    type: "Application",
    tags: ["C#", "BepInEx", "IL2CPP", "Game Modding"],
    link: "https://www.aerobyte.shop/among-us-mod-menu.html",
    repo: "#",
    image: `${base}images/among_us_mod.png`
  },
  {
    id: 5,
    title: "AeroByte AI Rocket League Bot Trainer",
    description: "A deep reinforcement learning agent for Rocket League, built on top of RLGym and RocketSim. Features a sleek, dark-themed GUI trainer dashboard with real-time telemetry monitoring, multi-tier engine core modes (Potato to SSL Ultra), and integrated terminal logs for process tracking. Powered by a custom PPO learner with a C++ physics engine for simulation.",
    longDescription: "The AeroByte AI Trainer is a professional-grade deep reinforcement learning environment tailored for Rocket League. Built utilizing RLGym and the RocketSim C++ physics engine, the trainer dramatically accelerates the learning processes for custom neural network models. It features 'GigaLearnGUI', a bespoke WPF dashboard displaying real-time telemetry, live reward/value loss tracking, and integrated terminal logs. Pilots can toggle engine core modes ranging from 'Potato' up to 'SSL Ultra' to modify simulation speed and complexity on the fly.",
    features: [
      "Custom PPO (Proximal Policy Optimization) learning model",
      "C++ Physics engine integration via RocketSim",
      "WPF Dark-Themed GUI Trainer Dashboard ('GigaLearnGUI')",
      "Live telemetry tracking for Main Reward, Value Loss, and Steps",
      "Multi-tier core modes (Potato to SSL Ultra) for scalable training",
      "Python/C++ RLBot client for pushing AI to live in-game matches"
    ],
    type: "Application",
    tags: ["Python", "C++", "C#", "Reinforcement Learning", "RLBot"],
    link: "https://www.aerobyte.shop/rl-bot-trainer.html",
    repo: "#",
    image: `${base}images/rl_bot.png`
  }
];

export const inProgressProjects = [
  {
    id: 'ip1',
    title: "AeroByte iRacing Overlay V2",
    status: "Designing V2 Interface",
    progress: 65,
    description: "Rebuilding the core telemetry overlay system with a focus on high-performance rendering, modular widgets, and a modern racing-inspired UI. Implementing advanced resizing and customization features.",
    tags: ["Electron", "React", "Canvas API", "Overlay"],
  },
  {
    id: 'ip2',
    title: "AeroByte Liar's Bar Menu",
    status: "Building Features",
    progress: 85,
    description: "A premium bot menu for Liar's Bar featuring real-time card omniscience, history tracking, death prediction, and revolver bullet manipulation. Built for stability and visual excellence.",
    tags: ["C#", "Unity Hooks", "Game Modding", "UI Design"],
  },
  {
    id: 'ip3',
    title: "AeroByte External CS2",
    status: "Feature Integration",
    progress: 75,
    description: "A high-performance external solution for Counter-Strike 2. Features advanced ESP, Glow, Radar, and humanized Aimbot/Triggerbot systems designed for maximum security.",
    tags: ["C++", "D3D11", "Kernel Hooks", "CS2"],
  },
  {
    id: 'ip4',
    title: "AeroByte Internal CS2",
    status: "Security Hardening",
    progress: 40,
    description: "A powerful internal cheat for Counter-Strike 2 with a seamless in-game interface. Includes RCS, Skin Changer, and advanced visibility-checked visuals.",
    tags: ["C++", "Internal", "MSVC", "Game Hooking"],
  }
];
