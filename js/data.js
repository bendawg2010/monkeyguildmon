// =====================================================
// ALIMON — DATA: types, moves, species, items, encounters, trainers
// =====================================================
//
// Monkey-guild members as the "monkeyguildmon". Attacks are themed around
// Hoplite weapons (spear, shield, shrink ray, gladius) + Minecraft
// items (diamond sword, TNT, ender pearl, golden apple, etc).
//
// Species names + sprites use placeholders; rename + reskin as needed.

// ----- TYPE CHART -----
// 8 types — keep balanced enough to support a 6-mon meta
const TYPES = {
  MOD:       { name: "Mod",       color: "#5865f2" },  // Discord blurple
  LURKER:    { name: "Lurker",    color: "#36393f" },
  MEMER:     { name: "Memer",     color: "#fee75c" },
  GAMER:     { name: "Gamer",     color: "#eb459e" },
  CODER:     { name: "Coder",     color: "#57f287" },
  STREAMER:  { name: "Streamer",  color: "#ed4245" },
  BOT:       { name: "Bot",       color: "#9aa0a8" },
  ADMIN:     { name: "Admin",     color: "#ffd700" },
};

// Mod beats Spammer; Memer beats Mod; Lurker no-sells Memer; Bot resists everything modestly.
// Simple chart — same structure as brainrot game; just relabeled.
const TYPE_CHART = {
  MOD:      { MEMER: 0.5, BOT: 1.5,  LURKER: 1.0, GAMER: 1.0, CODER: 1.0, STREAMER: 1.0, ADMIN: 0.5 },
  LURKER:   { MEMER: 1.5, MOD:  1.0, GAMER: 0.5, CODER: 1.0, STREAMER: 0.5, BOT: 1.0, ADMIN: 1.0 },
  MEMER:    { MOD: 2.0,   LURKER: 0.5, GAMER: 1.0, CODER: 0.5, STREAMER: 1.5, BOT: 0.5, ADMIN: 1.0 },
  GAMER:    { STREAMER: 1.5, BOT: 1.0,  CODER: 1.5, MEMER: 1.0, MOD: 1.0, LURKER: 1.5, ADMIN: 1.0 },
  CODER:    { BOT: 2.0,   STREAMER: 1.5, ADMIN: 1.0, MOD: 1.0, MEMER: 0.5, GAMER: 0.5, LURKER: 1.0 },
  STREAMER: { LURKER: 2.0, CODER: 0.5, MEMER: 1.0, MOD: 1.0, GAMER: 0.5, BOT: 1.5, ADMIN: 1.0 },
  BOT:      { CODER: 0.5, ADMIN: 0.5, MOD: 1.0, MEMER: 1.5, LURKER: 1.0, GAMER: 1.0, STREAMER: 1.0 },
  ADMIN:    { MOD: 1.5,   BOT: 2.0, CODER: 1.0, MEMER: 1.0, GAMER: 1.0, LURKER: 1.0, STREAMER: 1.0 },
};

function typeEffectiveness(atkType, defTypes) {
  let mult = 1.0;
  for (const t of defTypes) {
    if (TYPE_CHART[atkType] && typeof TYPE_CHART[atkType][t] === "number") {
      mult *= TYPE_CHART[atkType][t];
    }
  }
  return mult;
}

// ----- MOVES -----
// Hoplite weapons + Minecraft items. Each has a `family` so battle.js
// knows which animation shape to use (defined in the MoveAnims library).
const MOVES = {
  // ---- HOPLITE WEAPONS ----
  SPEAR_THRUST:   { name: "Spear Thrust",     type: "MOD",      power: 45, acc: 100, pp: 25, cat: "physical", family: "spear" },
  SHIELD_BASH:    { name: "Shield Bash",      type: "MOD",      power: 40, acc: 100, pp: 20, cat: "physical", family: "shield" },
  GLADIUS_SLASH:  { name: "Gladius Slash",    type: "MOD",      power: 65, acc: 95,  pp: 15, cat: "physical", family: "slash" },
  PHALANX:        { name: "Phalanx Wall",     type: "MOD",      power: 0,  acc: 100, pp: 10, cat: "status",   family: "buff",  status: "def_up" },
  SHRINK_RAY:     { name: "Shrink Ray",       type: "BOT",      power: 0,  acc: 100, pp: 15, cat: "status",   family: "ray",   status: "atk_down" },
  BOMB_TOSS:      { name: "Hoplite Bomb",     type: "GAMER",    power: 75, acc: 90,  pp: 10, cat: "physical", family: "bomb" },

  // ---- MINECRAFT WEAPONS ----
  DIAMOND_SWORD:  { name: "Diamond Sword",    type: "GAMER",    power: 80, acc: 95,  pp: 10, cat: "physical", family: "sword" },
  IRON_PICKAXE:   { name: "Iron Pickaxe",     type: "GAMER",    power: 50, acc: 100, pp: 20, cat: "physical", family: "pickaxe" },
  BOW_SHOT:       { name: "Bow Shot",         type: "STREAMER", power: 60, acc: 100, pp: 15, cat: "physical", family: "arrow" },
  CROSSBOW:       { name: "Crossbow Bolt",    type: "STREAMER", power: 70, acc: 90,  pp: 10, cat: "physical", family: "arrow" },
  TNT:            { name: "TNT Block",        type: "GAMER",    power: 90, acc: 80,  pp: 5,  cat: "physical", family: "explosion" },
  CREEPER_HISS:   { name: "Creeper Hiss",     type: "LURKER",   power: 100,acc: 75,  pp: 5,  cat: "special",  family: "explosion" },
  ENDER_PEARL:    { name: "Ender Pearl",      type: "CODER",    power: 50, acc: 100, pp: 10, cat: "special",  family: "teleport" },
  FIRE_CHARGE:    { name: "Fire Charge",      type: "STREAMER", power: 55, acc: 100, pp: 20, cat: "special",  family: "fireball" },
  LAVA_BUCKET:    { name: "Lava Bucket",      type: "STREAMER", power: 85, acc: 85,  pp: 5,  cat: "special",  family: "lava" },
  SPLASH_POTION:  { name: "Splash Potion",    type: "CODER",    power: 0,  acc: 100, pp: 15, cat: "status",   family: "potion", status: "atk_down" },
  GOLDEN_APPLE:   { name: "Golden Apple",     type: "ADMIN",    power: 0,  acc: 100, pp: 10, cat: "status",   family: "heal",   status: "heal" },
  SNOWBALL:       { name: "Snowball",         type: "LURKER",   power: 35, acc: 100, pp: 30, cat: "physical", family: "snowball" },
  TRIDENT:        { name: "Trident",          type: "STREAMER", power: 75, acc: 95,  pp: 8,  cat: "physical", family: "trident" },
  BEACON_BEAM:    { name: "Beacon Beam",      type: "ADMIN",    power: 95, acc: 90,  pp: 5,  cat: "special",  family: "beam" },
  ELYTRA_SWOOP:   { name: "Elytra Swoop",     type: "GAMER",    power: 65, acc: 100, pp: 15, cat: "physical", family: "swoop" },

  // ---- DISCORD-FLAVOR MOVES ----
  PING:           { name: "@everyone Ping",   type: "MOD",      power: 30, acc: 100, pp: 35, cat: "special",  family: "notification" },
  BAN_HAMMER:     { name: "Ban Hammer",       type: "ADMIN",    power: 110,acc: 75,  pp: 5,  cat: "physical", family: "hammer" },
  RICKROLL:       { name: "Rickroll Link",    type: "MEMER",    power: 0,  acc: 100, pp: 20, cat: "status",   family: "confuse", status: "confuse" },
  COPYPASTA:      { name: "Copypasta",        type: "MEMER",    power: 60, acc: 100, pp: 15, cat: "special",  family: "spam" },
  TYPING_DOTS:    { name: "Typing...",        type: "LURKER",   power: 0,  acc: 100, pp: 25, cat: "status",   family: "fade",  status: "atk_down" },
  REACT_SPAM:     { name: "React Spam",       type: "MEMER",    power: 45, acc: 100, pp: 25, cat: "physical", family: "emoji-burst" },

  // ---- SPECIAL: GIVE_UP ----
  // Notali's signature "move." Battle.js intercepts when the user picks
  // GIVE_UP (or when a refusesToFight species is forced to act) — it
  // displays "too much worrrkkkkk" and skips the turn entirely. No
  // damage, no PP cost, no animation. The most strategically efficient
  // move in the game (depending on who you ask).
  GIVE_UP:        { name: "give up",           type: "LURKER",   power: 0,  acc: 100, pp: 99, cat: "status",   family: "give-up", status: "give_up" },
};

function movesLearnedAt(species, level) {
  return (species.learn || []).filter(([lvl]) => lvl === level).map(([, id]) => id);
}

// ----- SPECIES -----
// Three signature starters: NOTALI (a fat blob who refuses to fight),
// MXRIO (the mascot plumber-coded gamer), STEEL (the armored tank).
// Plus the supporting Discord-archetype roster.
const SPECIES = {
  // ---- STARTERS ----
  NOTALI: {
    id: "NOTALI", name: "notali",
    flavor: "Round, comfortable, and chronically online. Will not do anything that smells like work — until pushed past his limit.",
    types: ["LURKER"], kind: "notali",
    base: { hp: 110, atk: 25, def: 65, spd: 12 },  // beefy but useless
    catchRate: 100, xpYield: 60,
    // Always knows GIVE_UP and SHRINK_RAY. battle.js hides SHRINK_RAY
    // until the player has used GIVE_UP twice in this battle.
    learn: [[1, "GIVE_UP"], [1, "SHRINK_RAY"]],
    evolvesTo: "NOTALI_DELUXE", evolvesAt: 25,
    color1: "#f0d8a0", color2: "#a07050", color3: "#ed4245",
    refusesToFight: true,    // battle.js checks this to trigger the bit
  },
  NOTALI_DELUXE: {
    id: "NOTALI_DELUXE", name: "notali deluxe",
    flavor: "Even rounder. Now refuses to fight in 4K. Says 'too much worrrrrkkkk' with extra Rs — but the shrink ray is twice as bright.",
    types: ["LURKER", "ADMIN"], kind: "notali",
    base: { hp: 160, atk: 30, def: 90, spd: 8 },
    catchRate: 30, xpYield: 180, legendary: true,
    learn: [[1, "GIVE_UP"], [1, "SHRINK_RAY"]],
    color1: "#f0d8a0", color2: "#7a4828", color3: "#ffd700",
    refusesToFight: true,
  },

  MXRIO: {
    id: "MXRIO", name: "mxrio",
    flavor: "Red cap, blue overalls, world-class jumpman. Definitely not anyone in particular.",
    types: ["GAMER"], kind: "mxrio",
    base: { hp: 60, atk: 65, def: 55, spd: 70 },
    catchRate: 100, xpYield: 70,
    learn: [[1, "IRON_PICKAXE"], [1, "BOW_SHOT"], [10, "ELYTRA_SWOOP"], [16, "DIAMOND_SWORD"], [22, "BOMB_TOSS"], [28, "TNT"]],
    evolvesTo: "MXRIO_PRIME", evolvesAt: 18,
    color1: "#ed4245", color2: "#1a3aaa", color3: "#ffd9a0",
  },
  MXRIO_PRIME: {
    id: "MXRIO_PRIME", name: "mxrio prime",
    flavor: "The hat now glows. The mustache somehow grew thicker.",
    types: ["GAMER", "ADMIN"], kind: "mxrio",
    base: { hp: 90, atk: 105, def: 80, spd: 95 },
    catchRate: 30, xpYield: 165,
    learn: [[1, "DIAMOND_SWORD"], [1, "BOW_SHOT"], [1, "ELYTRA_SWOOP"], [32, "TNT"], [40, "TRIDENT"]],
    color1: "#ed4245", color2: "#0a1a8a", color3: "#ffd700",
  },

  STEEL: {
    id: "STEEL", name: "steel",
    flavor: "Forged in the #general-2 channel fire. Dents but does not break.",
    types: ["BOT", "MOD"], kind: "steel",
    base: { hp: 70, atk: 50, def: 85, spd: 35 },
    catchRate: 100, xpYield: 70,
    learn: [[1, "SHIELD_BASH"], [1, "IRON_PICKAXE"], [10, "PHALANX"], [16, "SPEAR_THRUST"], [22, "GLADIUS_SLASH"], [28, "BAN_HAMMER"]],
    evolvesTo: "STEEL_TITAN", evolvesAt: 18,
    color1: "#9aa0a8", color2: "#5a5e64", color3: "#1a1a1a",
  },
  STEEL_TITAN: {
    id: "STEEL_TITAN", name: "steel titan",
    flavor: "Has the bandwidth of an entire Discord nitro server in physical form.",
    types: ["BOT", "ADMIN"], kind: "steel",
    base: { hp: 120, atk: 80, def: 120, spd: 50 },
    catchRate: 30, xpYield: 165,
    learn: [[1, "SHIELD_BASH"], [1, "PHALANX"], [1, "BAN_HAMMER"], [32, "BEACON_BEAM"], [40, "TNT"]],
    color1: "#9aa0a8", color2: "#1a1a1a", color3: "#5865f2",
  },

};

// ----- FRIEND ROSTER -----
// Every monkey guild member becomes a mon. The Discord username is
// preserved verbatim in `name`; the species `id` is the uppercased,
// alphanumeric form. Stats come from the tier; moves are picked from
// the type pool. Add new entries here and they'll auto-register.
const TIER_STATS = {
  rookie:    { hp: 45, atk: 35, def: 35, spd: 55, catchRate: 130, xpYield: 50  },
  common:    { hp: 60, atk: 55, def: 55, spd: 60, catchRate: 80,  xpYield: 70  },
  rare:      { hp: 72, atk: 70, def: 65, spd: 72, catchRate: 50,  xpYield: 95  },
  epic:      { hp: 85, atk: 88, def: 80, spd: 80, catchRate: 25,  xpYield: 140 },
  legendary: { hp:110, atk: 98, def: 95, spd: 88, catchRate: 5,   xpYield: 220 },
};

const FRIENDS = [
  // === STAFF / TOP-OF-LIST (epic+legendary) ===
  { id: "KARL",        name: "Karl",          tier: "legendary", types: ["ADMIN", "MOD"],
    moves: ["BAN_HAMMER", "GOLDEN_APPLE", "BEACON_BEAM", "PHALANX"],
    colors: ["#ffd755", "#a07050", "#3aa83a"],
    av: { body: "round", hair: "tuft", hairColor: "#fee75c", eyes: "round", mouth: "smile", hat: "crown", hatColor: "#ffd700", item: "flower", itemColor: "#ff80c0", bg: "sparkle" },
    flavor: "Wears the king badge. Posts the discord.gg link in his status. Final boss energy." },
  { id: "CHRISTIAN",   name: "Christian",     tier: "epic", types: ["MOD", "ADMIN"],
    moves: ["BAN_HAMMER", "SHIELD_BASH", "PHALANX", "GLADIUS_SLASH"],
    colors: ["#ff7a3a", "#a04020", "#ffd700"],
    av: { body: "round", hair: "wild", hairColor: "#ff7a3a", eyes: "round", mouth: "smile", hat: "none", bg: "fire" },
    flavor: "HMOD. The fire-flame badge means business." },
  { id: "LSM253",      name: "LSM253",        tier: "rare", types: ["MOD"],
    moves: ["SHIELD_BASH", "PING", "GLADIUS_SLASH", "BOW_SHOT"],
    colors: ["#fef255", "#a07050", "#5865f2"],
    av: { body: "tall", hair: "short", hairColor: "#1a1a1a", eyes: "dot", mouth: "smile", hat: "cap", hatColor: "#5865f2" },
    flavor: "The mod. Lunar Client Andy. Will read the rules at you." },
  { id: "MYSELF",      name: "Myself",        tier: "epic", types: ["ADMIN", "MOD"],
    moves: ["BEACON_BEAM", "GOLDEN_APPLE", "PHALANX", "GLADIUS_SLASH"],
    colors: ["#5fc8ff", "#1a3aaa", "#ffffff"],
    av: { body: "round", skinColor: "#7fdcff", hair: "none", eyes: "shades", mouth: "smirk", hat: "headphones", hatColor: "#5fc8ff", bg: "sparkle" },
    flavor: "\"For Queen and country, men!\" Always online, always ready." },

  // === MINECRAFT MAINS (gamer-coded) ===
  { id: "STEEL_GAMER", name: "Steel (wild)",  tier: "rare", types: ["GAMER", "BOT"],
    moves: ["DIAMOND_SWORD", "IRON_PICKAXE", "ELYTRA_SWOOP", "TNT"],
    colors: ["#fce39a", "#3a4258", "#ed4245"],
    av: { body: "tall", skinColor: "#fce39a", hair: "long", hairColor: "#fed080", eyes: "shades", mouth: "smirk", hat: "shades", hatColor: "#1a1a1a", bg: "sparkle" },
    flavor: "5h Minecraft marathon, every day." },
  { id: "SZS",         name: "szs",           tier: "rare", types: ["GAMER", "STREAMER"],
    moves: ["DIAMOND_SWORD", "BOW_SHOT", "ELYTRA_SWOOP", "TNT"],
    colors: ["#a045f0", "#5020a0", "#fee75c"],
    av: { body: "tall", hair: "long", hairColor: "#3a1a4a", eyes: "cat", mouth: "flat", item: "sword", bg: "stars" },
    flavor: "FLOW badge. Currently in Minecraft. Always currently in Minecraft." },
  { id: "AGENTP4",     name: "AgentP4",       tier: "rare", types: ["BOT", "GAMER"],
    moves: ["ENDER_PEARL", "SPLASH_POTION", "SHRINK_RAY", "BEACON_BEAM"],
    colors: ["#5fc8b8", "#1a6a5a", "#ffd700"],
    flavor: "He's a platypus. With a king badge. And a fedora." },
  { id: "KAPARKING",   name: "Kaparking",     tier: "common", types: ["GAMER"],
    moves: ["IRON_PICKAXE", "DIAMOND_SWORD", "BOW_SHOT", "BOMB_TOSS"],
    colors: ["#7f4a2a", "#3a1a0a", "#a0a0a0"],
    av: { body: "tall", hair: "short", hairColor: "#3a1a0a", eyes: "dot", mouth: "flat", hat: "cap", hatColor: "#a0a0a0", item: "pickaxe" },
    flavor: "HOP badge, ROBLOX status. Block player at heart." },
  { id: "BMAN48",      name: "Bman48",        tier: "common", types: ["GAMER"],
    moves: ["IRON_PICKAXE", "TNT", "DIAMOND_SWORD", "BOMB_TOSS"],
    colors: ["#a08050", "#3a2010", "#ffd700"],
    flavor: "The minecart guy. Always rolling." },
  { id: "NIT",         name: "Nit",           tier: "common", types: ["GAMER"],
    moves: ["DIAMOND_SWORD", "ELYTRA_SWOOP", "BOW_SHOT", "TNT"],
    colors: ["#7e5a3a", "#3a2010", "#5865f2"],
    av: { body: "tall", hair: "short", hairColor: "#3a2010", eyes: "dot", mouth: "smile", item: "sword" },
    flavor: "PLOT badge. \"cloud sword is better than\" — better than what, Nit." },
  { id: "ALXROAR",     name: "Alxroar",       tier: "common", types: ["GAMER", "ADMIN"],
    moves: ["DIAMOND_SWORD", "GOLDEN_APPLE", "BOW_SHOT", "FIRE_CHARGE"],
    colors: ["#c060f0", "#5020a0", "#ffd700"],
    av: { body: "tall", hair: "wild", hairColor: "#3a1a4a", eyes: "round", mouth: "smile", hat: "fedora", hatColor: "#3a1a4a", bg: "stars" },
    flavor: "MOX badge. MC Dungeons enthusiast." },
  { id: "ENDERLIFE7770", name: "enderlife7770", tier: "common", types: ["GAMER"],
    moves: ["ENDER_PEARL", "DIAMOND_SWORD", "ELYTRA_SWOOP", "FIRE_CHARGE"],
    colors: ["#fee75c", "#ed4245", "#ffffff"],
    flavor: "SpongeBob avatar in an ender world." },
  { id: "PENGULITE",   name: "Pengulite",     tier: "rare", types: ["LURKER", "GAMER"],
    moves: ["TRIDENT", "ELYTRA_SWOOP", "DIAMOND_SWORD", "SNOWBALL"],
    colors: ["#7a5acc", "#1a1a4a", "#ffffff"],
    flavor: "Purple aura, Minecraft sword banner, vibes immaculate." },
  { id: "RANGERWILL",  name: "RangerWill",    tier: "common", types: ["GAMER"],
    moves: ["BOW_SHOT", "CROSSBOW", "ELYTRA_SWOOP", "FIRE_CHARGE"],
    colors: ["#ff8aa8", "#a04060", "#ffd700"],
    av: { body: "tall", hair: "long", hairColor: "#ff8aa8", eyes: "closed", mouth: "smile", hat: "halo", hatColor: "#ffd700", bg: "sparkle" },
    flavor: "HOP badge. Lunar Client. Ranger of the server." },
  { id: "CARRIED",     name: "CARRIED IN MAC", tier: "common", types: ["GAMER"],
    moves: ["DIAMOND_SWORD", "GLADIUS_SLASH", "BOW_SHOT", "PHALANX"],
    colors: ["#a05030", "#3a1a0a", "#ffd700"],
    av: { body: "tall", hair: "long", hairColor: "#3a1a0a", eyes: "anime", mouth: "smile", item: "sword" },
    flavor: "HOP badge. Loud about being carried." },
  { id: "KINGBOYS",    name: "Kingboys",      tier: "common", types: ["GAMER"],
    moves: ["DIAMOND_SWORD", "BOW_SHOT", "TNT", "ELYTRA_SWOOP"],
    colors: ["#5fdc6a", "#1a8838", "#ffd700"],
    flavor: "It's literally a controller named Kingboys." },
  { id: "_KEE_",       name: "_Kee_",         tier: "common", types: ["GAMER", "MEMER"],
    moves: ["BOW_SHOT", "FIRE_CHARGE", "DIAMOND_SWORD", "REACT_SPAM"],
    colors: ["#ff8aa8", "#a04060", "#ffd700"],
    av: { body: "tall", hair: "long", hairColor: "#ff8aa8", eyes: "anime", mouth: "smile", bg: "sparkle" },
    flavor: "JUST badge, tModLoader. Modded gamer." },
  { id: "_WISHRAM_",   name: "_WishRam_",     tier: "common", types: ["GAMER", "MEMER"],
    moves: ["DIAMOND_SWORD", "ELYTRA_SWOOP", "RICKROLL", "TNT"],
    colors: ["#e6a0c0", "#a04060", "#ffffff"],
    av: { body: "round", skinColor: "#e6a0c0", hair: "tuft", hairColor: "#ffffff", eyes: "cat", mouth: "cat", hat: "crown", hatColor: "#ff80c0" },
    flavor: "CUTE badge. Lunar Client. Cat avatar that knows things." },
  { id: "JUST_MILES",  name: "Just Miles",    tier: "common", types: ["GAMER"],
    moves: ["DIAMOND_SWORD", "BOW_SHOT", "ELYTRA_SWOOP", "TNT"],
    colors: ["#9050d0", "#3a1a4a", "#ed4245"],
    av: { body: "tall", hair: "long", hairColor: "#3a1a4a", eyes: "cat", mouth: "smirk", bg: "stars" },
    flavor: "JUST badge. Status: Medal." },
  { id: "DUDEGUY",     name: "Dudeguy",       tier: "common", types: ["GAMER", "MEMER"],
    moves: ["DIAMOND_SWORD", "RICKROLL", "BOW_SHOT", "REACT_SPAM"],
    colors: ["#fee75c", "#a07020", "#ffd700"],
    av: { body: "round", hair: "short", hairColor: "#fee75c", eyes: "round", mouth: "smile" },
    flavor: "JUST badge. Multiple kid faces. Always 'just.'" },
  { id: "IOIO",        name: "ioio",          tier: "common", types: ["GAMER"],
    moves: ["GLADIUS_SLASH", "DIAMOND_SWORD", "BOW_SHOT", "TNT"],
    colors: ["#ed4245", "#a02020", "#ffd700"],
    av: { body: "tall", hair: "short", hairColor: "#1a1a1a", eyes: "round", mouth: "smile", hat: "strawhat" },
    flavor: "FM badge, straw-hat energy. Pirate king ambition." },

  // === MEMER / MEME-LORD TIER ===
  { id: "BANANA_MAN",  name: "Banana_Man",    tier: "rare", types: ["MEMER", "GAMER"],
    moves: ["RICKROLL", "REACT_SPAM", "COPYPASTA", "SNOWBALL"],
    colors: ["#fee75c", "#a07020", "#7a4828"],
    flavor: "BT badge. \"I miss geeked Homer pls c...\" — we know, banana man." },
  { id: "FORGBEAR1",   name: "forgbear1",     tier: "rare", types: ["MEMER", "MOD"],
    moves: ["COPYPASTA", "RICKROLL", "REACT_SPAM", "PING"],
    colors: ["#9adc4a", "#3a8838", "#fee75c"],
    av: { body: "round", skinColor: "#9adc4a", hair: "wild", hairColor: "#3a8838", eyes: "dot", mouth: "open" },
    flavor: "Cursed grin. Posts the most unhinged copypasta in chat." },
  { id: "POOTALKER789", name: "pootalker789", tier: "rare", types: ["MEMER", "MOD"],
    moves: ["RICKROLL", "PING", "COPYPASTA", "REACT_SPAM"],
    colors: ["#7fdcff", "#3a6090", "#ffd700"],
    flavor: "PEAK badge. \"im tired of this grandpa, thats...\" Squirtle drama main." },
  { id: "SUSSYBAKA",   name: "sussybaka",     tier: "common", types: ["MEMER"],
    moves: ["RICKROLL", "REACT_SPAM", "COPYPASTA", "TYPING_DOTS"],
    colors: ["#ffffff", "#a0a0a0", "#ed4245"],
    flavor: "Among Us avatar, Among Us name, Among Us behavior. Sus." },
  { id: "WALKINGGHEAD", name: "walkingghead", tier: "common", types: ["MEMER"],
    moves: ["REACT_SPAM", "RICKROLL", "BOW_SHOT", "SNOWBALL"],
    colors: ["#ffd755", "#a07020", "#ffffff"],
    av: { body: "round", skinColor: "#ffd755", hair: "none", eyes: "round", mouth: "smile" },
    flavor: "Smiley emoji legs. Just. A walking head." },
  { id: "FART_SAUCE9", name: "Fart_sauce9",   tier: "common", types: ["MEMER"],
    moves: ["COPYPASTA", "REACT_SPAM", "RICKROLL", "SHRINK_RAY"],
    colors: ["#ffae54", "#7a4828", "#ed4245"],
    flavor: "Names himself a tankard. Posts accordingly." },
  { id: "WART",        name: "wart",          tier: "common", types: ["MEMER", "LURKER"],
    moves: ["TYPING_DOTS", "CREEPER_HISS", "RICKROLL", "COPYPASTA"],
    colors: ["#dadce0", "#5a5e64", "#1a1a1a"],
    flavor: "TRLL badge with the skull icon. Acts accordingly." },
  { id: "SINEED",      name: "Sineed",        tier: "common", types: ["MEMER"],
    moves: ["RICKROLL", "GOLDEN_APPLE", "REACT_SPAM", "COPYPASTA"],
    colors: ["#e8b070", "#7a4828", "#fee75c"],
    flavor: "His PFP is a hamburger. Iconic." },
  { id: "FRANKIE",     name: "frankie",       tier: "rookie", types: ["LURKER"],
    moves: ["TYPING_DOTS", "SNOWBALL", "BOW_SHOT", "REACT_SPAM"],
    colors: ["#a4b3c8", "#36393f", "#ffd700"],
    flavor: "Just a question mark in a dark void. Asks the real questions." },

  // === STREAMERS / EXTROVERTS ===
  { id: "RONIC",       name: "ronic",         tier: "rare", types: ["STREAMER"],
    moves: ["BOW_SHOT", "FIRE_CHARGE", "CROSSBOW", "BEACON_BEAM"],
    colors: ["#ffd700", "#a07020", "#ed4245"],
    av: { body: "tall", hair: "short", hairColor: "#1a1a1a", eyes: "dot", mouth: "smile", hat: "crown", hatColor: "#ffd700", item: "controller", bg: "sparkle" },
    flavor: "KING badge, ROBLOX status. Pulls big numbers." },
  { id: "BLACK_JACK",  name: "Black Jack",    tier: "rare", types: ["STREAMER", "MEMER"],
    moves: ["FIRE_CHARGE", "LAVA_BUCKET", "TNT", "COPYPASTA"],
    colors: ["#c060d0", "#3a1a4a", "#ff80c0"],
    av: { body: "round", hair: "long", hairColor: "#3a1a4a", eyes: "cat", mouth: "smile", hat: "crown", hatColor: "#c060d0", bg: "cherry" },
    flavor: "Cherry-blossom moon banner. \"THAT FEELING WHEN YOU...\"" },
  { id: "WILLIAM_GREGORY", name: "William Gregory", tier: "common", types: ["STREAMER"],
    moves: ["CROSSBOW", "FIRE_CHARGE", "BOW_SHOT", "BEACON_BEAM"],
    colors: ["#3a4258", "#1a1a1a", "#ffd700"],
    av: { body: "tall", hair: "short", hairColor: "#1a1a1a", eyes: "shades", mouth: "flat", hat: "shades", hatColor: "#1a1a1a" },
    flavor: "Sunglasses. Full name. Means business." },
  { id: "LASERFIRE",   name: "LaserFire",     tier: "common", types: ["STREAMER", "MEMER"],
    moves: ["FIRE_CHARGE", "LAVA_BUCKET", "REACT_SPAM", "BEACON_BEAM"],
    colors: ["#ff80a0", "#a04060", "#ffd700"],
    av: { body: "tall", hair: "spike", hairColor: "#ff80a0", eyes: "anime", mouth: "smile", bg: "fire" },
    flavor: "JEW badge. \"Milo_Died is a big booty l...\"" },
  { id: "F503N",       name: "F503N",         tier: "common", types: ["GAMER"],
    moves: ["DIAMOND_SWORD", "BOW_SHOT", "GLADIUS_SLASH", "TNT"],
    colors: ["#a08050", "#3a2010", "#ffd700"],
    av: { body: "tall", hair: "short", hairColor: "#3a2010", eyes: "dot", mouth: "smile", hat: "strawhat" },
    flavor: "Cowboy hat. 503 errors and N's." },

  // === CODER / TECH ===
  { id: "DR_YEET",     name: "dr.yeet",       tier: "common", types: ["CODER", "BOT"],
    moves: ["ENDER_PEARL", "SPLASH_POTION", "SHRINK_RAY", "FIRE_CHARGE"],
    colors: ["#fee75c", "#a07020", "#5fc8ff"],
    av: { body: "round", skinColor: "#9aa0a8", hair: "tuft", hairColor: "#9aa0a8", eyes: "cat", mouth: "cat" },
    flavor: "//WD badge. Yeets the deploy at 3am." },
  { id: "FFFOOST",     name: "Fffoost",       tier: "common", types: ["CODER"],
    moves: ["SPLASH_POTION", "ENDER_PEARL", "SHRINK_RAY", "BEACON_BEAM"],
    colors: ["#ff80a0", "#a04060", "#ffffff"],
    av: { body: "tall", hair: "long", hairColor: "#ff80a0", eyes: "anime", mouth: "smile", bg: "sparkle" },
    flavor: "Pink anime. Pure chaotic ML hyperparameter energy." },
  { id: "NOTAIM",      name: "notaim",        tier: "common", types: ["GAMER", "BOT"],
    moves: ["BOW_SHOT", "CROSSBOW", "DIAMOND_SWORD", "SHRINK_RAY"],
    colors: ["#1a1a1a", "#5a5e64", "#ed4245"],
    av: { body: "round", skinColor: "#1a1a1a", hair: "none", eyes: "dot", mouth: "flat" },
    flavor: "Self-aware username. Whiffs every shot, lands every clip." },
  { id: "OANEXITY",    name: "oAnexity",      tier: "common", types: ["CODER"],
    moves: ["SPLASH_POTION", "ENDER_PEARL", "BEACON_BEAM", "SHRINK_RAY"],
    colors: ["#5fc8ff", "#1a4a90", "#ffffff"],
    av: { body: "tall", hair: "short", hairColor: "#3a2010", eyes: "round", mouth: "smile", hat: "shades" },
    flavor: "CRIB badge, glasses. Builds full apps in Replit." },
  { id: "EVAN",        name: "Evan",          tier: "common", types: ["GAMER", "STREAMER"],
    moves: ["DIAMOND_SWORD", "BOW_SHOT", "GOLDEN_APPLE", "FIRE_CHARGE"],
    colors: ["#a04090", "#5a1a4a", "#ffd700"],
    av: { body: "tall", hair: "long", hairColor: "#a04090", eyes: "anime", mouth: "smile", item: "ball" },
    flavor: "MESA badge. Carries with the trophy." },

  // === LURKERS / OFFLINE ===
  { id: "ZYPHON",      name: "zyphon_.",      tier: "common", types: ["LURKER"],
    moves: ["TYPING_DOTS", "ENDER_PEARL", "CREEPER_HISS", "SNOWBALL"],
    colors: ["#5a5e64", "#1a1a1a", "#5865f2"],
    av: { body: "round", skinColor: "#5a5e64", hair: "none", eyes: "sleepy", mouth: "flat" },
    flavor: "Lowercase enjoyer. Status: never." },
  { id: "SAPWN",       name: "sapwn",         tier: "common", types: ["LURKER"],
    moves: ["TYPING_DOTS", "SNOWBALL", "ENDER_PEARL", "CREEPER_HISS"],
    colors: ["#a04545", "#3a1a1a", "#ed4245"],
    av: { body: "round", hair: "long", hairColor: "#3a1a1a", eyes: "closed", mouth: "flat", bg: "moon" },
    flavor: "\"June 5th!!\" — what's June 5th, sapwn." },
  { id: "SNAIL4",      name: "Snail4",        tier: "common", types: ["LURKER", "MEMER"],
    moves: ["SNOWBALL", "TYPING_DOTS", "RICKROLL", "REACT_SPAM"],
    colors: ["#ff80a0", "#a04060", "#7fdcff"],
    av: { body: "tall", hair: "long", hairColor: "#ff80a0", eyes: "sleepy", mouth: "frown" },
    flavor: "ATSM badge. Status: \"I'm tired.\" Always." },
  { id: "ZENI",        name: "Zeni :3",       tier: "common", types: ["MEMER", "LURKER"],
    moves: ["RICKROLL", "REACT_SPAM", "TYPING_DOTS", "FIRE_CHARGE"],
    colors: ["#a07ad8", "#3a1a5a", "#ffd700"],
    av: { body: "tall", hair: "long", hairColor: "#a07ad8", eyes: "cat", mouth: "cat", hat: "crown", hatColor: "#3a1a5a" },
    flavor: ":3 enjoyer. Anime girl with horns." },
  { id: "ZENSER48",    name: "zenser48",      tier: "common", types: ["LURKER"],
    moves: ["TYPING_DOTS", "ENDER_PEARL", "SNOWBALL", "BOW_SHOT"],
    colors: ["#3a3a3a", "#1a1a1a", "#5865f2"],
    av: { body: "tall", skinColor: "#3a3a3a", hair: "none", eyes: "dot", mouth: "flat" },
    flavor: "Mystery silhouette in the offline section." },
  { id: "WEDRFTGJO",   name: "wedrftgjo",     tier: "rookie", types: ["LURKER"],
    moves: ["SNOWBALL", "TYPING_DOTS", "BOW_SHOT", "REACT_SPAM"],
    colors: ["#5865f2", "#3a45c0", "#ffffff"],
    flavor: "Default avatar. Username is a keyboard mash. Beautiful." },
  { id: "GEARED",      name: "geared",        tier: "rookie", types: ["LURKER", "BOT"],
    moves: ["SHRINK_RAY", "TYPING_DOTS", "BOW_SHOT", "PING"],
    colors: ["#5865f2", "#3a45c0", "#ffffff"],
    flavor: "Default avatar. Pure potential." },
  { id: "CAST",        name: "Cast",          tier: "rookie", types: ["LURKER"],
    moves: ["TYPING_DOTS", "SNOWBALL", "BOW_SHOT", "REACT_SPAM"],
    colors: ["#57f287", "#3a8838", "#ffffff"],
    flavor: "Default avatar with a single name." },
  { id: "ADOT",        name: "Adot",          tier: "common", types: ["LURKER", "MEMER"],
    moves: ["TYPING_DOTS", "RICKROLL", "ENDER_PEARL", "REACT_SPAM"],
    colors: ["#3a3a3a", "#1a1a1a", "#ed4245"],
    av: { body: "round", skinColor: "#3a3a3a", hair: "none", eyes: "dot", mouth: "flat" },
    flavor: "Just a single dot in the dark." },
  { id: "IMOH",        name: "imoh",          tier: "common", types: ["LURKER"],
    moves: ["ENDER_PEARL", "TYPING_DOTS", "BOW_SHOT", "FIRE_CHARGE"],
    colors: ["#a07ad8", "#3a1a5a", "#5865f2"],
    av: { body: "tall", skinColor: "#a07ad8", hair: "none", eyes: "dot", mouth: "flat" },
    flavor: "\"Imoh\" — a low murmur in the lurker pit." },
  { id: "DOSEY",       name: "dOsey",         tier: "common", types: ["LURKER"],
    moves: ["TYPING_DOTS", "RICKROLL", "BOW_SHOT", "REACT_SPAM"],
    colors: ["#fee75c", "#a07020", "#ffffff"],
    av: { body: "tall", hair: "short", hairColor: "#3a2010", eyes: "round", mouth: "smile", hat: "cap", hatColor: "#ed4245" },
    flavor: "Glasses, hat, vibe. Slow but powerful." },
  { id: "EDWIN",       name: "Edwin",         tier: "common", types: ["LURKER"],
    moves: ["TYPING_DOTS", "ENDER_PEARL", "GLADIUS_SLASH", "SNOWBALL"],
    colors: ["#3a3a3a", "#1a1a1a", "#ffd700"],
    av: { body: "tall", skinColor: "#3a3a3a", hair: "short", hairColor: "#1a1a1a", eyes: "dot", mouth: "flat" },
    flavor: "FC badge. The shadow club." },
  { id: "BYAE",        name: "byae",          tier: "common", types: ["BOT", "MEMER"],
    moves: ["SHRINK_RAY", "REACT_SPAM", "RICKROLL", "BOW_SHOT"],
    colors: ["#7fdc6a", "#3a8838", "#ffffff"],
    flavor: "Alligator avatar. Bites first, types later." },
  { id: "BYTE",        name: "Byte",          tier: "common", types: ["BOT", "CODER"],
    moves: ["SHRINK_RAY", "ENDER_PEARL", "BEACON_BEAM", "PING"],
    colors: ["#3a3a3a", "#1a1a1a", "#5865f2"],
    av: { body: "round", skinColor: "#3a3a3a", hair: "tuft", hairColor: "#3a3a3a", eyes: "cat", mouth: "cat" },
    flavor: "ALTR badge. Cat avatar but the cat is a server." },
  { id: "CALICSIZED",  name: "calicsized",    tier: "common", types: ["LURKER", "MOD"],
    moves: ["GLADIUS_SLASH", "PHALANX", "BOW_SHOT", "TYPING_DOTS"],
    colors: ["#3a4258", "#1a1a1a", "#7fdcff"],
    av: { body: "tall", hair: "long", hairColor: "#3a4258", eyes: "cat", mouth: "flat", item: "sword" },
    flavor: "Mace badge. Quietly menacing." },
  { id: "BUTTKUN",     name: "buttkun",       tier: "rookie", types: ["MEMER"],
    moves: ["RICKROLL", "REACT_SPAM", "SNOWBALL", "TYPING_DOTS"],
    colors: ["#5fc8ff", "#1a4a90", "#ffd700"],
    av: { body: "round", skinColor: "#5fc8ff", hair: "none", eyes: "round", mouth: "smile" },
    flavor: "BTR! badge. Solid blue avatar. Iconic." },
  { id: "BLU",         name: "blu",           tier: "rookie", types: ["LURKER", "MEMER"],
    moves: ["SNOWBALL", "RICKROLL", "TYPING_DOTS", "BOW_SHOT"],
    colors: ["#5fc8ff", "#1a4a90", "#ff80c0"],
    av: { body: "round", skinColor: "#5fc8ff", hair: "none", eyes: "dot", mouth: "smile" },
    flavor: "Cute badge. The bluest." },
  { id: "BENJI_YT",    name: "Benji YT",      tier: "common", types: ["STREAMER", "BOT"],
    moves: ["FIRE_CHARGE", "SHRINK_RAY", "BOW_SHOT", "BEACON_BEAM"],
    colors: ["#dadce0", "#5a5e64", "#ed4245"],
    av: { body: "tall", skinColor: "#dadce0", hair: "short", hairColor: "#dadce0", eyes: "skull", mouth: "skull" },
    flavor: "WOS badge. White-mask streamer aesthetic." },
  { id: "ALRAYS",      name: "alrays",        tier: "common", types: ["LURKER", "MEMER"],
    moves: ["RICKROLL", "TYPING_DOTS", "REACT_SPAM", "ENDER_PEARL"],
    colors: ["#ff80a0", "#a04060", "#fee75c"],
    av: { body: "round", skinColor: "#ff80a0", hair: "tuft", hairColor: "#ffffff", eyes: "cat", mouth: "cat", item: "flower", itemColor: "#ffffff" },
    flavor: "MILK badge. Cat with a head wreath." },
  { id: "_1DAM",       name: "1dam",          tier: "common", types: ["MEMER", "LURKER"],
    moves: ["GLADIUS_SLASH", "BOW_SHOT", "RICKROLL", "TYPING_DOTS"],
    colors: ["#a4b3c8", "#36393f", "#ed4245"],
    av: { body: "tall", hair: "long", hairColor: "#1a1a1a", eyes: "cat", mouth: "smirk" },
    flavor: "JEW badge. \"Pitbull, Ne-Yo\" — a man of taste." },
  { id: "FORESTCHAN",  name: "Forestchan",    tier: "common", types: ["LURKER", "MEMER"],
    moves: ["SNOWBALL", "TYPING_DOTS", "RICKROLL", "GOLDEN_APPLE"],
    colors: ["#a09080", "#5a4828", "#ffffff"],
    flavor: "Seal energy. Status: Bad Bunny." },
  { id: "BREEZY",      name: "breezy",        tier: "common", types: ["LURKER", "STREAMER"],
    moves: ["SNOWBALL", "BOW_SHOT", "TYPING_DOTS", "FIRE_CHARGE"],
    colors: ["#5fc8ff", "#1a4a90", "#ffffff"],
    av: { body: "tall", hair: "short", hairColor: "#3a2010", eyes: "closed", mouth: "smile", hat: "shades" },
    flavor: "Status: Sleeping At Last. Status: Harmless. Vibes only." },
  { id: "LOHR",        name: "Løhr",          tier: "common", types: ["ADMIN", "MEMER"],
    moves: ["GOLDEN_APPLE", "BEACON_BEAM", "RICKROLL", "REACT_SPAM"],
    colors: ["#ffd700", "#a07020", "#ffffff"],
    av: { body: "tall", hair: "short", hairColor: "#ffffff", eyes: "closed", mouth: "smile", hat: "halo", hatColor: "#ffd700", bg: "sparkle" },
    flavor: "A$AP badge. Halo. \"1,855 Days\" — committed." },
  { id: "YEEP",        name: "Yeep",          tier: "common", types: ["MEMER"],
    moves: ["SNOWBALL", "RICKROLL", "REACT_SPAM", "GOLDEN_APPLE"],
    colors: ["#ffffff", "#a0a0a0", "#fee75c"],
    flavor: "Sheep in a chef's hat. Essential mod, allegedly." },

  // === MISC ROSTER FILL ===
  { id: "JACKY",       name: "Jacky",         tier: "common", types: ["GAMER", "MEMER"],
    moves: ["DIAMOND_SWORD", "BOW_SHOT", "RICKROLL", "ELYTRA_SWOOP"],
    colors: ["#fee75c", "#a07020", "#ed4245"],
    av: { body: "tall", hair: "spike", hairColor: "#fee75c", eyes: "anime", mouth: "smile" },
    flavor: "BL badge. Anime hair you could land a plane on." },
  { id: "JAJOONI",     name: "Jajooni",       tier: "common", types: ["MEMER"],
    moves: ["RICKROLL", "REACT_SPAM", "BOW_SHOT", "GOLDEN_APPLE"],
    colors: ["#e8a064", "#7a4828", "#fee75c"],
    flavor: "Giraffe-coded. Sees over the chat." },
  { id: "MILOSIVIC",   name: "Milosivic",     tier: "common", types: ["LURKER"],
    moves: ["ENDER_PEARL", "TYPING_DOTS", "BEACON_BEAM", "SNOWBALL"],
    colors: ["#5fc8ff", "#1a3aaa", "#ffffff"],
    av: { body: "round", skinColor: "#5fc8ff", hair: "none", eyes: "closed", mouth: "flat", bg: "moon" },
    flavor: "Blue moon banner. Quiet menace." },
  { id: "N3GM",        name: "N3gm",          tier: "rare", types: ["GAMER"],
    moves: ["FIRE_CHARGE", "BOW_SHOT", "DIAMOND_SWORD", "ELYTRA_SWOOP"],
    colors: ["#a04590", "#5a1a4a", "#ffd700"],
    flavor: "VALO badge. Dragon avatar. Headshot enjoyer." },
  { id: "QUENER",      name: "quener",        tier: "common", types: ["MEMER", "GAMER"],
    moves: ["RICKROLL", "BOW_SHOT", "REACT_SPAM", "DIAMOND_SWORD"],
    colors: ["#a07a4a", "#5a3a10", "#fee75c"],
    flavor: "AGMT badge. The OG monkey." },
  { id: "SEA11",       name: "sea11",         tier: "common", types: ["ADMIN", "LURKER"],
    moves: ["GOLDEN_APPLE", "BEACON_BEAM", "TYPING_DOTS", "SNOWBALL"],
    colors: ["#ffd700", "#a07020", "#7fdcff"],
    av: { body: "tall", hair: "short", hairColor: "#fee75c", eyes: "closed", mouth: "smile", hat: "halo", hatColor: "#ffd700", bg: "sparkle" },
    flavor: "Halo. Looks like a saint, posts like one too." },
  { id: "TREES",       name: "Trees",         tier: "common", types: ["ADMIN"],
    moves: ["GOLDEN_APPLE", "BOW_SHOT", "PHALANX", "BEACON_BEAM"],
    colors: ["#3a8838", "#1a4818", "#7fdc6a"],
    flavor: "Tree role, tree avatar, tree behavior." },
  { id: "WIFI",        name: "wifi",          tier: "common", types: ["BOT"],
    moves: ["SHRINK_RAY", "ENDER_PEARL", "PING", "BEACON_BEAM"],
    colors: ["#fee75c", "#a07020", "#5fc8ff"],
    av: { body: "tall", hair: "short", hairColor: "#1a1a1a", eyes: "dot", mouth: "smile", hat: "cap", hatColor: "#ed4245" },
    flavor: "香港 badge. Pings 3ms, kills 9999dmg." },
  { id: "XKING",       name: "xking",         tier: "common", types: ["ADMIN"],
    moves: ["BAN_HAMMER", "GOLDEN_APPLE", "PHALANX", "GLADIUS_SLASH"],
    colors: ["#7fdcff", "#1a4a90", "#ffd700"],
    av: { body: "tall", hair: "short", hairColor: "#3a2010", eyes: "shades", mouth: "smile", hat: "crown", hatColor: "#ffd700" },
    flavor: "JEW badge. Crowned, glasses on, business mode." },
  { id: "XL_MATTHEW100", name: "XL_MATTHEW100", tier: "common", types: ["GAMER", "MEMER"],
    moves: ["GLADIUS_SLASH", "DIAMOND_SWORD", "BOW_SHOT", "REACT_SPAM"],
    colors: ["#fee75c", "#a07020", "#ed4245"],
    av: { body: "tall", hair: "short", hairColor: "#1a1a1a", eyes: "round", mouth: "smile", hat: "strawhat" },
    flavor: "Straw-hat anime. Pirate king of XL_MATTHEW100." },
  { id: "HEADBAND_GUY", name: "headband guy",  tier: "rookie", types: ["GAMER"],
    moves: ["BOW_SHOT", "GLADIUS_SLASH", "DIAMOND_SWORD", "SNOWBALL"],
    colors: ["#ed4245", "#a02020", "#ffffff"],
    av: { body: "round", skinColor: "#ed4245", hair: "none", eyes: "dot", mouth: "smile", hat: "headband", hatColor: "#ffffff" },
    flavor: "Has a headband. Has a name based on the headband." },
  { id: "KOYLY",       name: "Koyly :()",     tier: "common", types: ["LURKER", "MEMER"],
    moves: ["TYPING_DOTS", "RICKROLL", "ENDER_PEARL", "REACT_SPAM"],
    colors: ["#a4b3c8", "#36393f", "#ffffff"],
    av: { body: "round", skinColor: "#a4b3c8", hair: "none", eyes: "cat", mouth: "flat" },
    flavor: "ptv badge. Skull. :() face. Vibes uncertain." },
  { id: "W0RTH",       name: "W0rth",         tier: "rare", types: ["GAMER", "MEMER"],
    moves: ["DIAMOND_SWORD", "GLADIUS_SLASH", "ELYTRA_SWOOP", "REACT_SPAM"],
    colors: ["#7fdcff", "#1a4a90", "#ffd700"],
    av: { body: "tall", hair: "long", hairColor: "#1a4a90", eyes: "cat", mouth: "smirk", item: "sword" },
    flavor: "LITE badge. Worth what though." },
];

// Auto-register every friend into SPECIES. The `av` block carries
// per-friend sprite params for the parametric avatar renderer.
for (const f of FRIENDS) {
  if (SPECIES[f.id]) continue;
  const t = TIER_STATS[f.tier] || TIER_STATS.common;
  SPECIES[f.id] = {
    id: f.id, name: f.name, flavor: f.flavor,
    types: f.types, kind: (f.kind || "friend"),
    base: { hp: t.hp, atk: t.atk, def: t.def, spd: t.spd },
    catchRate: t.catchRate, xpYield: t.xpYield,
    learn: f.moves.map((id, i) => [Math.max(1, i * 6), id]),
    color1: f.colors[0], color2: f.colors[1], color3: f.colors[2],
    legendary: f.tier === "legendary" ? true : undefined,
    av: f.av || {},
  };
}

// ----- HELPERS -----
function xpForLevel(level) { return Math.floor(Math.pow(level, 3) * 0.8); }
function maxHp(species, level) {
  return Math.floor(((2 * species.base.hp) * level) / 100 + level + 10);
}
function statValue(species, statName, level) {
  return Math.floor(((2 * species.base[statName]) * level) / 100 + 5);
}
function makeMon(speciesId, level) {
  const sp = SPECIES[speciesId];
  if (!sp) throw new Error("Unknown species: " + speciesId);
  const moves = [];
  for (const [lvl, moveId] of sp.learn || []) {
    if (lvl <= level) {
      if (moves.find(m => m.id === moveId)) continue;
      moves.push({ id: moveId, pp: MOVES[moveId].pp, maxPp: MOVES[moveId].pp });
      if (moves.length >= 4) moves.shift();
    }
  }
  if (moves.length === 0) moves.push({ id: "SPEAR_THRUST", pp: 25, maxPp: 25 });
  while (moves.length < 4 && moves.length < (sp.learn || []).length) {
    moves.push({ id: moves[moves.length-1].id, pp: 25, maxPp: 25 });
  }
  return {
    species: speciesId, level, xp: xpForLevel(level),
    hp: maxHp(sp, level), maxHp: maxHp(sp, level),
    moves, statBoosts: { atk: 0, def: 0, spd: 0 },
    statusEffect: null,
  };
}
function getStat(mon, statName) {
  const sp = SPECIES[mon.species];
  let v = statValue(sp, statName, mon.level);
  const boost = mon.statBoosts[statName] || 0;
  v *= (boost >= 0 ? (2 + boost) / 2 : 2 / (2 - boost));
  return Math.max(1, Math.floor(v));
}

// ----- ITEMS -----
const ITEMS = {
  DISCORD_INVITE: { name: "Discord Invite",  desc: "Throw to invite. Standard.",         catchMod: 1.0 },
  NITRO_INVITE:   { name: "Nitro Invite",    desc: "Better invite. They feel valued.",   catchMod: 1.5 },
  HYPESQUAD:      { name: "HypeSquad Invite",desc: "Excellent invite. Hard to refuse.",  catchMod: 2.0 },
  ENERGY_DRINK:   { name: "Energy Drink",    desc: "Heals 30 HP.",                       heal: 30 },
  RAID_SHIELD:    { name: "Raid Shield",     desc: "Heals 80 HP.",                       heal: 80 },
  GOLDEN_APPLE_I: { name: "Golden Apple",    desc: "Fully restores HP.",                 heal: 999 },
  COFFEE_SHOT:    { name: "Coffee Shot",     desc: "Restores 10 PP to all moves.",       ppHeal: 10 },
  RED_BULL:       { name: "Red Bull",        desc: "Fully restores PP.",                 ppHeal: 999 },
};
const SHOP_ITEMS = [
  { key: "DISCORD_INVITE", price: 50 },
  { key: "NITRO_INVITE", price: 200 },
  { key: "HYPESQUAD", price: 600 },
  { key: "ENERGY_DRINK", price: 100 },
  { key: "RAID_SHIELD", price: 300 },
  { key: "GOLDEN_APPLE_I", price: 1500 },
  { key: "COFFEE_SHOT", price: 400 },
  { key: "RED_BULL", price: 1800 },
];

// ----- ENCOUNTERS -----
// Wild friend encounters per channel/route. Tier-mixed so the player
// sees a varied roster as they progress through the server.
const ENCOUNTERS = {
  GENERAL_CHAT: [  // early route — rookies + commons
    { id: "FRANKIE",     weight: 22, minLvl: 2, maxLvl: 5 },
    { id: "GEARED",      weight: 18, minLvl: 3, maxLvl: 6 },
    { id: "WEDRFTGJO",   weight: 14, minLvl: 3, maxLvl: 6 },
    { id: "CAST",        weight: 12, minLvl: 3, maxLvl: 6 },
    { id: "BUTTKUN",     weight: 10, minLvl: 4, maxLvl: 7 },
    { id: "BLU",         weight: 10, minLvl: 4, maxLvl: 7 },
    { id: "HEADBAND_GUY", weight: 8, minLvl: 4, maxLvl: 7 },
  ],
  GAMING_VC: [     // commons / rares — minecraft mains
    { id: "BMAN48",      weight: 18, minLvl: 6, maxLvl: 10 },
    { id: "KAPARKING",   weight: 16, minLvl: 6, maxLvl: 10 },
    { id: "ENDERLIFE7770", weight: 14, minLvl: 7, maxLvl: 11 },
    { id: "JACKY",       weight: 12, minLvl: 7, maxLvl: 11 },
    { id: "DUDEGUY",     weight: 10, minLvl: 8, maxLvl: 12 },
    { id: "_KEE_",       weight: 8,  minLvl: 8, maxLvl: 12 },
    { id: "_WISHRAM_",   weight: 8,  minLvl: 8, maxLvl: 12 },
    { id: "JUST_MILES",  weight: 6,  minLvl: 9, maxLvl: 13 },
    { id: "IOIO",        weight: 4,  minLvl: 10, maxLvl: 14 },
  ],
  CODE_HELP: [     // tech-coded
    { id: "DR_YEET",     weight: 18, minLvl: 8, maxLvl: 12 },
    { id: "FFFOOST",     weight: 14, minLvl: 9, maxLvl: 13 },
    { id: "OANEXITY",    weight: 12, minLvl: 9, maxLvl: 13 },
    { id: "BYTE",        weight: 10, minLvl: 10, maxLvl: 14 },
    { id: "BYAE",        weight: 10, minLvl: 10, maxLvl: 14 },
    { id: "WIFI",        weight: 8,  minLvl: 11, maxLvl: 15 },
    { id: "NOTAIM",      weight: 8,  minLvl: 11, maxLvl: 15 },
    { id: "CALICSIZED",  weight: 6,  minLvl: 12, maxLvl: 16 },
  ],
  ART_SHOWCASE: [  // creative + memer mid-tier
    { id: "TREES",       weight: 16, minLvl: 10, maxLvl: 14 },
    { id: "BREEZY",      weight: 14, minLvl: 11, maxLvl: 15 },
    { id: "FORESTCHAN",  weight: 12, minLvl: 11, maxLvl: 15 },
    { id: "SUSSYBAKA",   weight: 10, minLvl: 12, maxLvl: 16 },
    { id: "WALKINGGHEAD", weight: 10, minLvl: 12, maxLvl: 16 },
    { id: "WART",        weight: 10, minLvl: 12, maxLvl: 16 },
    { id: "SINEED",      weight: 8,  minLvl: 13, maxLvl: 17 },
    { id: "JAJOONI",     weight: 8,  minLvl: 13, maxLvl: 17 },
    { id: "FART_SAUCE9", weight: 6,  minLvl: 13, maxLvl: 17 },
    { id: "MILOSIVIC",   weight: 6,  minLvl: 14, maxLvl: 18 },
    { id: "ZENI",        weight: 6,  minLvl: 14, maxLvl: 18 },
    { id: "ZENSER48",    weight: 6,  minLvl: 14, maxLvl: 18 },
  ],
  ADMIN_LOUNGE: [  // post-game, high-level rares + epics + 1 legendary
    { id: "AGENTP4",     weight: 14, minLvl: 22, maxLvl: 28 },
    { id: "BANANA_MAN",  weight: 14, minLvl: 22, maxLvl: 28 },
    { id: "POOTALKER789", weight: 12, minLvl: 22, maxLvl: 28 },
    { id: "FORGBEAR1",   weight: 10, minLvl: 22, maxLvl: 28 },
    { id: "PENGULITE",   weight: 10, minLvl: 22, maxLvl: 28 },
    { id: "SZS",         weight: 10, minLvl: 24, maxLvl: 30 },
    { id: "STEEL_GAMER", weight: 8,  minLvl: 24, maxLvl: 30 },
    { id: "RONIC",       weight: 8,  minLvl: 24, maxLvl: 30 },
    { id: "BLACK_JACK",  weight: 8,  minLvl: 25, maxLvl: 31 },
    { id: "N3GM",        weight: 6,  minLvl: 26, maxLvl: 32 },
    { id: "W0RTH",       weight: 6,  minLvl: 26, maxLvl: 32 },
    { id: "MYSELF",      weight: 4,  minLvl: 30, maxLvl: 36 },
    { id: "KARL",        weight: 1,  minLvl: 40, maxLvl: 45 },
  ],
};

// ----- TRAINERS -----
// Gym leaders are real monkey guild members. Each has 1-2 lines of
// dialog written in their actual Discord voice.
const TRAINERS = {
  RIVAL_1: {
    name: "Rival sapwn",
    intro: "sapwn: bro just wait til June 5th!! you're cooked.",
    defeat: "sapwn: ggs but JUNE 5TH IS COMING.",
    team: [{ id: "FRANKIE", lvl: 5 }, { id: "GEARED", lvl: 6 }],
    reward: 200,
  },
  CHANNEL_MOD_1: {
    name: "Mod LSM253",
    intro: "LSM253: read the rules. THEN we fight.",
    defeat: "LSM253: ok that was clean, ggs",
    team: [{ id: "BUTTKUN", lvl: 9 }, { id: "WIFI", lvl: 10 }],
    reward: 500, badge: 1, badgeName: "MEMBER ROLE",
  },
  STREAMER_LEAD: {
    name: "Stream Captain ronic",
    intro: "ronic: drop a follow on ROBLOX or get banished.",
    defeat: "ronic: down 3 subs. brutal.",
    team: [{ id: "BENJI_YT", lvl: 13 }, { id: "WILLIAM_GREGORY", lvl: 14 }, { id: "LASERFIRE", lvl: 15 }],
    reward: 800, badge: 2, badgeName: "VERIFIED ROLE", requiresBadge: 1,
  },
  CODE_LEAD: {
    name: "Dev Lead dr.yeet",
    intro: "dr.yeet: I'll merge your PR... if you can beat me.",
    defeat: "dr.yeet: rebase approved. nice.",
    team: [{ id: "FFFOOST", lvl: 17 }, { id: "OANEXITY", lvl: 18 }, { id: "BYTE", lvl: 19 }],
    reward: 1100, badge: 3, badgeName: "CONTRIBUTOR ROLE", requiresBadge: 2,
  },
  DRAMA_LEAD: {
    name: "Drama Lord pootalker789",
    intro: "pootalker789: im tired of this grandpa, thats why I'm fighting you instead.",
    defeat: "pootalker789: receipt deleted. ...for now.",
    team: [{ id: "FORGBEAR1", lvl: 21 }, { id: "BANANA_MAN", lvl: 22 }, { id: "WART", lvl: 22 }, { id: "SUSSYBAKA", lvl: 23 }],
    reward: 1500, badge: 4, badgeName: "DRAMA ROLE", requiresBadge: 3,
  },
  ADMIN_LEAD: {
    name: "Head Mod Christian",
    intro: "Christian: HMOD activated. Hope your team's lunar-loaded.",
    defeat: "Christian: gg, role assigned.",
    team: [{ id: "AGENTP4", lvl: 26 }, { id: "PENGULITE", lvl: 27 }, { id: "SZS", lvl: 28 }, { id: "STEEL_GAMER", lvl: 29 }],
    reward: 2000, badge: 5, badgeName: "MOD ROLE", requiresBadge: 4,
  },
  OWNER_FINAL: {
    name: "Champion Karl",
    title: "The King of the Monkey Guild",
    intro: "Karl: you climbed every channel.\nKarl: but the king badge isn't free. discord.gg/AKnwZ58nP",
    defeat: "Karl: ...respect. role promoted to king.",
    team: [
      { id: "AGENTP4",    lvl: 38 },
      { id: "BANANA_MAN", lvl: 39 },
      { id: "POOTALKER789", lvl: 40 },
      { id: "PENGULITE",  lvl: 41 },
      { id: "MYSELF",     lvl: 42 },
      { id: "KARL",       lvl: 45 },
    ],
    reward: 10000, isChampion: true, requiresBadge: 5,
  },
};
