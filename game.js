(() => {
  "use strict";

  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const ui = {
    score: document.querySelector("#score"),
    highScore: document.querySelector("#highScore"),
    crypto: document.querySelector("#crypto"),
    lives: document.querySelector("#lives"),
    health: document.querySelector("#health"),
    wave: document.querySelector("#wave"),
    status: document.querySelector("#statusText"),
    startPanel: document.querySelector("#startPanel"),
    startButton: document.querySelector("#startButton"),
    messagePanel: document.querySelector("#messagePanel"),
    messageKicker: document.querySelector("#messageKicker"),
    messageTitle: document.querySelector("#messageTitle"),
    messageCopy: document.querySelector("#messageCopy"),
    messageButton: document.querySelector("#messageButton"),
    messageButtonText: document.querySelector("#messageButtonText"),
    menuButton: document.querySelector("#menuButton"),
    menuButtonText: document.querySelector("#menuButtonText"),
    soundButton: document.querySelector("#soundButton"),
    difficultyButtons: document.querySelectorAll("[data-difficulty]"),
    difficultyDescription: document.querySelector("#difficultyDescription"),
    shipStyleButtons: document.querySelectorAll("[data-ship-style]"),
    shipColorButtons: document.querySelectorAll("[data-ship-color]"),
    leftButton: document.querySelector("#leftButton"),
    rightButton: document.querySelector("#rightButton"),
    fireButton: document.querySelector("#fireButton"),
    reloadButton: document.querySelector("#reloadButton"),
    powerButton: document.querySelector("#powerButton"),
    pauseButton: document.querySelector("#pauseButton"),
    quitControlButton: document.querySelector("#quitControlButton"),
    shopControlButton: document.querySelector("#shopControlButton"),
    shopPanel: document.querySelector("#shopPanel"),
    shopCrypto: document.querySelector("#shopCrypto"),
    shopFeedback: document.querySelector("#shopFeedback"),
    shopButtons: document.querySelectorAll("[data-shop-item]"),
    closeShopButton: document.querySelector("#closeShopButton"),
    worldPreview: document.querySelector("#worldPreview"),
    worldPreviewName: document.querySelector("#worldPreviewName"),
    worldPreviewStatus: document.querySelector("#worldPreviewStatus"),
    runnerButton: document.querySelector("#runnerButton"),
    adventureButton: document.querySelector("#adventureButton"),
  };

  const W = canvas.width;
  const H = canvas.height;
  const COLORS = {
    cyan: "#49e6ff",
    lime: "#b9ff66",
    coral: "#ff5e6f",
    gold: "#ffd166",
    white: "#f3f7ff",
    dim: "#64718c",
  };
  const POWER_NAMES = {
    repair: "REPAIR",
    rapid: "RAPID",
    double: "DOUBLE",
    triple: "TRIPLE",
    barrier: "BARRIER",
  };
  const POWER_COLORS = {
    repair: COLORS.lime,
    rapid: COLORS.gold,
    double: COLORS.cyan,
    triple: COLORS.coral,
    barrier: "#b98cff",
  };
  const SHIP_COLORS = {
    cyan: "#49e6ff",
    lime: "#b9ff66",
    coral: "#ff5e6f",
    gold: "#ffd166",
    violet: "#b98cff",
  };
  const SHIP_GLOWS = {
    cyan: "rgba(73, 230, 255, 0.34)",
    lime: "rgba(185, 255, 102, 0.34)",
    coral: "rgba(255, 94, 111, 0.34)",
    gold: "rgba(255, 209, 102, 0.34)",
    violet: "rgba(185, 140, 255, 0.34)",
  };
  const SHOP_ITEMS = {
    falcon: { price: 450, type: "upgrade", name: "FALCON DRIVE" },
    titan: { price: 650, type: "upgrade", name: "TITAN HULL" },
    hyper: { price: 1100, type: "upgrade", name: "HYPER DRIVE" },
    aegis: { price: 1600, type: "upgrade", name: "AEGIS ARMOR" },
    autoshield: { price: 1800, type: "upgrade", name: "AUTO SHIELD" },
    ion: { price: 400, type: "upgrade", name: "ION BOLTS" },
    phase: { price: 900, type: "upgrade", name: "PHASE ROUNDS" },
    magazine: { price: 700, type: "upgrade", name: "XL MAGAZINE" },
    reactor: { price: 950, type: "upgrade", name: "PULSE REACTOR" },
    nova: { price: 1300, type: "upgrade", name: "NOVA ROUNDS" },
    starcollector: {
      price: 1850,
      type: "upgrade",
      name: "STAR COLLECTOR",
      secret: true,
      milestone: 5,
    },
    chronocore: {
      price: 2750,
      type: "upgrade",
      name: "CHRONO CORE",
      secret: true,
      milestone: 10,
    },
    omega: {
      price: 4000,
      type: "upgrade",
      name: "OMEGA CANNON",
      secret: true,
      milestone: 15,
    },
    moon: { price: 750, type: "world", name: "NEON MOON" },
    nebula: { price: 1200, type: "world", name: "RED NEBULA" },
    ice: { price: 2000, type: "world", name: "FROZEN RIFT" },
    solar: { price: 2600, type: "world", name: "SOLAR FORGE" },
  };
  const WORLD_THEMES = {
    void: {
      top: "#050914",
      middle: "#02050c",
      bottom: "#071018",
      grid: "rgba(73, 230, 255, 0.07)",
      accent: "#49e6ff",
      label: "SECTOR 07-A",
    },
    moon: {
      top: "#102436",
      middle: "#07131f",
      bottom: "#193b4b",
      grid: "rgba(185, 255, 102, 0.1)",
      accent: "#b9ff66",
      label: "NEON MOON",
    },
    nebula: {
      top: "#260b22",
      middle: "#100617",
      bottom: "#3b1024",
      grid: "rgba(255, 94, 111, 0.1)",
      accent: "#ff5e6f",
      label: "RED NEBULA",
    },
    ice: {
      top: "#102b45",
      middle: "#071422",
      bottom: "#245d79",
      grid: "rgba(135, 220, 255, 0.13)",
      accent: "#87dcff",
      label: "FROZEN RIFT",
    },
    solar: {
      top: "#3a1308",
      middle: "#170704",
      bottom: "#6b2509",
      grid: "rgba(255, 180, 64, 0.14)",
      accent: "#ffb440",
      label: "SOLAR FORGE",
    },
  };
  const ITEM_PREVIEWS = {
    falcon: {
      top: "#072433",
      bottom: "#061017",
      accent: "#49e6ff",
      description: "A precision drive assembly that makes every ship 15% faster.",
    },
    titan: {
      top: "#182b18",
      bottom: "#091109",
      accent: "#b9ff66",
      description: "Heavy hull plating that raises maximum health to 125.",
    },
    hyper: {
      top: "#25133b",
      bottom: "#0e0818",
      accent: "#b98cff",
      description: "A second-stage drive that adds another 20% movement speed.",
    },
    aegis: {
      top: "#33230a",
      bottom: "#130d04",
      accent: "#ffd166",
      description: "End-game armor technology that raises maximum health to 160.",
    },
    autoshield: {
      top: "#30101c",
      bottom: "#13060a",
      accent: "#ff5e6f",
      description: "Automatically generates one barrier charge at the start of every wave.",
    },
    ion: {
      top: "#06313a",
      bottom: "#041215",
      accent: "#49e6ff",
      description: "Ion acceleration makes every player projectile travel 20% faster.",
    },
    phase: {
      top: "#261540",
      bottom: "#0d0817",
      accent: "#b98cff",
      description: "Phase-tuned ammunition passes through one invader before disappearing.",
    },
    magazine: {
      top: "#25300c",
      bottom: "#0c1104",
      accent: "#b9ff66",
      description: "Expands weapon capacity from 12 rounds to 18 rounds.",
    },
    reactor: {
      top: "#332b08",
      bottom: "#140f03",
      accent: "#ffd166",
      description: "Reduces both firing cooldown and reload time by 25%.",
    },
    nova: {
      top: "#3b1015",
      bottom: "#160508",
      accent: "#ff5e6f",
      description: "Oversized rounds inflict double damage against Space Runner asteroids.",
    },
    starcollector: {
      top: "#332b08",
      bottom: "#100d03",
      accent: "#ffd166",
      description: "Secret technology that marks two additional power-up carriers each wave.",
    },
    chronocore: {
      top: "#251541",
      bottom: "#0c0716",
      accent: "#b98cff",
      description: "A forbidden time core that accelerates firing and reloading by another 15%.",
    },
    omega: {
      top: "#3d0d18",
      bottom: "#150408",
      accent: "#ff5e6f",
      description: "The final weapon: faster projectiles with one additional point of damage.",
    },
  };
  const BOSS_PROFILES = {
    void: { name: "ABYSS WARDEN", color: "#49e6ff", core: "#b98cff" },
    moon: { name: "LUNAR COLOSSUS", color: "#b9ff66", core: "#f3f7ff" },
    nebula: { name: "CRIMSON MOTH", color: "#ff5e6f", core: "#ffd166" },
    ice: { name: "GLACIER CORE", color: "#87dcff", core: "#f3f7ff" },
    solar: { name: "HELIOS PRIME", color: "#ffb440", core: "#ff5e6f" },
  };
  const ADVENTURE_GALAXIES = [
    {
      world: "void",
      name: "ANDROMEDA REACH",
      threat: "Stop the abyss fleet from collapsing its stars.",
    },
    {
      world: "moon",
      name: "ORION EXPANSE",
      threat: "Defend the moon colonies from orbital destruction.",
    },
    {
      world: "nebula",
      name: "CRIMSON VORTEX",
      threat: "Break the swarm before the nebula ignites.",
    },
    {
      world: "ice",
      name: "POLARIS RIFT",
      threat: "Save the frozen systems from a dimensional fracture.",
    },
    {
      world: "solar",
      name: "HELIOS CROWN",
      threat: "Destroy the final fleet before the star is consumed.",
    },
  ];
  const ENEMY_FACTIONS = {
    void: {
      names: { scout: "PHANTOM", fighter: "VOID REAPER", bomber: "ABYSS DREADNOUGHT" },
      core: "#b98cff",
      speed: 1,
      armor: 0,
      motion: "phase",
    },
    moon: {
      names: { scout: "LUNAR DRONE", fighter: "ORBIT LANCER", bomber: "MOON BARGE" },
      core: "#f3f7ff",
      speed: 0.92,
      armor: 1,
      motion: "orbit",
    },
    nebula: {
      names: { scout: "CRIMSON WASP", fighter: "BLOOD WING", bomber: "NEBULA MOTH" },
      core: "#ffd166",
      speed: 1.16,
      armor: 0,
      motion: "zigzag",
    },
    ice: {
      names: { scout: "FROST SHARD", fighter: "ICE RAZOR", bomber: "GLACIER TANK" },
      core: "#f3f7ff",
      speed: 0.84,
      armor: 1,
      motion: "drift",
    },
    solar: {
      names: { scout: "SOLAR FLARE", fighter: "SUN LANCER", bomber: "CORONA CARRIER" },
      core: "#ff5e6f",
      speed: 1.28,
      armor: 0,
      motion: "flare",
    },
  };

  const DIFFICULTIES = {
    easy: {
      label: "EASY",
      description: "Cadet assistance · 5 ships · strong shields · ₿5 per wave",
      lives: 5,
      moveSpeed: 0.65,
      fireInterval: 1.6,
      projectileSpeed: 0.72,
      shieldHealth: 4,
      playerCooldown: 0.18,
      maxPlayerShots: 5,
      scoreMultiplier: 0.75,
      aimChance: 0.2,
      rowBonus: 0,
      hitDamage: 20,
      waveReward: 5,
    },
    normal: {
      label: "NORMAL",
      description: "Light resistance · 4 ships · reinforced shields · ₿20 per wave",
      lives: 4,
      moveSpeed: 0.82,
      fireInterval: 1.25,
      projectileSpeed: 0.88,
      shieldHealth: 3,
      playerCooldown: 0.22,
      maxPlayerShots: 4,
      scoreMultiplier: 0.9,
      aimChance: 0.3,
      rowBonus: 0,
      hitDamage: 25,
      waveReward: 20,
    },
    medium: {
      label: "MEDIUM",
      description: "Standard patrol conditions · 3 ships · ₿50 per wave",
      lives: 3,
      moveSpeed: 1,
      fireInterval: 1,
      projectileSpeed: 1,
      shieldHealth: 2,
      playerCooldown: 0.26,
      maxPlayerShots: 3,
      scoreMultiplier: 1,
      aimChance: 0.42,
      rowBonus: 0,
      hitDamage: 34,
      waveReward: 50,
    },
    hard: {
      label: "HARD",
      description: "Aggressive swarm · faster fire · ₿100 per wave",
      lives: 3,
      moveSpeed: 1.28,
      fireInterval: 0.78,
      projectileSpeed: 1.18,
      shieldHealth: 2,
      playerCooldown: 0.28,
      maxPlayerShots: 3,
      scoreMultiplier: 1.35,
      aimChance: 0.56,
      rowBonus: 0,
      hitDamage: 40,
      waveReward: 100,
    },
    expert: {
      label: "EXPERT",
      description: "Elite threat · 2 ships · weak shields · ₿250 per wave",
      lives: 2,
      moveSpeed: 1.62,
      fireInterval: 0.56,
      projectileSpeed: 1.44,
      shieldHealth: 1,
      playerCooldown: 0.3,
      maxPlayerShots: 2,
      scoreMultiplier: 1.8,
      aimChance: 0.72,
      rowBonus: 1,
      hitDamage: 50,
      waveReward: 250,
    },
    impossible: {
      label: "IMPOSSIBLE",
      description: "One ship · no shields · maximum swarm · ₿1,000 per wave",
      lives: 1,
      moveSpeed: 2.05,
      fireInterval: 0.36,
      projectileSpeed: 1.8,
      shieldHealth: 0,
      playerCooldown: 0.34,
      maxPlayerShots: 2,
      scoreMultiplier: 2.5,
      aimChance: 0.9,
      rowBonus: 2,
      hitDamage: 100,
      waveReward: 1000,
    },
  };

  const keys = { left: false, right: false, fire: false };
  let difficultyKey = localStorage.getItem("void-patrol-difficulty") || "medium";
  if (!DIFFICULTIES[difficultyKey]) difficultyKey = "medium";
  let difficulty = DIFFICULTIES[difficultyKey];
  let shipStyle = localStorage.getItem("void-patrol-ship-style") || "dart";
  let shipColorKey = localStorage.getItem("void-patrol-ship-color") || "cyan";
  if (!["dart", "wing", "tank"].includes(shipStyle)) shipStyle = "dart";
  if (!SHIP_COLORS[shipColorKey]) shipColorKey = "cyan";
  let crypto = Number(localStorage.getItem("void-patrol-crypto") || 0);
  if (!Number.isFinite(crypto)) crypto = 0;
  let ownedItems = [];
  try {
    ownedItems = JSON.parse(localStorage.getItem("void-patrol-owned-items") || "[]");
  } catch {
    ownedItems = [];
  }
  if (!Array.isArray(ownedItems)) ownedItems = [];
  let unlockedSecrets = [];
  try {
    unlockedSecrets = JSON.parse(localStorage.getItem("void-patrol-secret-items") || "[]");
  } catch {
    unlockedSecrets = [];
  }
  if (!Array.isArray(unlockedSecrets)) unlockedSecrets = [];
  let equippedWorld = localStorage.getItem("void-patrol-world") || "void";
  if (!WORLD_THEMES[equippedWorld]) equippedWorld = "void";
  let previewItemId = equippedWorld;
  let shopReturnState = "menu";
  let gameMode = "classic";
  let state = "menu";
  let score = 0;
  let highScore = Number(localStorage.getItem("void-patrol-high-score") || 0);
  let lives = 3;
  let health = 100;
  let wave = 1;
  let lastTime = 0;
  let elapsed = 0;
  let shake = 0;
  let flash = 0;
  let soundEnabled = true;
  let audioContext = null;

  let player;
  let invaders = [];
  let playerShots = [];
  let enemyShots = [];
  let particles = [];
  let shields = [];
  let powerUps = [];
  let stars = [];
  let floaters = [];
  let rapidFireTimer = 0;
  let doubleShotTimer = 0;
  let spreadShotTimer = 0;
  let barrierCharges = 0;
  let powerInventory = [];
  const baseMagazineSize = 12;
  let ammo = baseMagazineSize;
  let reloadTimer = 0;
  const baseReloadDuration = 1.35;
  let saucer = null;
  let boss = null;
  let saucerTimer = 9;
  let alienDirection = 1;
  let alienStepTimer = 0;
  let alienFireTimer = 0;
  let formationSpeed = 20;
  let runnerObstacles = [];
  let runnerOrbs = [];
  let runnerSpawnTimer = 0;
  let runnerOrbTimer = 0;
  let runnerTime = 0;
  let runnerEarned = 0;
  let adventureCombo = 0;
  let adventureComboTimer = 0;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function overlap(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  function formatScore(value) {
    return Math.max(0, value).toString().padStart(6, "0");
  }

  function ownsItem(id) {
    return ownedItems.includes(id);
  }

  function getActiveWorld() {
    if (gameMode === "adventure") {
      return getAdventureGalaxy().world;
    }
    return equippedWorld;
  }

  function getAdventureGalaxy(stage = wave) {
    return ADVENTURE_GALAXIES[
      Math.min(ADVENTURE_GALAXIES.length - 1, Math.floor((stage - 1) / 3))
    ];
  }

  function getMaxHealth() {
    if (ownsItem("aegis")) return 160;
    return ownsItem("titan") ? 125 : 100;
  }

  function getPlayerSpeed() {
    let speed = 340;
    if (ownsItem("falcon")) speed *= 1.15;
    if (ownsItem("hyper")) speed *= 1.2;
    return speed;
  }

  function getMagazineSize() {
    return ownsItem("magazine") ? 18 : baseMagazineSize;
  }

  function getReloadDuration() {
    let duration = ownsItem("reactor") ? baseReloadDuration * 0.75 : baseReloadDuration;
    if (ownsItem("chronocore")) duration *= 0.85;
    return duration;
  }

  function saveEconomy() {
    localStorage.setItem("void-patrol-crypto", crypto.toString());
    localStorage.setItem("void-patrol-owned-items", JSON.stringify(ownedItems));
    localStorage.setItem("void-patrol-secret-items", JSON.stringify(unlockedSecrets));
    localStorage.setItem("void-patrol-world", equippedWorld);
  }

  function updateHud() {
    ui.score.textContent = formatScore(score);
    ui.highScore.textContent = formatScore(Math.max(score, highScore));
    ui.crypto.textContent = `₿ ${Math.floor(crypto).toString().padStart(3, "0")}`;
    ui.lives.textContent = Array.from({ length: lives }, () => "◆").join(" ");
    const healthPercent = (health / getMaxHealth()) * 100;
    ui.health.textContent = `${health}/${getMaxHealth()}`;
    ui.health.parentElement.classList.toggle("warning", healthPercent > 25 && healthPercent <= 60);
    ui.health.parentElement.classList.toggle("critical", healthPercent <= 25);
    ui.wave.textContent = wave.toString().padStart(2, "0");
  }

  function setStatus(text) {
    ui.status.textContent = text;
  }

  function tone(frequency, duration = 0.08, type = "square", volume = 0.035, slide = 0) {
    if (!soundEnabled) return;
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(30, frequency + slide),
        now + duration,
      );
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch {
      soundEnabled = false;
    }
  }

  function initStars() {
    stars = Array.from({ length: 115 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() < 0.12 ? 2 : 1,
      speed: random(3, 13),
      alpha: random(0.18, 0.78),
      pulse: random(0, Math.PI * 2),
    }));
  }

  function createPlayer() {
    return {
      x: W / 2 - 23,
      y: H - 66,
      w: 46,
      h: 27,
      speed: getPlayerSpeed(),
      cooldown: 0,
      invincible: 1.6,
      tilt: 0,
    };
  }

  function createWave() {
    invaders = [];
    playerShots = [];
    enemyShots = [];
    powerUps = [];
    runnerObstacles = [];
    runnerOrbs = [];
    ammo = getMagazineSize();
    reloadTimer = 0;
    floaters = [];
    saucer = null;
    boss = null;
    saucerTimer = random(8, 14);
    alienDirection = 1;
    alienStepTimer = 0;
    alienFireTimer = 0.8;
    formationSpeed = (17 + wave * 4) * difficulty.moveSpeed;

    const rows = Math.min(5, 3 + Math.floor(wave / 2) + difficulty.rowBonus);
    const columns = 10;
    const spacingX = 67;
    const spacingY = 48;
    const originX = (W - (columns - 1) * spacingX) / 2 - 19;
    const originY = 112;

    const bossWave = gameMode === "adventure" ? wave % 3 === 0 : wave % 5 === 0;
    if (bossWave) {
      const profile = BOSS_PROFILES[getActiveWorld()];
      const maxHealth = Math.round((42 + wave * 5) * (0.85 + difficulty.moveSpeed * 0.15));
      boss = {
        x: W / 2 - 90,
        y: 102,
        w: 180,
        h: 72,
        vx: 80 * difficulty.moveSpeed,
        health: maxHealth,
        maxHealth,
        fireTimer: 0.8,
        phase: 0,
        ...profile,
      };
      saucerTimer = 999;
    } else if (gameMode === "adventure") {
      const enemyCount = Math.min(17, 7 + Math.ceil(wave * 0.65));
      const accent = WORLD_THEMES[getActiveWorld()].accent;
      const factionKey = getActiveWorld();
      const faction = ENEMY_FACTIONS[factionKey];
      for (let i = 0; i < enemyCount; i += 1) {
        const role = i % 6 === 0 ? "bomber" : i % 3 === 0 ? "fighter" : "scout";
        const stats =
          role === "bomber"
            ? { w: 58, h: 40, health: 4, speed: 44, type: 2 }
            : role === "fighter"
              ? { w: 42, h: 32, health: 2, speed: 62, type: 1 }
              : { w: 30, h: 25, health: 1, speed: 84, type: 0 };
        const x = 70 + ((i * 137) % (W - 140));
        const health = stats.health + faction.armor;
        invaders.push({
          x,
          baseX: x,
          y: -80,
          ...stats,
          health,
          maxHealth: health,
          speed: stats.speed * faction.speed,
          role,
          faction: factionKey,
          enemyName: faction.names[role],
          core: faction.core,
          motion: faction.motion,
          color: accent,
          phase: random(0, Math.PI * 2),
          amplitude: role === "bomber" ? 38 : random(55, 125),
          launchDelay: i * 1.35,
          diveTimer: random(2.8, 7),
          diving: false,
          bank: 0,
          fireTimer: random(0.8, 2.4),
          alive: true,
        });
      }
    } else {
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          invaders.push({
            x: originX + col * spacingX,
            y: originY + row * spacingY,
            w: 38,
            h: 26,
            row,
            col,
            type: row === 0 ? 2 : row < 3 ? 1 : 0,
            frame: 0,
            alive: true,
          });
        }
      }
    }
    if (!boss) {
      const carrierCount = Math.min(
        invaders.length,
        2 + Math.ceil(wave / 2) + (ownsItem("starcollector") ? 2 : 0),
      );
      const carrierPool = [...invaders];
      for (let i = 0; i < carrierCount; i += 1) {
        const index = Math.floor(Math.random() * carrierPool.length);
        carrierPool.splice(index, 1)[0].hasPowerUp = true;
      }
    }
    if (gameMode === "adventure") saucerTimer = 999;
    if (gameMode === "adventure") shields = [];
    else createShields();
    if (ownsItem("autoshield")) barrierCharges = Math.max(barrierCharges, 1);
    setStatus(
      boss
        ? `${gameMode === "adventure" ? `${getAdventureGalaxy().name} · ` : ""}BOSS · ${boss.name}`
        : gameMode === "adventure"
          ? `ADVENTURE ${wave}/15 · SAVE ${getAdventureGalaxy().name}`
          : `${difficulty.label} · WAVE ${wave.toString().padStart(2, "0")} · HOSTILES ${invaders.length}`,
    );
  }

  function createShields() {
    shields = [];
    if (difficulty.shieldHealth <= 0) return;
    const shieldWidth = 86;
    const shieldHeight = 42;

    for (let shieldIndex = 0; shieldIndex < 4; shieldIndex += 1) {
      const originX = 110 + shieldIndex * 220;
      const originY = H - 146;
      for (let row = 0; row < 6; row += 1) {
        for (let col = 0; col < 12; col += 1) {
          const leftNotch = row >= 4 && col < 4;
          const rightNotch = row >= 4 && col > 7;
          const topCorner = row === 0 && (col < 2 || col > 9);
          if (!leftNotch && !rightNotch && !topCorner) {
            shields.push({
              x: originX + (col * shieldWidth) / 12,
              y: originY + (row * shieldHeight) / 6,
              w: shieldWidth / 12 + 0.5,
              h: shieldHeight / 6 + 0.5,
              health: difficulty.shieldHealth,
            });
          }
        }
      }
    }
  }

  function startGame() {
    gameMode = "classic";
    adventureCombo = 0;
    adventureComboTimer = 0;
    score = 0;
    lives = difficulty.lives;
    health = getMaxHealth();
    wave = 1;
    elapsed = 0;
    player = createPlayer();
    particles = [];
    powerUps = [];
    rapidFireTimer = 0;
    doubleShotTimer = 0;
    spreadShotTimer = 0;
    barrierCharges = 0;
    powerInventory = [];
    ammo = getMagazineSize();
    reloadTimer = 0;
    createWave();
    state = "playing";
    ui.startPanel.classList.add("hidden");
    ui.messagePanel.classList.add("hidden");
    ui.shopPanel.classList.add("hidden");
    updateHud();
    tone(170, 0.18, "sawtooth", 0.04, 260);
  }

  function startAdventure() {
    if (!["menu", "gameover", "adventureover", "adventurecomplete"].includes(state)) {
      setStatus("ADVENTURE AVAILABLE FROM MISSION SELECT");
      return;
    }
    gameMode = "adventure";
    adventureCombo = 0;
    adventureComboTimer = 0;
    score = 0;
    lives = difficulty.lives;
    health = getMaxHealth();
    wave = 1;
    elapsed = 0;
    player = createPlayer();
    particles = [];
    powerUps = [];
    rapidFireTimer = 0;
    doubleShotTimer = 0;
    spreadShotTimer = 0;
    barrierCharges = 0;
    powerInventory = [];
    ammo = getMagazineSize();
    reloadTimer = 0;
    createWave();
    state = "playing";
    ui.startPanel.classList.add("hidden");
    ui.messagePanel.classList.add("hidden");
    ui.shopPanel.classList.add("hidden");
    updateHud();
    setStatus(`ENTERING ${getAdventureGalaxy().name} · PREVENT DESTRUCTION`);
    tone(200, 0.28, "sawtooth", 0.04, 380);
  }

  function showMessage(kicker, title, copy, buttonText = "", menuText = "") {
    ui.messageKicker.textContent = kicker;
    ui.messageTitle.textContent = title;
    ui.messageCopy.textContent = copy;
    ui.messagePanel.classList.remove("hidden");
    ui.messageButton.classList.toggle("hidden", !buttonText);
    ui.messageButtonText.textContent = buttonText;
    ui.menuButton.classList.toggle("hidden", !menuText);
    ui.menuButtonText.textContent = menuText;
  }

  function togglePause() {
    if (state === "playing") {
      state = "paused";
      showMessage(
        "MISSION STATUS",
        "PAUSED",
        "Press P to return to the fight, or return to mission select.",
        "",
        "QUIT MISSION",
      );
      setStatus("SYSTEM PAUSED");
    } else if (state === "paused") {
      state = "playing";
      ui.messagePanel.classList.add("hidden");
      setStatus(
        gameMode === "adventure"
          ? `ADVENTURE ${wave}/15 · SAVE ${getAdventureGalaxy().name}`
          : `WAVE ${wave.toString().padStart(2, "0")} · DEFENSE ACTIVE`,
      );
      lastTime = performance.now();
    } else if (state === "runner") {
      state = "runnerpaused";
      showMessage(
        "SPACE RUNNER",
        "PAUSED",
        `Current run: ${Math.floor(runnerTime)} seconds · ₿ ${runnerEarned}`,
        "",
        "QUIT RUN",
      );
      setStatus("SPACE RUNNER PAUSED");
    } else if (state === "runnerpaused") {
      state = "runner";
      ui.messagePanel.classList.add("hidden");
      setStatus("SPACE RUNNER · DODGE FOR CRYPTO");
      lastTime = performance.now();
    }
  }

  function gameOver() {
    const adventure = gameMode === "adventure";
    state = adventure ? "adventureover" : "gameover";
    highScore = Math.max(highScore, score);
    localStorage.setItem("void-patrol-high-score", highScore.toString());
    updateHud();
    showMessage(
      "TRANSMISSION LOST",
      adventure ? "ADVENTURE OVER" : "GAME OVER",
      adventure
        ? `Your expedition ended at stage ${wave}/15 while defending ${getAdventureGalaxy().name}.`
        : `${difficulty.label} · Final score: ${formatScore(score)} · Wave ${wave}.`,
      adventure ? "RETRY ADVENTURE" : "RETRY MISSION",
      adventure ? "RETURN TO MENU" : "CHANGE DIFFICULTY",
    );
    setStatus("DEFENSE GRID OFFLINE");
    tone(140, 0.6, "sawtooth", 0.045, -100);
  }

  function startSpaceRunner() {
    if (!["menu", "gameover", "runover"].includes(state)) {
      setStatus("SPACE RUNNER AVAILABLE FROM MISSION SELECT");
      return;
    }
    state = "runner";
    runnerObstacles = [];
    runnerOrbs = [];
    runnerSpawnTimer = 0.5;
    runnerOrbTimer = random(7, 11);
    runnerTime = 0;
    runnerEarned = 0;
    particles = [];
    playerShots = [];
    ammo = getMagazineSize();
    reloadTimer = 0;
    player = createPlayer();
    player.y = H - 82;
    player.invincible = 0;
    ui.startPanel.classList.add("hidden");
    ui.messagePanel.classList.add("hidden");
    setStatus("SPACE RUNNER · DODGE FOR CRYPTO");
    tone(180, 0.2, "sawtooth", 0.035, 300);
  }

  function spawnRunnerObstacle() {
    const size = random(28, 58);
    runnerObstacles.push({
      x: random(18, W - size - 18),
      y: -size - 10,
      w: size,
      h: size,
      speed: random(190, 265) + runnerTime * 2.6,
      rotation: random(0, Math.PI * 2),
      spin: random(-2.2, 2.2),
      points: Array.from({ length: 9 }, () => random(0.72, 1)),
      health: size > 44 ? 2 : 1,
    });
  }

  function spawnRunnerOrb() {
    runnerOrbs.push({
      x: random(28, W - 52),
      y: -30,
      w: 18,
      h: 18,
      speed: 265 + runnerTime * 1.8,
      phase: 0,
    });
  }

  function finishSpaceRunner() {
    if (state !== "runner") return;
    state = "runover";
    crypto += runnerEarned;
    saveEconomy();
    updateHud();
    showMessage(
      "ARCADE RUN COMPLETE",
      "WRECKED",
      `You survived ${Math.floor(runnerTime)} seconds and banked ₿ ${runnerEarned}.`,
      "RUN AGAIN",
      "RETURN TO MENU",
    );
    setStatus(`SPACE RUNNER COMPLETE · ₿ ${runnerEarned} BANKED`);
    shake = 0.55;
    spawnParticles(
      player.x + player.w / 2,
      player.y + player.h / 2,
      SHIP_COLORS[shipColorKey],
      40,
      240,
    );
    tone(170, 0.5, "sawtooth", 0.05, -120);
  }

  function updateSpaceRunner(dt) {
    runnerTime += dt;
    const direction = Number(keys.right) - Number(keys.left);
    player.x = clamp(player.x + direction * player.speed * dt, 18, W - player.w - 18);
    player.tilt += (direction - player.tilt) * Math.min(1, dt * 10);

    runnerSpawnTimer -= dt;
    if (runnerSpawnTimer <= 0) {
      spawnRunnerObstacle();
      runnerSpawnTimer = Math.max(0.3, 0.78 - runnerTime * 0.008) * random(0.72, 1.18);
    }

    runnerOrbTimer -= dt;
    if (runnerOrbTimer <= 0) {
      spawnRunnerOrb();
      runnerOrbTimer = random(12, 20);
    }

    for (const obstacle of runnerObstacles) {
      obstacle.y += obstacle.speed * dt;
      obstacle.rotation += obstacle.spin * dt;
      if (overlap(obstacle, player)) {
        finishSpaceRunner();
        return;
      }
      if (obstacle.y > H + obstacle.h && !obstacle.passed) {
        obstacle.passed = true;
        runnerEarned += 1;
      }
    }

    for (const orb of runnerOrbs) {
      orb.y += orb.speed * dt;
      orb.phase += dt * 5;
      if (!orb.collected && overlap(orb, player)) {
        orb.collected = true;
        runnerEarned += 75;
        spawnParticles(orb.x + 12, orb.y + 12, COLORS.gold, 18, 110);
        addFloater(player.x + player.w / 2, player.y - 8, "RARE CRYPTO · ₿ +75", COLORS.gold);
        tone(460, 0.13, "sine", 0.03, 280);
      }
    }

    runnerObstacles = runnerObstacles.filter((obstacle) => obstacle.y < H + obstacle.h + 10);
    runnerOrbs = runnerOrbs.filter((orb) => orb.y < H + 40 && !orb.collected);
  }

  function returnToMenu() {
    if ((state === "runner" || state === "runnerpaused") && runnerEarned > 0) {
      crypto += runnerEarned;
      saveEconomy();
      runnerEarned = 0;
    }
    gameMode = "classic";
    state = "menu";
    keys.left = false;
    keys.right = false;
    keys.fire = false;
    playerShots = [];
    enemyShots = [];
    powerUps = [];
    rapidFireTimer = 0;
    doubleShotTimer = 0;
    spreadShotTimer = 0;
    barrierCharges = 0;
    powerInventory = [];
    ammo = getMagazineSize();
    reloadTimer = 0;
    health = getMaxHealth();
    player = createPlayer();
    createWave();
    updateHud();
    ui.messagePanel.classList.add("hidden");
    ui.shopPanel.classList.add("hidden");
    ui.shopControlButton.lastElementChild.textContent = "SHOP";
    ui.startPanel.classList.remove("hidden");
    setStatus(`${difficulty.label} THREAT · SYSTEM READY`);
  }

  function showItemPreview(id) {
    const theme = WORLD_THEMES[id] || ITEM_PREVIEWS[id];
    if (!theme) return;
    previewItemId = id;
    const item = SHOP_ITEMS[id];
    ui.worldPreview.style.setProperty("--preview-top", theme.top);
    ui.worldPreview.style.setProperty("--preview-bottom", theme.bottom);
    ui.worldPreview.style.setProperty("--preview-accent", theme.accent);
    ui.worldPreviewName.textContent = item ? item.name : "DEEP VOID";
    if (!item) {
      ui.worldPreviewStatus.textContent = "Currently equipped.";
    } else if (item.type !== "world") {
      ui.worldPreviewStatus.textContent = ownsItem(id)
        ? `${theme.description} Owned and active.`
        : `${theme.description} Press BUY NOW to confirm ₿ ${item.price.toLocaleString()}.`;
    } else if (equippedWorld === id) {
      ui.worldPreviewStatus.textContent = "Currently equipped.";
    } else if (ownsItem(id)) {
      ui.worldPreviewStatus.textContent = "Unlocked · press EQUIP to travel here.";
    } else {
      ui.worldPreviewStatus.textContent = `Locked · press BUY NOW to confirm ₿ ${item.price.toLocaleString()}.`;
    }
  }

  function updateShop() {
    ui.shopCrypto.textContent = `₿ ${Math.floor(crypto).toString().padStart(3, "0")}`;
    for (const button of ui.shopButtons) {
      const id = button.dataset.shopItem;
      const item = SHOP_ITEMS[id];
      const secretLocked = item.secret && !unlockedSecrets.includes(id);
      button.closest(".shop-card").classList.toggle("hidden", secretLocked);
      if (secretLocked) continue;
      const owned = ownsItem(id);
      const equipped = item.type === "world" && equippedWorld === id;
      button.classList.toggle("owned", owned);
      button.classList.toggle("equipped", equipped);
      if (equipped) button.textContent = "EQUIPPED";
      else if (owned && item.type === "world") button.textContent = "EQUIP";
      else if (owned) button.textContent = "OWNED";
      else if (previewItemId !== id)
        button.textContent = `PREVIEW · ₿ ${item.price.toLocaleString()}`;
      else button.textContent = `BUY NOW · ₿ ${item.price.toLocaleString()}`;
    }
  }

  function openShop() {
    if (state === "shop") {
      closeShop();
      return;
    }
    if (
      state !== "menu" &&
      state !== "waveclear" &&
      state !== "gameover" &&
      state !== "adventureover" &&
      state !== "adventurecomplete"
    ) {
      setStatus("SHOP AVAILABLE BEFORE MISSIONS AND BETWEEN WAVES");
      return;
    }
    shopReturnState = state;
    state = "shop";
    ui.shopFeedback.textContent = "Upgrades are saved automatically.";
    ui.shopPanel.classList.remove("hidden");
    ui.shopControlButton.lastElementChild.textContent = "EXIT SHOP";
    showItemPreview(equippedWorld);
    updateShop();
  }

  function closeShop() {
    if (state !== "shop") return;
    ui.shopPanel.classList.add("hidden");
    ui.shopControlButton.lastElementChild.textContent = "SHOP";
    state = shopReturnState;
    lastTime = performance.now();
  }

  function buyShopItem(id) {
    const item = SHOP_ITEMS[id];
    if (!item || state !== "shop") return;
    if (item.secret && !unlockedSecrets.includes(id)) return;

    if (ownsItem(id)) {
      showItemPreview(id);
      if (item.type === "world") {
        equippedWorld = id;
        showItemPreview(id);
        ui.shopFeedback.textContent = `${item.name} equipped.`;
        saveEconomy();
        updateShop();
      } else {
        ui.shopFeedback.textContent = `${item.name} is already owned and active.`;
      }
      return;
    }

    if (previewItemId !== id) {
      showItemPreview(id);
      updateShop();
      ui.shopFeedback.textContent = `Previewing ${item.name}. Press BUY NOW to confirm.`;
      tone(220, 0.12, "sine", 0.02, 120);
      return;
    }

    if (crypto < item.price) {
      ui.shopFeedback.textContent = `You need ₿ ${(item.price - crypto).toLocaleString()} more for ${item.name}.`;
      tone(90, 0.12, "square", 0.025, -20);
      return;
    }

    crypto -= item.price;
    ownedItems.push(id);
    if (item.type === "world") equippedWorld = id;
    if ((id === "falcon" || id === "hyper") && player) player.speed = getPlayerSpeed();
    if (id === "titan" || id === "aegis") health = getMaxHealth();
    if (id === "magazine") ammo = getMagazineSize();
    saveEconomy();
    updateHud();
    showItemPreview(id);
    updateShop();
    ui.shopFeedback.textContent = `${item.name} purchased${item.type === "world" ? " and equipped" : ""}.`;
    tone(320, 0.2, "sine", 0.04, 360);
  }

  function spawnParticles(x, y, color, count = 12, power = 120) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = random(power * 0.35, power);
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: random(0.28, 0.65),
        maxLife: 0.65,
        size: random(1, 3.5),
        color,
      });
    }
  }

  function addFloater(x, y, text, color = COLORS.lime) {
    floaters.push({ x, y, text, color, life: 0.8 });
  }

  function spawnPowerUp(x, y) {
    const roll = Math.random();
    const type =
      roll < 0.2
        ? "repair"
        : roll < 0.4
          ? "rapid"
          : roll < 0.62
            ? "double"
            : roll < 0.84
              ? "triple"
              : "barrier";
    powerUps.push({
      x: x - 12,
      y,
      w: 24,
      h: 24,
      type,
      speed: 82,
      phase: Math.random() * Math.PI * 2,
    });
  }

  function collectPowerUp(powerUp) {
    if (powerInventory.length >= 3) powerInventory.shift();
    powerInventory.push(powerUp.type);
    powerUp.dead = true;
    spawnParticles(powerUp.x + 12, powerUp.y + 12, POWER_COLORS[powerUp.type], 18, 110);
    addFloater(
      player.x + player.w / 2,
      player.y - 10,
      `${POWER_NAMES[powerUp.type]} STORED`,
      POWER_COLORS[powerUp.type],
    );
    setStatus(`${POWER_NAMES[powerUp.type]} STORED · PRESS S TO ACTIVATE`);
    tone(340, 0.22, "sine", 0.04, 380);
  }

  function activatePowerUp() {
    if (state !== "playing" || !powerInventory.length) return;
    const type = powerInventory.shift();
    if (type === "repair") health = Math.min(getMaxHealth(), health + 40);
    if (type === "rapid") rapidFireTimer = Math.max(rapidFireTimer, 9);
    if (type === "double") {
      doubleShotTimer = Math.max(doubleShotTimer, 10);
      spreadShotTimer = 0;
    }
    if (type === "triple") {
      spreadShotTimer = Math.max(spreadShotTimer, 10);
      doubleShotTimer = 0;
    }
    if (type === "barrier") barrierCharges = Math.min(3, barrierCharges + 1);
    addFloater(
      player.x + player.w / 2,
      player.y - 10,
      `${POWER_NAMES[type]} ACTIVE`,
      POWER_COLORS[type],
    );
    spawnParticles(player.x + player.w / 2, player.y, POWER_COLORS[type], 20, 130);
    setStatus(`${POWER_NAMES[type]} POWER-UP ACTIVATED`);
    updateHud();
    tone(420, 0.24, "sine", 0.045, 420);
  }

  function updatePowerUps(dt) {
    rapidFireTimer = Math.max(0, rapidFireTimer - dt);
    doubleShotTimer = Math.max(0, doubleShotTimer - dt);
    spreadShotTimer = Math.max(0, spreadShotTimer - dt);

    for (const powerUp of powerUps) {
      powerUp.y += powerUp.speed * dt;
      powerUp.phase += dt * 4;
      if (overlap(powerUp, player)) collectPowerUp(powerUp);
    }
    powerUps = powerUps.filter((powerUp) => powerUp.y < H + 30 && !powerUp.dead);
  }

  function startReload() {
    if (state !== "playing" || reloadTimer > 0 || ammo >= getMagazineSize()) return;
    reloadTimer = getReloadDuration();
    setStatus("RELOADING WEAPON SYSTEM");
    tone(120, 0.08, "square", 0.018, 40);
  }

  function updateReload(dt) {
    if (reloadTimer <= 0) return;
    reloadTimer -= dt;
    if (reloadTimer <= 0) {
      reloadTimer = 0;
      ammo = getMagazineSize();
      setStatus("WEAPONS RELOADED");
      tone(260, 0.11, "square", 0.025, 180);
    }
  }

  function shoot() {
    const maxShots = difficulty.maxPlayerShots + (rapidFireTimer > 0 ? 3 : 0);
    if (reloadTimer > 0) return;
    if (ammo <= 0) {
      startReload();
      return;
    }
    if (player.cooldown > 0 || playerShots.length >= maxShots) return;
    const shotAngles =
      spreadShotTimer > 0 ? [-170, 0, 170] : doubleShotTimer > 0 ? [-70, 70] : [0];
    for (const velocityX of shotAngles) {
      playerShots.push({
        x: player.x + player.w / 2 - 2,
        y: player.y - 11,
        w: ownsItem("nova") ? 7 : 4,
        h: ownsItem("nova") ? 19 : 15,
        speed: 570 * (ownsItem("ion") ? 1.2 : 1) * (ownsItem("omega") ? 1.15 : 1),
        vx: velocityX,
        pierce: ownsItem("phase") ? 1 : 0,
        damage: (ownsItem("nova") ? 2 : 1) + (ownsItem("omega") ? 1 : 0),
      });
    }
    ammo -= 1;
    player.cooldown =
      difficulty.playerCooldown *
      (rapidFireTimer > 0 ? 0.42 : 1) *
      (ownsItem("reactor") ? 0.75 : 1) *
      (ownsItem("chronocore") ? 0.85 : 1);
    tone(540, 0.07, "square", 0.025, 160);
    if (ammo <= 0) startReload();
  }

  function enemyShoot() {
    const possibleShooters = invaders.filter(
      (alien) =>
        alien.alive &&
        !invaders.some(
          (other) => other.alive && other.col === alien.col && other.row > alien.row,
        ),
    );
    if (!possibleShooters.length) return;

    let shooter;
    if (Math.random() < difficulty.aimChance) {
      shooter = possibleShooters.reduce((closest, alien) =>
        Math.abs(alien.x - player.x) < Math.abs(closest.x - player.x) ? alien : closest,
      );
    } else {
      shooter = possibleShooters[Math.floor(Math.random() * possibleShooters.length)];
    }

    enemyShots.push({
      x: shooter.x + shooter.w / 2 - 2,
      y: shooter.y + shooter.h,
      w: 5,
      h: 16,
      speed: (220 + wave * 15) * difficulty.projectileSpeed,
      phase: Math.random() * 5,
    });
    tone(100, 0.06, "sawtooth", 0.012, -20);
  }

  function hitPlayer() {
    if (player.invincible > 0) return;
    if (barrierCharges > 0) {
      barrierCharges -= 1;
      player.invincible = 0.55;
      shake = 0.14;
      spawnParticles(player.x + player.w / 2, player.y + player.h / 2, COLORS.coral, 20, 145);
      addFloater(player.x + player.w / 2, player.y - 8, "BLOCKED", COLORS.coral);
      setStatus(`BARRIER ABSORBED HIT · ${barrierCharges} CHARGE${barrierCharges === 1 ? "" : "S"}`);
      tone(190, 0.2, "sine", 0.04, 280);
      return;
    }
    if (gameMode === "adventure") {
      adventureCombo = 0;
      adventureComboTimer = 0;
    }
    health = Math.max(0, health - difficulty.hitDamage);
    player.invincible = 0.65;
    shake = 0.2;
    flash = 0.08;
    spawnParticles(
      player.x + player.w / 2,
      player.y + player.h / 2,
      SHIP_COLORS[shipColorKey],
      12,
      120,
    );
    tone(260, 0.18, "sawtooth", 0.04, -110);
    updateHud();

    if (health > 0) {
      setStatus(`HULL HIT · INTEGRITY ${health}%`);
      return;
    }

    lives -= 1;
    shake = 0.5;
    flash = 0.15;
    spawnParticles(
      player.x + player.w / 2,
      player.y + player.h / 2,
      SHIP_COLORS[shipColorKey],
      34,
      220,
    );
    tone(220, 0.38, "sawtooth", 0.055, -170);

    if (lives <= 0) {
      updateHud();
      gameOver();
      return;
    }

    health = getMaxHealth();
    player = createPlayer();
    enemyShots = [];
    ammo = getMagazineSize();
    reloadTimer = 0;
    updateHud();
    setStatus(`SHIP LOST · ${lives} REMAINING`);
  }

  function updatePlaying(dt) {
    elapsed += dt;
    if (gameMode === "adventure") {
      adventureComboTimer = Math.max(0, adventureComboTimer - dt);
      if (adventureComboTimer <= 0) adventureCombo = 0;
    }
    player.cooldown = Math.max(0, player.cooldown - dt);
    player.invincible = Math.max(0, player.invincible - dt);
    updateReload(dt);

    const direction = Number(keys.right) - Number(keys.left);
    player.x = clamp(player.x + direction * player.speed * dt, 22, W - player.w - 22);
    player.tilt += (direction - player.tilt) * Math.min(1, dt * 10);
    if (keys.fire) shoot();

    for (const shot of playerShots) {
      shot.y -= shot.speed * dt;
      shot.x += shot.vx * dt;
    }
    for (const shot of enemyShots) {
      shot.y += shot.speed * dt;
      shot.x += (shot.vx || 0) * dt;
      shot.phase += dt * 12;
    }

    updateInvaders(dt);
    updateBoss(dt);
    updateSaucer(dt);
    updatePowerUps(dt);
    resolveCollisions();

    playerShots = playerShots.filter(
      (shot) => shot.y + shot.h > 0 && shot.x > -20 && shot.x < W + 20 && !shot.dead,
    );
    enemyShots = enemyShots.filter((shot) => shot.y < H + 20 && !shot.dead);
    shields = shields.filter((block) => block.health > 0);

    if (!boss && invaders.every((alien) => !alien.alive) && state === "playing") {
      const adventureComplete = gameMode === "adventure" && wave >= 15;
      const galaxySaved = gameMode === "adventure" && wave % 3 === 0;
      const milestoneItem =
        gameMode === "adventure" ? { 5: "starcollector", 10: "chronocore", 15: "omega" }[wave] : null;
      if (milestoneItem && !unlockedSecrets.includes(milestoneItem)) {
        unlockedSecrets.push(milestoneItem);
      }
      const milestoneBonus = milestoneItem ? 100 : 0;
      const milestoneMessage = milestoneItem
        ? ` Milestone bonus: ₿100. Secret shop item unlocked: ${SHOP_ITEMS[milestoneItem].name}.`
        : "";
      state = adventureComplete ? "adventurecomplete" : "waveclear";
      const reward = difficulty.waveReward + milestoneBonus + (adventureComplete ? 2000 : 0);
      crypto += reward;
      saveEconomy();
      updateHud();
      if (adventureComplete) {
        setStatus(`ADVENTURE COMPLETE · ₿ ${reward} EARNED`);
        showMessage(
          "ALL FIVE GALAXIES SAVED",
          "UNIVERSE SAVED",
          `You stopped the destruction of every galaxy, completed all 15 stages, and earned ₿ ${reward}.${milestoneMessage}`,
          "PLAY AGAIN",
          "RETURN TO MENU",
        );
      } else {
        setStatus(`SECTOR CLEARED · ₿ ${reward} EARNED`);
        if (galaxySaved) {
          showMessage(
            "GALAXY RESCUED",
            `${getAdventureGalaxy().name} SAVED`,
            `Destruction prevented. You earned ₿ ${reward}. Next jump: ${getAdventureGalaxy(wave + 1).name}.${milestoneMessage}`,
            "JUMP TO NEXT GALAXY",
            "OPEN SHOP",
          );
        } else {
          showMessage(
            gameMode === "adventure"
              ? `ADVENTURE STAGE ${wave}/15 COMPLETE`
              : "FORMATION DESTROYED",
            "WAVE CLEAR",
            gameMode === "adventure"
              ? `${getAdventureGalaxy().threat} Stage secured for ₿ ${reward}.${milestoneMessage}`
              : `Sector secured. You earned ₿ ${reward}. Continue to wave ${wave + 1}.`,
            "NEXT WAVE",
            "OPEN SHOP",
          );
        }
      }
      tone(330, 0.14, "square", 0.03, 220);
    }
  }

  function startNextWave() {
    if (state !== "waveclear") return;
    wave += 1;
    player = createPlayer();
    createWave();
    updateHud();
    ui.messagePanel.classList.add("hidden");
    state = "playing";
    lastTime = performance.now();
  }

  function updateAdventureEnemies(dt) {
    const alive = invaders.filter((alien) => alien.alive);
    let activeDivers = alive.filter((alien) => alien.diving).length;
    for (const alien of alive) {
      if (alien.launchDelay > 0) {
        alien.launchDelay -= dt;
        continue;
      }
      const previousX = alien.x;
      alien.phase += dt * (alien.role === "scout" ? 2.2 : 1.25);
      alien.diveTimer -= dt;
      if (
        !alien.diving &&
        alien.role !== "bomber" &&
        alien.diveTimer <= 0 &&
        alien.y > 45 &&
        alien.y < H * 0.42 &&
        activeDivers < 2
      ) {
        alien.diving = true;
        alien.diveTargetX = player.x + player.w / 2 - alien.w / 2;
        activeDivers += 1;
        tone(185, 0.09, "sawtooth", 0.018, 120);
      }

      const speedPulse =
        alien.motion === "flare" ? 1 + Math.max(0, Math.sin(alien.phase * 2)) * 0.5 : 1;
      alien.y +=
        alien.speed * difficulty.moveSpeed * speedPulse * (alien.diving ? 2.15 : 1) * dt;
      let offset = Math.sin(alien.phase) * alien.amplitude;
      if (alien.motion === "phase") offset += Math.sin(alien.phase * 3.1) * 28;
      if (alien.motion === "orbit") {
        offset = Math.sin(alien.phase * 0.8) * alien.amplitude;
        alien.y += Math.cos(alien.phase * 1.6) * 18 * dt;
      }
      if (alien.motion === "zigzag") offset = Math.tanh(Math.sin(alien.phase * 1.7) * 4) * alien.amplitude;
      if (alien.motion === "drift") offset *= 0.48;
      if (alien.motion === "flare") offset = Math.sin(alien.phase * 1.8) * alien.amplitude;
      if (alien.diving) {
        alien.x += (alien.diveTargetX - alien.x) * Math.min(1, dt * 2.4);
        alien.x += Math.sin(alien.phase * 4) * 42 * dt;
      } else {
        const entryCurve =
          alien.y < 115 ? Math.sin(clamp((alien.y + 80) / 195, 0, 1) * Math.PI) * 125 : 0;
        alien.x = alien.baseX + offset + entryCurve * Math.sin(alien.phase * 0.55);
      }
      alien.x = clamp(alien.x, 18, W - alien.w - 18);
      alien.bank +=
        (clamp((alien.x - previousX) * 0.028, -0.48, 0.48) - alien.bank) *
        Math.min(1, dt * 9);

      alien.fireTimer -= dt;
      if (
        alien.fireTimer <= 0 &&
        alien.y > 25 &&
        alien.y < H * 0.68 &&
        (alien.role !== "scout" || alien.faction === "solar")
      ) {
        const centerX = alien.x + alien.w / 2;
        const aimedVelocity = clamp((player.x + player.w / 2 - centerX) * 0.28, -80, 80);
        let spreads = alien.role === "bomber" ? [-55, 55] : [0];
        if (alien.faction === "nebula" && alien.role === "bomber") spreads = [-80, 0, 80];
        if (alien.faction === "moon" && alien.role === "fighter") spreads = [-35, 35];
        if (alien.faction === "ice" && alien.role === "bomber") spreads = [0];
        if (alien.faction === "solar" && alien.role === "fighter") spreads = [-60, 0, 60];
        const shotSpeed =
          (205 + wave * 8) *
          difficulty.projectileSpeed *
          (alien.faction === "ice" ? 0.78 : alien.faction === "solar" ? 1.28 : 1);
        for (const spread of spreads) {
          enemyShots.push({
            x: centerX - 3,
            y: alien.y + alien.h,
            w: alien.faction === "ice" ? 9 : 6,
            h: alien.faction === "ice" ? 20 : 16,
            speed: shotSpeed,
            vx: aimedVelocity + spread,
            phase: Math.random() * 5,
          });
        }
        const fireRate = alien.faction === "nebula" || alien.faction === "solar" ? 0.72 : 1;
        alien.fireTimer = random(1.1, 2.2) * difficulty.fireInterval * fireRate;
      }

      if (overlap(alien, player)) {
        alien.alive = false;
        hitPlayer();
      } else if (alien.y > H + 35) {
        alien.alive = false;
        hitPlayer();
        setStatus("ENEMY BREACHED THE GALAXY DEFENSE LINE");
      }
    }
  }

  function updateInvaders(dt) {
    if (gameMode === "adventure") {
      updateAdventureEnemies(dt);
      return;
    }
    const alive = invaders.filter((alien) => alien.alive);
    if (!alive.length) return;

    const speedBoost = 1 + (invaders.length - alive.length) / Math.max(10, invaders.length * 0.25);
    const dx = alienDirection * formationSpeed * speedBoost * dt;
    const minX = Math.min(...alive.map((alien) => alien.x));
    const maxX = Math.max(...alive.map((alien) => alien.x + alien.w));
    let descend = false;

    if ((alienDirection > 0 && maxX + dx > W - 28) || (alienDirection < 0 && minX + dx < 28)) {
      alienDirection *= -1;
      descend = true;
      tone(72, 0.05, "square", 0.01);
    }

    for (const alien of alive) {
      if (descend) alien.y += 16;
      else alien.x += dx;
      alien.frame = Math.floor(elapsed * (2.8 + speedBoost)) % 2;

      if (alien.y + alien.h >= player.y - 4) {
        gameOver();
        return;
      }

      for (const block of shields) {
        if (overlap(alien, block)) block.health = 0;
      }
    }

    alienFireTimer -= dt;
    if (alienFireTimer <= 0) {
      enemyShoot();
      alienFireTimer =
        Math.max(0.16, 1.1 - wave * 0.055 - speedBoost * 0.09) *
        difficulty.fireInterval *
        random(0.65, 1.25);
    }
  }

  function updateBoss(dt) {
    if (!boss) return;
    boss.x += boss.vx * dt;
    boss.phase += dt;
    if (boss.x <= 28 || boss.x + boss.w >= W - 28) {
      boss.vx *= -1;
      boss.x = clamp(boss.x, 28, W - boss.w - 28);
    }

    boss.fireTimer -= dt;
    if (boss.fireTimer <= 0) {
      const centerX = boss.x + boss.w / 2;
      const aimedVelocity = clamp((player.x + player.w / 2 - centerX) * 0.42, -115, 115);
      for (const spread of [-95, 0, 95]) {
        enemyShots.push({
          x: centerX - 3,
          y: boss.y + boss.h - 4,
          w: 7,
          h: 19,
          speed: (180 + wave * 10) * difficulty.projectileSpeed,
          vx: aimedVelocity + spread,
          phase: Math.random() * 5,
        });
      }
      boss.fireTimer = Math.max(0.34, 1.25 * difficulty.fireInterval) * random(0.8, 1.15);
      tone(75, 0.11, "sawtooth", 0.025, 45);
    }
  }

  function updateSaucer(dt) {
    if (!saucer) {
      saucerTimer -= dt;
      if (saucerTimer <= 0) {
        const fromLeft = Math.random() > 0.5;
        saucer = {
          x: fromLeft ? -82 : W + 12,
          y: 62,
          w: 68,
          h: 28,
          vx: fromLeft ? 92 : -92,
        };
        tone(150, 0.24, "sine", 0.018, 60);
      }
      return;
    }

    saucer.x += saucer.vx * dt;
    if (saucer.x > W + 90 || saucer.x < -100) {
      saucer = null;
      saucerTimer = random(9, 16);
    }
  }

  function resolveCollisions() {
    for (const shot of playerShots) {
      if (shot.dead) continue;

      for (const alien of invaders) {
        if (alien.alive && overlap(shot, alien)) {
          alien.health = (alien.health || 1) - (shot.damage || 1);
          shot.dead = shot.pierce <= 0;
          if (shot.pierce > 0) shot.pierce -= 1;
          if (alien.health > 0) {
            spawnParticles(shot.x, shot.y, alienColor(alien), 5, 55);
            addFloater(alien.x + alien.w / 2, alien.y, `${alien.health} HP`, alienColor(alien));
            tone(105, 0.06, "square", 0.018, -15);
            break;
          }

          alien.alive = false;
          if (gameMode === "adventure") {
            adventureCombo += 1;
            adventureComboTimer = 2.25;
          }
          const comboMultiplier =
            gameMode === "adventure" ? Math.min(5, 1 + (adventureCombo - 1) * 0.25) : 1;
          const points = Math.round(
            [10, 20, 30][alien.type] * difficulty.scoreMultiplier * comboMultiplier,
          );
          score += points;
          crypto += 1;
          saveEconomy();
          if (alien.hasPowerUp) {
            spawnPowerUp(alien.x + alien.w / 2, alien.y + alien.h / 2);
          }
          spawnParticles(alien.x + alien.w / 2, alien.y + alien.h / 2, alienColor(alien), 15);
          addFloater(
            alien.x + alien.w / 2,
            alien.y,
            `${alien.enemyName ? `${alien.enemyName} · ` : ""}+${points} · ₿1${adventureCombo > 1 ? ` · x${adventureCombo}` : ""}`,
          );
          shake = Math.max(shake, 0.08);
          tone(120 + alien.type * 45, 0.12, "square", 0.035, -50);
          updateHud();
          break;
        }
      }

      if (!shot.dead && boss && overlap(shot, boss)) {
        boss.health -= shot.damage || 1;
        shot.dead = true;
        spawnParticles(shot.x, shot.y, boss.core, 6, 65);
        tone(105, 0.055, "square", 0.018, -20);

        if (boss.health <= 0) {
          const bossReward = 100 + wave * 20;
          const bossScore = Math.round(1000 * difficulty.scoreMultiplier);
          crypto += bossReward;
          score += bossScore;
          saveEconomy();
          spawnParticles(boss.x + boss.w / 2, boss.y + boss.h / 2, boss.color, 70, 260);
          addFloater(
            boss.x + boss.w / 2,
            boss.y,
            `BOSS DOWN · ₿ ${bossReward}`,
            COLORS.gold,
          );
          spawnPowerUp(boss.x + boss.w * 0.25, boss.y + boss.h);
          spawnPowerUp(boss.x + boss.w * 0.5, boss.y + boss.h);
          spawnPowerUp(boss.x + boss.w * 0.75, boss.y + boss.h);
          boss = null;
          enemyShots = [];
          shake = 0.7;
          flash = 0.18;
          updateHud();
          tone(380, 0.5, "sawtooth", 0.055, -260);
        }
      }

      if (!shot.dead && saucer && overlap(shot, saucer)) {
        const bonus = Math.round(
          [100, 150, 300][Math.floor(Math.random() * 3)] * difficulty.scoreMultiplier,
        );
        score += bonus;
        crypto += 5;
        saveEconomy();
        shot.dead = true;
        spawnPowerUp(saucer.x + saucer.w / 2, saucer.y + saucer.h);
        spawnParticles(saucer.x + saucer.w / 2, saucer.y + 10, COLORS.coral, 28, 175);
        addFloater(saucer.x + saucer.w / 2, saucer.y, `+${bonus} · ₿5`, COLORS.gold);
        saucer = null;
        saucerTimer = random(10, 16);
        shake = 0.25;
        tone(440, 0.22, "sawtooth", 0.04, -230);
        updateHud();
      }

      for (const block of shields) {
        if (!shot.dead && block.health > 0 && overlap(shot, block)) {
          block.health -= 1;
          shot.dead = true;
          spawnParticles(shot.x, shot.y, COLORS.lime, 3, 40);
        }
      }
    }

    for (const shot of enemyShots) {
      if (shot.dead) continue;
      if (overlap(shot, player) && player.invincible <= 0) {
        shot.dead = true;
        hitPlayer();
        continue;
      }

      for (const block of shields) {
        if (block.health > 0 && overlap(shot, block)) {
          block.health -= 1;
          shot.dead = true;
          spawnParticles(shot.x, shot.y, COLORS.lime, 4, 45);
          break;
        }
      }
    }
  }

  function updateAmbient(dt) {
    for (const star of stars) {
      star.y += star.speed * dt * (gameMode === "adventure" ? 5.5 : 1);
      star.pulse += dt;
      if (star.y > H) {
        star.y = -2;
        star.x = Math.random() * W;
      }
    }

    for (const particle of particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= 0.985;
      particle.vy *= 0.985;
      particle.life -= dt;
    }
    particles = particles.filter((particle) => particle.life > 0);

    for (const floater of floaters) {
      floater.y -= 28 * dt;
      floater.life -= dt;
    }
    floaters = floaters.filter((floater) => floater.life > 0);
    shake = Math.max(0, shake - dt);
    flash = Math.max(0, flash - dt);
  }

  function alienColor(alien) {
    if (alien.color) return alien.color;
    return [COLORS.lime, COLORS.cyan, COLORS.coral][alien.type];
  }

  function drawBackground() {
    const theme = WORLD_THEMES[getActiveWorld()];
    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, theme.top);
    gradient.addColorStop(0.65, theme.middle);
    gradient.addColorStop(1, theme.bottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    for (const star of stars) {
      ctx.globalAlpha = star.alpha * (0.72 + Math.sin(star.pulse * 1.7) * 0.28);
      ctx.fillStyle = star.size > 1 ? COLORS.cyan : "#dfe8ff";
      ctx.fillRect(Math.round(star.x), Math.round(star.y), star.size, star.size);
    }
    ctx.restore();

    const horizon = H - 36;
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;
    for (let x = -W; x < W * 2; x += 80) {
      ctx.beginPath();
      ctx.moveTo(W / 2, horizon - 60);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = horizon - 50; y < H; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    ctx.fillStyle = theme.accent;
    ctx.globalAlpha = 0.36;
    ctx.fillRect(22, 36, 42, 1);
    ctx.fillRect(W - 64, 36, 42, 1);
    ctx.globalAlpha = 1;
    ctx.font = "9px 'Space Mono', monospace";
    ctx.fillStyle = "rgba(127, 140, 168, 0.55)";
    ctx.fillText(gameMode === "adventure" ? getAdventureGalaxy().name : theme.label, 22, 28);
    if (gameMode === "adventure") {
      ctx.textAlign = "center";
      ctx.fillStyle = theme.accent;
      ctx.fillText(
        `GALAXY ${Math.floor((wave - 1) / 3) + 1}/5 · PREVENT DESTRUCTION`,
        W / 2,
        28,
      );
    }
    ctx.textAlign = "right";
    ctx.fillText("ALT 02048", W - 22, 28);
    ctx.textAlign = "left";
  }

  function drawPlayer() {
    if (!player || (player.invincible > 0 && Math.floor(elapsed * 10) % 2 === 0)) return;
    const x = player.x;
    const y = player.y;

    ctx.save();
    ctx.translate(x + player.w / 2, y + player.h / 2);
    ctx.rotate(player.tilt * 0.035);
    ctx.translate(-player.w / 2, -player.h / 2);
    const shipColor = SHIP_COLORS[shipColorKey];

    const glow = ctx.createRadialGradient(23, 28, 0, 23, 28, 35);
    glow.addColorStop(0, SHIP_GLOWS[shipColorKey]);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(-18, -8, 82, 56);

    if (barrierCharges > 0) {
      ctx.strokeStyle = `rgba(255, 94, 111, ${0.55 + Math.sin(elapsed * 7) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = COLORS.coral;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(23, 14, 34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.fillStyle = shipColor;
    ctx.shadowColor = shipColor;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    if (shipStyle === "wing") {
      ctx.moveTo(23, 0);
      ctx.lineTo(30, 10);
      ctx.lineTo(46, 17);
      ctx.lineTo(42, 27);
      ctx.lineTo(29, 22);
      ctx.lineTo(23, 27);
      ctx.lineTo(17, 22);
      ctx.lineTo(4, 27);
      ctx.lineTo(0, 17);
      ctx.lineTo(16, 10);
    } else if (shipStyle === "tank") {
      ctx.moveTo(17, 2);
      ctx.lineTo(29, 2);
      ctx.lineTo(32, 10);
      ctx.lineTo(40, 12);
      ctx.lineTo(44, 27);
      ctx.lineTo(29, 24);
      ctx.lineTo(26, 28);
      ctx.lineTo(20, 28);
      ctx.lineTo(17, 24);
      ctx.lineTo(2, 27);
      ctx.lineTo(6, 12);
      ctx.lineTo(14, 10);
    } else {
      ctx.moveTo(23, 0);
      ctx.lineTo(31, 11);
      ctx.lineTo(43, 15);
      ctx.lineTo(46, 27);
      ctx.lineTo(30, 23);
      ctx.lineTo(26, 27);
      ctx.lineTo(20, 27);
      ctx.lineTo(16, 23);
      ctx.lineTo(0, 27);
      ctx.lineTo(3, 15);
      ctx.lineTo(15, 11);
    }
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#07111a";
    ctx.fillRect(19, 9, 8, 9);
    ctx.fillStyle = COLORS.white;
    ctx.fillRect(22, 5, 2, 8);
    ctx.fillStyle = COLORS.lime;
    const flameHeight = 6 + Math.random() * 7;
    ctx.fillRect(19, 27, 3, flameHeight);
    ctx.fillRect(25, 27, 3, flameHeight - 2);
    ctx.restore();
  }

  function drawAdventureEnemy(alien) {
    const color = alien.color;
    const coreColor = alien.core || color;
    ctx.save();
    ctx.translate(Math.round(alien.x + alien.w / 2), Math.round(alien.y + alien.h / 2));
    ctx.rotate(alien.bank || 0);
    ctx.translate(-alien.w / 2, -alien.h / 2);
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    if (alien.faction === "void") ctx.globalAlpha = 0.76 + Math.sin(elapsed * 8) * 0.16;
    ctx.beginPath();

    if (alien.role === "bomber") {
      ctx.moveTo(alien.w / 2, alien.h);
      ctx.lineTo(alien.w * 0.64, alien.h * 0.58);
      ctx.lineTo(alien.w, alien.h * 0.36);
      ctx.lineTo(alien.w * 0.82, 3);
      ctx.lineTo(alien.w * 0.58, alien.h * 0.2);
      ctx.lineTo(alien.w * 0.42, alien.h * 0.2);
      ctx.lineTo(alien.w * 0.18, 3);
      ctx.lineTo(0, alien.h * 0.36);
      ctx.lineTo(alien.w * 0.36, alien.h * 0.58);
    } else if (alien.role === "fighter") {
      ctx.moveTo(alien.w / 2, alien.h);
      ctx.lineTo(alien.w * 0.66, alien.h * 0.52);
      ctx.lineTo(alien.w, alien.h * 0.2);
      ctx.lineTo(alien.w * 0.65, alien.h * 0.3);
      ctx.lineTo(alien.w / 2, 0);
      ctx.lineTo(alien.w * 0.35, alien.h * 0.3);
      ctx.lineTo(0, alien.h * 0.2);
      ctx.lineTo(alien.w * 0.34, alien.h * 0.52);
    } else {
      ctx.moveTo(alien.w / 2, alien.h);
      ctx.lineTo(alien.w, 4);
      ctx.lineTo(alien.w * 0.62, alien.h * 0.28);
      ctx.lineTo(alien.w / 2, 0);
      ctx.lineTo(alien.w * 0.38, alien.h * 0.28);
      ctx.lineTo(0, 4);
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.shadowColor = coreColor;
    ctx.shadowBlur = 12;
    ctx.fillStyle = coreColor;
    ctx.fillRect(alien.w / 2 - 3, alien.h * 0.26, 6, alien.h * 0.42);
    if (alien.faction === "void") {
      ctx.strokeStyle = coreColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, alien.w - 6, alien.h - 6);
    } else if (alien.faction === "moon") {
      ctx.fillStyle = COLORS.white;
      ctx.beginPath();
      ctx.arc(8, alien.h * 0.45, 4, 0, Math.PI * 2);
      ctx.arc(alien.w - 8, alien.h * 0.45, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (alien.faction === "nebula") {
      ctx.fillStyle = COLORS.coral;
      ctx.fillRect(1, alien.h * 0.48, 8, 4);
      ctx.fillRect(alien.w - 9, alien.h * 0.48, 8, 4);
    } else if (alien.faction === "ice") {
      ctx.save();
      ctx.translate(alien.w / 2, alien.h * 0.47);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = COLORS.white;
      ctx.fillRect(-5, -5, 10, 10);
      ctx.restore();
    } else if (alien.faction === "solar") {
      ctx.fillStyle = COLORS.gold;
      const flame = 5 + Math.random() * 5;
      ctx.fillRect(alien.w * 0.32, -flame, 4, flame + 3);
      ctx.fillRect(alien.w * 0.64, -flame + 2, 4, flame + 1);
    }
    if (alien.hasPowerUp) {
      ctx.fillStyle = Math.sin(elapsed * 9) > 0 ? COLORS.white : COLORS.gold;
      ctx.fillRect(alien.w / 2 - 5, alien.h * 0.48, 10, 7);
    }
    ctx.restore();

    if (alien.maxHealth > 1 && alien.health < alien.maxHealth) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fillRect(alien.x, alien.y - 6, alien.w, 3);
      ctx.fillStyle = coreColor;
      ctx.fillRect(alien.x, alien.y - 6, alien.w * (alien.health / alien.maxHealth), 3);
    }
  }

  function drawAlien(alien) {
    if (!alien.alive) return;
    if (alien.role) {
      drawAdventureEnemy(alien);
      return;
    }
    const x = Math.round(alien.x);
    const y = Math.round(alien.y);
    const color = alienColor(alien);
    const pixel = 4;
    const patterns = [
      alien.frame
        ? ["00111100", "11111111", "11011011", "11111111", "00100100", "01011010"]
        : ["00111100", "11111111", "11011011", "11111111", "01011010", "10000001"],
      alien.frame
        ? ["00111100", "01111110", "11111111", "11011011", "01111110", "10100101"]
        : ["00111100", "01111110", "11111111", "11011011", "01111110", "01011010"],
      alien.frame
        ? ["00011000", "00111100", "01111110", "11011011", "11111111", "00100100"]
        : ["00011000", "00111100", "01111110", "11011011", "11111111", "01011010"],
    ];

    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 7;
    ctx.fillStyle = color;
    const pattern = patterns[alien.type];
    for (let row = 0; row < pattern.length; row += 1) {
      for (let col = 0; col < pattern[row].length; col += 1) {
        if (pattern[row][col] === "1") ctx.fillRect(x + col * pixel + 3, y + row * pixel, pixel, pixel);
      }
    }
    if (alien.hasPowerUp) {
      ctx.shadowColor = COLORS.gold;
      ctx.shadowBlur = 12;
      ctx.fillStyle = Math.sin(elapsed * 8) > 0 ? COLORS.white : COLORS.gold;
      ctx.fillRect(x + 17, y + 9, 7, 7);
    }
    ctx.restore();
  }

  function drawBoss() {
    if (!boss) return;
    const pulse = 0.72 + Math.sin(boss.phase * 5) * 0.22;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.shadowColor = boss.color;
    ctx.shadowBlur = 18;
    ctx.fillStyle = boss.color;
    ctx.beginPath();
    ctx.moveTo(90, 0);
    ctx.lineTo(122, 14);
    ctx.lineTo(174, 20);
    ctx.lineTo(158, 40);
    ctx.lineTo(176, 66);
    ctx.lineTo(118, 57);
    ctx.lineTo(90, 72);
    ctx.lineTo(62, 57);
    ctx.lineTo(4, 66);
    ctx.lineTo(22, 40);
    ctx.lineTo(6, 20);
    ctx.lineTo(58, 14);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = boss.core;
    ctx.shadowBlur = 22;
    ctx.globalAlpha = pulse;
    ctx.fillStyle = boss.core;
    ctx.fillRect(72, 22, 36, 30);
    ctx.fillRect(50, 29, 12, 12);
    ctx.fillRect(118, 29, 12, 12);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#071018";
    ctx.fillRect(82, 27, 16, 20);
    ctx.restore();

    const barWidth = 250;
    const healthRatio = Math.max(0, boss.health / boss.maxHealth);
    const barX = W / 2 - barWidth / 2;
    ctx.save();
    ctx.fillStyle = "rgba(3, 8, 15, 0.86)";
    ctx.fillRect(barX - 5, 64, barWidth + 10, 31);
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(barX, 82, barWidth, 6);
    ctx.fillStyle = boss.color;
    ctx.fillRect(barX, 82, barWidth * healthRatio, 6);
    ctx.fillStyle = boss.core;
    ctx.font = "700 9px 'Space Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${boss.name} · ${Math.ceil(boss.health)}/${boss.maxHealth}`, W / 2, 76);
    ctx.restore();
  }

  function drawSaucer() {
    if (!saucer) return;
    ctx.save();
    ctx.translate(Math.round(saucer.x), saucer.y);
    ctx.shadowColor = COLORS.coral;
    ctx.shadowBlur = 16;
    ctx.fillStyle = COLORS.coral;
    ctx.fillRect(12, 7, 44, 5);
    ctx.fillRect(3, 12, 62, 10);
    ctx.fillRect(16, 2, 36, 5);
    ctx.fillRect(10, 22, 48, 3);
    ctx.fillStyle = COLORS.white;
    ctx.fillRect(12, 15, 6, 4);
    ctx.fillRect(31, 15, 6, 4);
    ctx.fillRect(50, 15, 6, 4);
    ctx.restore();
  }

  function drawShields() {
    ctx.save();
    for (const block of shields) {
      ctx.globalAlpha = Math.min(0.9, 0.22 + block.health * 0.3);
      ctx.fillStyle = COLORS.lime;
      ctx.fillRect(Math.round(block.x), Math.round(block.y), Math.ceil(block.w), Math.ceil(block.h));
    }
    ctx.restore();
  }

  function drawPowerUps() {
    const symbols = { repair: "+", rapid: "R", double: "2", triple: "3", barrier: "B" };

    for (const powerUp of powerUps) {
      const centerX = powerUp.x + powerUp.w / 2;
      const centerY = powerUp.y + powerUp.h / 2;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(powerUp.phase * 0.18);
      ctx.shadowColor = POWER_COLORS[powerUp.type];
      ctx.shadowBlur = 14;
      ctx.strokeStyle = POWER_COLORS[powerUp.type];
      ctx.fillStyle = "rgba(3, 8, 15, 0.88)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-10, -10, 20, 20);
      ctx.fill();
      ctx.stroke();
      ctx.rotate(-powerUp.phase * 0.18);
      ctx.fillStyle = POWER_COLORS[powerUp.type];
      ctx.font = "700 12px 'Space Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbols[powerUp.type], 0, 1);
      ctx.restore();
    }
  }

  function drawBoostStatus() {
    const boosts = [];
    if (rapidFireTimer > 0) boosts.push(`RAPID ${Math.ceil(rapidFireTimer)}s`);
    if (doubleShotTimer > 0) boosts.push(`DOUBLE ${Math.ceil(doubleShotTimer)}s`);
    if (spreadShotTimer > 0) boosts.push(`TRIPLE ${Math.ceil(spreadShotTimer)}s`);
    if (barrierCharges > 0) boosts.push(`BARRIER ×${barrierCharges}`);
    if (!boosts.length) return;

    ctx.save();
    ctx.fillStyle = "rgba(3, 8, 15, 0.72)";
    ctx.fillRect(18, H - 30, 118 + boosts.length * 70, 18);
    ctx.fillStyle = COLORS.gold;
    ctx.font = "700 9px 'Space Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(boosts.join("  ·  "), 26, H - 18);
    ctx.restore();
  }

  function drawAdventureCombo() {
    if (gameMode !== "adventure" || adventureCombo < 2) return;
    const width = 132;
    const timerRatio = adventureComboTimer / 2.25;
    ctx.save();
    ctx.fillStyle = "rgba(3, 8, 15, 0.84)";
    ctx.fillRect(W - width - 18, 42, width, 31);
    ctx.fillStyle = COLORS.gold;
    ctx.font = "700 14px 'Space Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText(`COMBO ×${adventureCombo}`, W - 26, 59);
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.fillRect(W - width - 10, 65, width - 16, 3);
    ctx.fillStyle = COLORS.coral;
    ctx.fillRect(W - width - 10, 65, (width - 16) * timerRatio, 3);
    ctx.restore();
  }

  function drawInventory() {
    const x = W - 254;
    const y = H - 68;
    ctx.save();
    ctx.fillStyle = "rgba(3, 8, 15, 0.82)";
    ctx.fillRect(x, y, 236, 50);
    ctx.strokeStyle = "rgba(143, 163, 199, 0.25)";
    ctx.strokeRect(x, y, 236, 50);
    ctx.fillStyle = COLORS.dim;
    ctx.font = "700 8px 'Space Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText("POWER BANK", x + 8, y + 12);
    ctx.textAlign = "right";
    ctx.fillText("S  ACTIVATE", x + 228, y + 12);

    for (let i = 0; i < 3; i += 1) {
      const slotX = x + 8 + i * 75;
      const type = powerInventory[i];
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      ctx.fillRect(slotX, y + 19, 68, 22);
      ctx.strokeStyle = type ? POWER_COLORS[type] : "rgba(143, 163, 199, 0.14)";
      ctx.strokeRect(slotX, y + 19, 68, 22);
      ctx.fillStyle = type ? POWER_COLORS[type] : COLORS.dim;
      ctx.font = "700 8px 'Space Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(type ? POWER_NAMES[type] : "EMPTY", slotX + 34, y + 33);
    }
    ctx.restore();
  }

  function drawAmmoStatus() {
    ctx.save();
    ctx.fillStyle = "rgba(3, 8, 15, 0.78)";
    ctx.fillRect(18, H - 58, 145, 22);
    ctx.font = "700 9px 'Space Mono', monospace";
    ctx.textAlign = "left";
    if (reloadTimer > 0) {
      const progress = 1 - reloadTimer / getReloadDuration();
      ctx.fillStyle = "rgba(255, 209, 102, 0.18)";
      ctx.fillRect(18, H - 58, 145 * progress, 22);
      ctx.fillStyle = COLORS.gold;
      ctx.fillText(`RELOADING ${Math.ceil(reloadTimer * 10) / 10}s`, 26, H - 43);
    } else {
      ctx.fillStyle = ammo <= 3 ? COLORS.coral : COLORS.cyan;
      ctx.fillText(`AMMO ${ammo}/${getMagazineSize()}  ·  R RELOAD`, 26, H - 43);
    }
    ctx.restore();
  }

  function drawShots() {
    ctx.save();
    ctx.shadowBlur = 10;
    for (const shot of playerShots) {
      ctx.shadowColor = COLORS.cyan;
      ctx.fillStyle = COLORS.white;
      ctx.fillRect(shot.x, shot.y, shot.w, shot.h);
      ctx.fillStyle = COLORS.cyan;
      ctx.fillRect(shot.x - 2, shot.y + 6, shot.w + 4, 5);
    }
    for (const shot of enemyShots) {
      ctx.shadowColor = COLORS.coral;
      ctx.fillStyle = COLORS.coral;
      const wiggle = Math.sin(shot.phase) * 3;
      ctx.fillRect(shot.x + wiggle, shot.y, shot.w, shot.h);
      ctx.fillRect(shot.x - wiggle, shot.y + 4, shot.w, 4);
    }
    ctx.restore();
  }

  function drawParticles() {
    ctx.save();
    for (const particle of particles) {
      ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    }
    ctx.font = "700 12px 'Space Mono', monospace";
    ctx.textAlign = "center";
    for (const floater of floaters) {
      ctx.globalAlpha = clamp(floater.life / 0.8, 0, 1);
      ctx.fillStyle = floater.color;
      ctx.fillText(floater.text, floater.x, floater.y);
    }
    ctx.restore();
  }

  function drawSpaceRunner() {
    for (const obstacle of runnerObstacles) {
      const radius = obstacle.w / 2;
      ctx.save();
      ctx.translate(obstacle.x + radius, obstacle.y + radius);
      ctx.rotate(obstacle.rotation);
      ctx.beginPath();
      for (let i = 0; i < obstacle.points.length; i += 1) {
        const angle = (i / obstacle.points.length) * Math.PI * 2;
        const edge = radius * obstacle.points[i];
        const x = Math.cos(angle) * edge;
        const y = Math.sin(angle) * edge;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "#293246";
      ctx.strokeStyle = "#78839b";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#ff5e6f";
      ctx.shadowBlur = 7;
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
      ctx.beginPath();
      ctx.arc(-radius * 0.2, -radius * 0.12, radius * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    for (const orb of runnerOrbs) {
      const cx = orb.x + orb.w / 2;
      const cy = orb.y + orb.h / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4 + orb.phase * 0.1);
      ctx.fillStyle = COLORS.gold;
      ctx.shadowColor = COLORS.gold;
      ctx.shadowBlur = 16;
      ctx.fillRect(-9, -9, 18, 18);
      ctx.rotate(-Math.PI / 4 - orb.phase * 0.1);
      ctx.fillStyle = "#1c1504";
      ctx.font = "700 11px 'Space Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("₿", 0, 1);
      ctx.restore();
    }

    ctx.save();
    ctx.fillStyle = "rgba(3, 8, 15, 0.82)";
    ctx.fillRect(W / 2 - 145, 15, 290, 31);
    ctx.strokeStyle = "rgba(185, 255, 102, 0.3)";
    ctx.strokeRect(W / 2 - 145, 15, 290, 31);
    ctx.fillStyle = COLORS.lime;
    ctx.font = "700 10px 'Space Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      `SPACE RUNNER  ·  ${Math.floor(runnerTime)}s  ·  ₿ ${runnerEarned}`,
      W / 2,
      35,
    );
    ctx.restore();
  }

  function render() {
    const runnerView = ["runner", "runnerpaused", "runover"].includes(state);
    ctx.save();
    if (shake > 0) {
      const amount = Math.min(8, shake * 20);
      ctx.translate(random(-amount, amount), random(-amount, amount));
    }
    drawBackground();
    if (runnerView) {
      drawSpaceRunner();
      drawPlayer();
      drawParticles();
    } else {
      drawShields();
      for (const alien of invaders) drawAlien(alien);
      drawBoss();
      drawSaucer();
      drawPowerUps();
      drawShots();
      drawPlayer();
      drawParticles();
      drawBoostStatus();
    }
    ctx.restore();

    drawAdventureCombo();
    if (["playing", "paused", "waveclear", "gameover"].includes(state)) {
      drawAmmoStatus();
    }
    if (["playing", "paused", "waveclear", "gameover"].includes(state)) {
      drawInventory();
    }

    if (flash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${flash * 2})`;
      ctx.fillRect(0, 0, W, H);
    }

    if (state === "menu") {
      ctx.fillStyle = "rgba(73, 230, 255, 0.1)";
      ctx.fillRect(0, H - 37, W, 1);
    }
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - lastTime) / 1000 || 0);
    lastTime = now;
    if (state === "playing") updatePlaying(dt);
    if (state === "runner") updateSpaceRunner(dt);
    if (state !== "paused" && state !== "runnerpaused") updateAmbient(dt);
    render();
    requestAnimationFrame(loop);
  }

  function setKey(code, pressed) {
    if (code === "ArrowLeft" || code === "KeyA") keys.left = pressed;
    if (code === "ArrowRight" || code === "KeyD") keys.right = pressed;
    if (code === "Space") keys.fire = pressed;
  }

  window.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
    if (event.repeat && ["KeyP", "Escape", "Enter", "KeyR", "KeyS"].includes(event.code)) return;
    setKey(event.code, true);
    if (event.code === "KeyP") togglePause();
    if (event.code === "Escape") {
      if (state === "shop") closeShop();
      else togglePause();
    }
    if (event.code === "KeyR") startReload();
    if (event.code === "KeyS") activatePowerUp();
    if (event.code === "Enter" && (state === "menu" || state === "gameover")) startGame();
    if (event.code === "Enter" && state === "waveclear") startNextWave();
    if (event.code === "Enter" && state === "runover") startSpaceRunner();
    if (event.code === "Enter" && ["adventureover", "adventurecomplete"].includes(state))
      startAdventure();
  });

  window.addEventListener("keyup", (event) => setKey(event.code, false));
  window.addEventListener("blur", () => {
    keys.left = false;
    keys.right = false;
    keys.fire = false;
    if (state === "playing" || state === "runner") togglePause();
  });

  function bindHold(button, key) {
    const activate = (event) => {
      event.preventDefault();
      keys[key] = true;
      if (key === "fire" && state === "playing") shoot();
    };
    const deactivate = (event) => {
      event.preventDefault();
      keys[key] = false;
    };
    button.addEventListener("pointerdown", activate);
    button.addEventListener("pointerup", deactivate);
    button.addEventListener("pointercancel", deactivate);
    button.addEventListener("pointerleave", deactivate);
  }

  function selectDifficulty(key, refreshPreview = true) {
    if (!DIFFICULTIES[key]) return;
    difficultyKey = key;
    difficulty = DIFFICULTIES[key];
    localStorage.setItem("void-patrol-difficulty", key);
    ui.difficultyDescription.textContent = difficulty.description;
    for (const button of ui.difficultyButtons) {
      const selected = button.dataset.difficulty === key;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", selected.toString());
    }
    if (refreshPreview && state === "menu") {
      createWave();
      setStatus(`${difficulty.label} THREAT · SYSTEM READY`);
    }
  }

  function selectShipStyle(style) {
    if (!["dart", "wing", "tank"].includes(style)) return;
    shipStyle = style;
    localStorage.setItem("void-patrol-ship-style", style);
    for (const button of ui.shipStyleButtons) {
      const selected = button.dataset.shipStyle === style;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", selected.toString());
    }
  }

  function selectShipColor(color) {
    if (!SHIP_COLORS[color]) return;
    shipColorKey = color;
    localStorage.setItem("void-patrol-ship-color", color);
    for (const button of ui.shipColorButtons) {
      const selected = button.dataset.shipColor === color;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", selected.toString());
    }
  }

  bindHold(ui.leftButton, "left");
  bindHold(ui.rightButton, "right");
  bindHold(ui.fireButton, "fire");
  for (const button of ui.difficultyButtons) {
    button.addEventListener("click", () => selectDifficulty(button.dataset.difficulty));
  }
  for (const button of ui.shipStyleButtons) {
    button.addEventListener("click", () => selectShipStyle(button.dataset.shipStyle));
  }
  for (const button of ui.shipColorButtons) {
    button.addEventListener("click", () => selectShipColor(button.dataset.shipColor));
  }
  for (const button of ui.shopButtons) {
    button.addEventListener("click", () => buyShopItem(button.dataset.shopItem));
  }
  ui.startButton.addEventListener("click", startGame);
  ui.messageButton.addEventListener("click", () => {
    if (state === "waveclear") startNextWave();
    else if (state === "runover") startSpaceRunner();
    else if (state === "adventureover" || state === "adventurecomplete") startAdventure();
    else startGame();
  });
  ui.menuButton.addEventListener("click", () => {
    if (state === "waveclear") openShop();
    else returnToMenu();
  });
  ui.reloadButton.addEventListener("click", startReload);
  ui.powerButton.addEventListener("click", activatePowerUp);
  ui.pauseButton.addEventListener("click", togglePause);
  ui.shopControlButton.addEventListener("click", openShop);
  ui.runnerButton.addEventListener("click", startSpaceRunner);
  ui.adventureButton.addEventListener("click", startAdventure);
  ui.closeShopButton.addEventListener("click", closeShop);
  ui.quitControlButton.addEventListener("click", () => {
    if (state !== "menu") returnToMenu();
  });
  ui.soundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    ui.soundButton.classList.toggle("muted", !soundEnabled);
    ui.soundButton.setAttribute("aria-label", `${soundEnabled ? "Mute" : "Enable"} sound`);
    if (soundEnabled) tone(440, 0.08, "sine", 0.025, 120);
  });

  highScore = Number.isFinite(highScore) ? highScore : 0;
  health = getMaxHealth();
  initStars();
  player = createPlayer();
  selectDifficulty(difficultyKey, false);
  selectShipStyle(shipStyle);
  selectShipColor(shipColorKey);
  createWave();
  updateHud();
  updateShop();
  setStatus(`${difficulty.label} THREAT · SYSTEM READY`);
  requestAnimationFrame(loop);
})();
