// =====================================================
// Overworld - multi-map (Pokemon-Red style: many small
// maps connected by edge portals and doors)
// =====================================================

const World = (() => {
  const T = {
    G: 0, H: 1, P: 2, W: 3, R: 4, B: 5, D: 6, S: 7, F: 8, L: 9,
    SAND: 10, SNOW: 11, ROCK: 12, BRIDGE: 13, SHOP_FLOOR: 14,
    HEAL_SIGN: 15, GYM_FLOOR: 16,
    ROOF_RED_L: 17, ROOF_RED_M: 18, ROOF_RED_R: 19,
    ROOF_BLUE_L: 20, ROOF_BLUE_M: 21, ROOF_BLUE_R: 22,
    ROOF_PURPLE_L: 23, ROOF_PURPLE_M: 24, ROOF_PURPLE_R: 25,
    FENCE: 26, BEACH: 27,
    CAVE_FLOOR: 28, CAVE_WALL: 29, LEDGE: 30,
  };

  function charToTile(c) {
    return ({
      G: T.G, H: T.H, P: T.P, W: T.W, R: T.R,
      B: T.B, D: T.D, S: T.S, F: T.F, L: T.L,
      $: T.SHOP_FLOOR, "#": T.HEAL_SIGN, "%": T.GYM_FLOOR,
      "<": T.ROOF_RED_L, "=": T.ROOF_RED_M, ">": T.ROOF_RED_R,
      "{": T.ROOF_BLUE_L, "+": T.ROOF_BLUE_M, "}": T.ROOF_BLUE_R,
      "(": T.ROOF_PURPLE_L, "*": T.ROOF_PURPLE_M, ")": T.ROOF_PURPLE_R,
      f: T.FENCE, "~": T.BEACH,
      c: T.CAVE_FLOOR, C: T.CAVE_WALL, l: T.LEDGE,
    })[c] ?? T.G;
  }

  function parseMap(rawRows) {
    return rawRows.map(row => row.split("").map(charToTile));
  }

  // =========================================================
  // MAPS — each a small scene Pokemon-style
  // =========================================================
  const MAPS = {

    // ========== PALLET-STYLE STARTING TOWN ==========
    pallet: {
      name: "Pallet Town",
      width: 20, height: 18,
      tiles: parseMap([
        "WWWWWWWWWWWWWWWWWWWW",
        "WGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGW",
        "WGG<===>GGGGGGGGGGGW",
        "WGGB##FBGGGGGGGGGGGW",
        "WGGBFFFDGGGGGGGGGGGW",
        "WGGBFFFBGGGGGGGGGGGW",
        "WGGBBBBBGGGGGGGGGGGW",
        "WGGGGGGGGGGSGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGG{+++}GW",
        "WGGGGGGGGGGGGB$$$BGW",
        "WGGGGGGGGGGGGB$$$DGW",
        "WGGGGGGGGGGGGBBBBBGW",
        "WGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WWWWWWWPPWWWWWWWWWWW",
      ]),
      portals: [
        { x: 7, y: 17, to: { map: "route1", x: 7, y: 1 } },
        { x: 8, y: 17, to: { map: "route1", x: 8, y: 1 } },
      ],
      encounters: null,
      music: "town",
    },

    // ========== ROUTE 1 — first wild grass ==========
    route1: {
      name: "Route 1 (north of Pallet)",
      width: 20, height: 30,
      tiles: parseMap([
        "WWWWWWWPPWWWWWWWWWWW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGSGGGGW",
        "WGGGHHHPPHHHHGGGGGGW",
        "WGGGHHHPPHHHHGGGGGGW",
        "WGGGHHHPPHHHHGGGGGGW",
        "WGGGHHHPPHHHHGGGGGGW",
        "WGGGGGGPPGGGGGGGLGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGHHHHHGGGW",
        "WGGGGGGPPGGHHHHHGGGW",
        "WGGGGGGPPGGHHHHHGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGHHHPPHHHGGGGGGGW",
        "WGGGHHHPPHHHGGGGGGGW",
        "WGGGHHHPPHHHGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGSGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGPPGGGGGGGGGGW",
        "WWWWWWWPPWWWWWWWWWWW",
      ]),
      portals: [
        { x: 7, y: 0, to: { map: "pallet", x: 7, y: 16 } },
        { x: 8, y: 0, to: { map: "pallet", x: 8, y: 16 } },
        { x: 7, y: 29, to: { map: "viridian", x: 9, y: 1 } },
        { x: 8, y: 29, to: { map: "viridian", x: 10, y: 1 } },
      ],
      encounters: "GENERAL_CHAT",
      music: "route",
    },

    // ========== VIRIDIAN-STYLE TOWN with PASTA GYM ==========
    viridian: {
      name: "Viridian City",
      width: 22, height: 22,
      tiles: parseMap([
        "WWWWWWWWWPPWWWWWWWWWWW",
        "WGGGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGGGPPGGGGGGGGGGW",
        "WGGGGGG<===>GGGGGGGGGW",
        "WGGGGGGB##FBGGGGSGGGGW",
        "WGGGGGGBFFFDGGGGGGGGGW",
        "WGGGGGGBFFFBGGGGGGGGW",
        "WGGGGGGBBBBBGGGGGGGGW",
        "WGGGGGGGGPGGGGGGGGGGW",
        "WGGGGGGGGPGGGGGGGGGGW",
        "WGGGGGGGPPPPPPPPPGGGW",
        "WGGGGGGGPGGGGGGGPGGGW",
        "WGGGGSGGPGG{+++}PGGGW",
        "WGGGGGGGPGGB$$$BPGGGW",
        "WGGGGGGGPGGB$$$DPGGGW",
        "WGGGGGGGPGGBBBBBPGGGW",
        "WGGGGGGGPGGGGGGGPGGGW",
        "WGGG(***)GGGGGGGPGGGW",
        "WGGGB%%%BGGGGGGGPGGGW",
        "WGGGB%%%DPPPPPPPPGGGW",
        "WGGGBBBBBGGGGGGGGGGGW",
        "WWWWWWWWWWWWWWWPPWWWW",
      ]),
      portals: [
        { x: 9, y: 0, to: { map: "route1", x: 7, y: 28 } },
        { x: 10, y: 0, to: { map: "route1", x: 8, y: 28 } },
        { x: 15, y: 21, to: { map: "route2", x: 9, y: 1 } },
        { x: 16, y: 21, to: { map: "route2", x: 10, y: 1 } },
      ],
      encounters: null,
      music: "town",
    },

    // ========== ROUTE 2 — bridge / forest entrance ==========
    route2: {
      name: "Route 2",
      width: 20, height: 28,
      tiles: parseMap([
        "WWWWWWWWWPPWWWWWWWWW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGHHHHHPPHHHHGGGGW",
        "WGGGHHHHHPPHHHHGGGGW",
        "WGGGHHHHHPPHHHHGGGGW",
        "WGGGHHHHHPPHHHHGGGGW",
        "WGGGHHHHHPPHHHHGGGGW",
        "WGGGGGGGGPPGGGGSGGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGfffffPPffffffGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGGHHHHPPHHHHHGGGW",
        "WGGGGHHHHPPHHHHHGGGW",
        "WGGGGHHHHPPHHHHHGGGW",
        "WGGGGHHHHPPHHHHHGGGW",
        "WGGGGHHHHPPHHHHHGGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGfffffPPffffffGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WGGGHHHHHPPHHHHHGGGW",
        "WGGGHHHHHPPHHHHHGGGW",
        "WGGGHHHHHPPHHHHHGGGW",
        "WGGGGGGGGPPGGGGGGGGW",
        "WWWWWWWWWPPWWWWWWWWW",
      ]),
      portals: [
        { x: 9, y: 0, to: { map: "viridian", x: 15, y: 20 } },
        { x: 10, y: 0, to: { map: "viridian", x: 16, y: 20 } },
        { x: 9, y: 27, to: { map: "forest", x: 12, y: 1 } },
        { x: 10, y: 27, to: { map: "forest", x: 13, y: 1 } },
      ],
      encounters: "GAMING_VC",
      music: "route",
    },

    // ========== VIRIDIAN FOREST ==========
    forest: {
      name: "Viridian Forest",
      width: 26, height: 26,
      tiles: parseMap([
        "WWWWWWWWWWWWPPWWWWWWWWWWWW",
        "WGGGGGGGGGGGPPGGGGGGGGGGGW",
        "WLGGGLGGLGGGPPGGGGGGGLGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGGGGGGGGGPPGGGGGGGGGGGW",
        "WGGGGGGSGGGGPPGGGGSGGGGGGW",
        "WGGGGGGGGGGGPPGGGGGGGGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGGGGGGGGGPPGGGGGGGGGGGW",
        "WGGGGGGGGGGGPPGGGGGGGGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGHHHHHHHHPPHHHHHHHGGGGW",
        "WGGGGGGGGGGGPPGGGGGGGGGGGW",
        "WGGGGGGGGGGGPPGGGGGGGGGGGW",
        "WWWWWWWWWWWWPPWWWWWWWWWWWW",
      ]),
      portals: [
        { x: 12, y: 0, to: { map: "route2", x: 9, y: 26 } },
        { x: 13, y: 0, to: { map: "route2", x: 10, y: 26 } },
        { x: 12, y: 25, to: { map: "pewter", x: 9, y: 1 } },
        { x: 13, y: 25, to: { map: "pewter", x: 10, y: 1 } },
      ],
      encounters: "CODE_HELP",
      music: "route",
    },

    // ========== PEWTER-STYLE TOWN with AVIARY GYM ==========
    pewter: {
      name: "Pewter City",
      width: 22, height: 20,
      tiles: parseMap([
        "WWWWWWWWWPPWWWWWWWWWWW",
        "WGGGGGGGGPPGGGGGGGGGGW",
        "WGGGGGGGGPPGGGGGGGGGGW",
        "WGGGGG<===>GGGGGGGSGGW",
        "WGGGGGB##FBGGGGGGGGGGW",
        "WGGGGGBFFFDGGGGGGGGGGW",
        "WGGGGGBFFFBGGGGGGGGGGW",
        "WGGGGGBBBBBGGGGGGGGGGW",
        "WGGGGGGGPGGGGGGGGGGGGW",
        "WGGGGGGGPGGG(*****)GGW",
        "WGGGGGGGPPPPB%%%%%BGGW",
        "WGGGGGGGGGGGB%%%%%DGGW",
        "WGGGGGGGGGGGB%%%%%BGGW",
        "WGGGGGGGGGGGBBBBBBBGGW",
        "WGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGSGGGGGGGGGGGGW",
        "WGGGGGGGPPPPPPPPPPPGGW",
        "WGGGGGGGGGGGGGGGGGPGGW",
        "WWWWWWWWWWWWWWWWWWPWWW",
      ]),
      portals: [
        { x: 9, y: 0, to: { map: "forest", x: 12, y: 24 } },
        { x: 10, y: 0, to: { map: "forest", x: 13, y: 24 } },
        { x: 18, y: 19, to: { map: "route3", x: 1, y: 8 } },
      ],
      encounters: null,
      music: "town",
    },

    // ========== ROUTE 3 — to mountain ==========
    route3: {
      name: "Route 3 (Mountain Road)",
      width: 30, height: 18,
      tiles: parseMap([
        "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGSGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGHHHHHGGGGGHHHHHGGGGGGGW",
        "WGGGGGGHHHHHGGGGGHHHHHGGGGGGGW",
        "WGGGGGGHHHHHGGGGGHHHHHGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "PPPPPPPPPPPPPPPPPPPPPPPPPPPPCC",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGGCC",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGGCC",
        "WGGGGGGHHHHHGGGGGHHHHHGGGGGGGW",
        "WGGGGGGHHHHHGGGGGHHHHHGGGGGGGW",
        "WGGGGGGHHHHHGGGGGHHHHHGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGSGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      ]),
      portals: [
        { x: 0, y: 8, to: { map: "pewter", x: 17, y: 18 } },
        { x: 29, y: 8, to: { map: "mt_moon", x: 1, y: 8 } },
        { x: 28, y: 8, to: { map: "mt_moon", x: 1, y: 8 } },
      ],
      encounters: "GAMING_VC",
      music: "route",
    },

    // ========== MT MOON CAVE ==========
    mt_moon: {
      name: "Mt. Moon",
      width: 22, height: 18,
      tiles: parseMap([
        "CCCCCCCCCCCCCCCCCCCCCC",
        "CcccccccccCCCCCCCCCCCC",
        "CcccccccccccccccccccCC",
        "CCCCCccccccCCCCCCcccCC",
        "CCCCCccCCCCCCCCCCcccCC",
        "CCCCCccCCCCCCCCCCcccCC",
        "CCCCCccccccccCCCCcccCC",
        "CCCCCCCCCCcccCCCCcccCC",
        "ccccCCCCCCcccCCCCcccCC",
        "ccccCCCCCCccccccccccCC",
        "CCCCcccCCCCCCCCCCcccCC",
        "CCCCcccCCCCCCCCCCcccCC",
        "CCCCcccCCCCCCCCCCcccCC",
        "CCCCccccccccccccccccCC",
        "CCCCCCCCCCCCCCCCCcccCC",
        "CCCCCCCCCCCCCCCCCcccCC",
        "CCCCCCCCCCCCCCCCCcccCC",
        "CCCCCCCCCCCCCCCCCCCCCC",
      ]),
      portals: [
        { x: 0, y: 8, to: { map: "route3", x: 28, y: 8 } },
        { x: 0, y: 9, to: { map: "route3", x: 28, y: 8 } },
        { x: 21, y: 14, to: { map: "cerulean", x: 1, y: 9 } },
      ],
      encounters: "CODE_HELP",
      music: "cave",
    },

    // ========== CERULEAN-STYLE TOWN with SIGMA GYM ==========
    cerulean: {
      name: "Cerulean City",
      width: 24, height: 22,
      tiles: parseMap([
        "WWWWWWWWWWWWWWWWWWWWWWWW",
        "WGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGRRRRRGGGGGGGGGGGGGGW",
        "WGGGRRRRRGGG<===>GGGGGGW",
        "WGGGRRRRRGGGB##FBGGGGGGW",
        "WGGGGGGGGGGGBFFFDGGGGGGW",
        "WGGGGGGGGGGGBFFFBGGGGGGW",
        "WGGGGGGGGGGGBBBBBGGGGGGW",
        "PPGGGGGGGSGGGGPGGGGGGGGW",
        "PPGGGGGGGGGGGGPGGGGGGGGW",
        "WGGGGGGGGGGGGGPPPPPPPPPP",
        "WGGGGG(*****)GGGGGGGGGGW",
        "WGGGGGB%%%%%BGGGGGGGGGGW",
        "WGGGGGB%%%%%DGGGGGGGGGGW",
        "WGGGGGB%%%%%BGGGGGGGGGGW",
        "WGGGGGBBBBBBBGGGGGSGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGG{+++}GGGGGGGW",
        "WGGGGGGGGGGB$$$BGGGGGGGW",
        "WGGGGGGGGGGB$$$DGGGGGGGW",
        "WWWWWWWWWWWBBBBBWWWWWWWW",
      ]),
      portals: [
        { x: 0, y: 9, to: { map: "mt_moon", x: 20, y: 14 } },
        { x: 0, y: 10, to: { map: "mt_moon", x: 20, y: 14 } },
        { x: 23, y: 11, to: { map: "route4", x: 1, y: 9 } },
      ],
      encounters: null,
      music: "town",
    },

    // ========== ROUTE 4 (cliff) ==========
    route4: {
      name: "Route 4 (Coast)",
      width: 28, height: 18,
      tiles: parseMap([
        "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGSGGGGGW",
        "WGGGHHHHGGGGGGGHHHHHHHHGGGGW",
        "WGGGHHHHGGGGGGGHHHHHHHHGGGGW",
        "WGGGHHHHGGGGGGGHHHHHHHHGGGGW",
        "WGGGHHHHGGGGGGGGGGGGGGGGGGGW",
        "WGGGHHHHGGGGGGGGGGGGGGGGGGGW",
        "PPPPPPPPPPPPPPPPPPPPPPPPPPPP",
        "PPPPPPPPPPPPPPPPPPPPPPPPPPPP",
        "WGGGGGGGGGGGGGGGRRRRRRRRRRRR",
        "WGGGGGGGSGGGGGGGRRRRRRRRRRRR",
        "WGGGGGGGGGGGGGGGRRRRRRRRRRRR",
        "WGGGGGGGGGGGGGGGRRRRRRRRRRRR",
        "WGGGGGGG~~~~~~~~RRRRRRRRRRRR",
        "WGGGG~~~~~~~~~~~RRRRRRRRRRRR",
        "WGGG~~~~~~~~~~~~RRRRRRRRRRRR",
        "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      ]),
      portals: [
        { x: 0, y: 8, to: { map: "cerulean", x: 22, y: 11 } },
        { x: 0, y: 9, to: { map: "cerulean", x: 22, y: 11 } },
        { x: 27, y: 8, to: { map: "vermilion", x: 1, y: 9 } },
        { x: 27, y: 9, to: { map: "vermilion", x: 1, y: 9 } },
      ],
      encounters: "ART_SHOWCASE",
      music: "route",
    },

    // ========== SOUTH VALLEY ISLES (post-game, unlocked after Champion) ==========
    south_valley: {
      name: "South Valley Isles",
      width: 28, height: 22,
      tiles: parseMap([
        "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGHHHHHHGGGGSGGGGGHHHHHHHGGW",
        "WGHHHHHHGGGGGGGGGGHHHHHHHGGW",
        "WGHHHHHHGGGGGGGGGGHHHHHHHGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGG~~~~~~~~~~~~GGGGGGGW",
        "WGGGGG~~~~~~~~~~~~~~~~GGGGGW",
        "WGGGG~~~~~~~~~~~~~~~~~~GGGGW",
        "PPPPPPPPPPPPPPPPPPPPPPPPGGGGW",
        "PPPPPPPPPPPPPPPPPPPPPPPPGGGGW",
        "WGGGG~~~~~~~~~~~~~~~~~~GGGGW",
        "WGGGGG~~~~~~~~~~~~~~~~GGGGGW",
        "WGGGGGGG~~~~~~~~~~~~GGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGHHHHGGGGGSGGGGGGHHHHGGGGW",
        "WGGGHHHHGGGGGGGGGGGGHHHHGGGGW",
        "WGGGHHHHGGGGGGGGGGGGHHHHGGGGW",
        "WGGGHHHHGGGGGGGGGGGGHHHHGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGGGGGGGW",
        "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      ]),
      portals: [
        // West edge teleports back to Vermilion's east edge (post-game ferry)
        { x: 0, y: 9, to: { map: "vermilion", x: 20, y: 18 } },
        { x: 0, y: 10, to: { map: "vermilion", x: 20, y: 18 } },
      ],
      encounters: "ADMIN_LOUNGE",
      music: "route",
      // Post-game gate: only enterable after beating the Champion.
      requiresChampion: true,
    },

    // ========== VERMILION (port town with FIRE GYM) ==========
    vermilion: {
      name: "Vermilion City",
      width: 22, height: 20,
      tiles: parseMap([
        "WWWWWWWWWWWWWWWWWWWWWW",
        "WGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGSGGGW",
        "WGG<===>GGGG{+++}GGGGW",
        "WGGB##FBGGGGB$$$BGGGGW",
        "WGGBFFFDGGGGB$$$DGGGGW",
        "WGGBFFFBGGGGBBBBBGGGGW",
        "WGGBBBBBGGGGGGGGGGGGGW",
        "PPGGGGGGGGGGGGGGGGGGGW",
        "PPGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGG(*****)GGGGGGW",
        "WGGGGGGGB%%%%%BGGGGGGW",
        "WGGGGGGGB%%%%%DGGGGGGW",
        "WGGGGGGGB%%%%%BGGGGGGW",
        "WGGGGGGGBBBBBBBGGGGGGW",
        "WGGGGGGGGGGGGGGGGGGGGW",
        "WGGGGGGG~~~~~~~~~~~GGW",
        "WWWWWW~~~~~~~~~~~~~WWW",
      ]),
      portals: [
        { x: 0, y: 9, to: { map: "route4", x: 26, y: 9 } },
        { x: 0, y: 10, to: { map: "route4", x: 26, y: 9 } },
      ],
      encounters: null,
      music: "town",
    },
  };

  // ===========================================================
  // NPCs per map (gym leaders, healers, shopkeepers, trainers)
  // ===========================================================
  const NPCS_BY_MAP = {
    pallet: [
      { id: "guide_npc", x: 11, y: 9, color: "#ffd700", facing: "down", type: "npc",
        dialog: ["Guide: Welcome, traveler!",
          "Guide: ★ Walk INTO TALL GRASS to find wild memes.",
          "Guide: ★ Z to talk/confirm, X for menu.",
          "Guide: ★ Walk NORTH to leave town and start your adventure!",
          "Guide: ★ Red roof = Cappuccino Bar (heal). Blue roof = Mart."] },
      { id: "nurse_pallet", x: 4, y: 5, color: "#ff8aa8", facing: "down", type: "healer",
        dialog: ["Barista: Welcome to the Cappuccino Bar!", "(*HSSSS*)", "Barista: All restored!"] },
      { id: "shop_pallet", x: 15, y: 12, color: "#ffd700", facing: "down", type: "shop",
        dialog: ["Shopkeeper: Welcome to the Brain Cell Mart!"] },
      { id: "rival_1", x: 14, y: 9, color: "#ff5e5e", facing: "down", defeated: false, type: "trainer",
        dialog: ["sapwn: bro June 5th!! show me what you got NOW"], trainerKey: "RIVAL_1" },
      { id: "sign_pallet", x: 11, y: 8, color: null, type: "sign",
        dialog: ["[#general-chat]\nThe entry channel.\nNorth: #lobby"] },
    ],

    route1: [
      { id: "youngster", x: 11, y: 8, color: "#3aa83a", facing: "down", defeated: false, type: "trainer",
        dialog: ["frankie: ??? what do i do here ???"], trainerKey: "RIVAL_1" },
      { id: "lass", x: 13, y: 23, color: "#ff8aa8", facing: "down", defeated: false, type: "trainer",
        dialog: ["buttkun: BTR! my circle is rounder than yours"], trainerKey: "RIVAL_1" },
      { id: "sign_route1", x: 14, y: 3, color: null, type: "sign",
        dialog: ["[#lobby]\nWild members in tall grass!\nNorth: #lobby-2"] },
      { id: "sign_route1_b", x: 14, y: 23, color: null, type: "sign",
        dialog: ["[#lobby]\nSouth: #general-chat\nNorth: #lobby-2"] },
      { id: "treasure_r1", x: 16, y: 8, color: "#ff8aff", facing: "down", type: "item",
        dialog: ["You found a Discord Invite!"], itemKey: "DISCORD_INVITE", consumed: false },
    ],

    viridian: [
      { id: "nurse_viridian", x: 9, y: 5, color: "#ff8aa8", facing: "down", type: "healer",
        dialog: ["Barista: Welcome!", "(*HSSSS*)", "Barista: Restored!"] },
      { id: "shop_viridian", x: 16, y: 14, color: "#ffd700", facing: "down", type: "shop",
        dialog: ["Shopkeeper: Cells, potions, vibes."] },
      { id: "gym_pasta", x: 6, y: 19, color: "#ffe070", facing: "down", defeated: false, type: "trainer",
        dialog: ["Mod LSM253: read the rules. THEN we fight.\nMember Role earned here."],
        trainerKey: "CHANNEL_MOD_1" },
      { id: "lore_master", x: 4, y: 12, color: "#9b6b9b", facing: "down", type: "npc",
        dialog: ["Lore Master: Press X for menu. Check the GUILDEX!"] },
      { id: "sign_viridian", x: 14, y: 4, color: null, type: "sign",
        dialog: ["[#guild-hall]\nFirst Gym: #rules-channel (south)\nNorth: #lobby-2"] },
    ],

    route2: [
      { id: "bird_lady", x: 5, y: 13, color: "#a08a5a", facing: "down", defeated: false, type: "trainer",
        dialog: ["walkingghead: smiley face. legs. no thoughts."], trainerKey: "RIVAL_1" },
      { id: "youngster2", x: 14, y: 5, color: "#3aa83a", facing: "down", defeated: false, type: "trainer",
        dialog: ["geared: ...default avatar. Pure potential."], trainerKey: "RIVAL_1" },
      { id: "sign_r2", x: 14, y: 8, color: null, type: "sign",
        dialog: ["[ROUTE 2]\nViridian Forest is north!\nDanger: dense memes."] },
      { id: "treasure_r2", x: 16, y: 13, color: "#ff8aff", facing: "down", type: "item",
        dialog: ["You found a Great Cell!"], itemKey: "NITRO_INVITE", consumed: false },
    ],

    forest: [
      { id: "hiker", x: 7, y: 11, color: "#7a5a3a", facing: "down", defeated: false, type: "trainer",
        dialog: ["Kaparking: HOP. ROBLOX. minecraft. all the games."], trainerKey: "RIVAL_1" },
      { id: "cultist", x: 18, y: 14, color: "#5a1a8a", facing: "down", defeated: false, type: "trainer",
        dialog: ["forgbear1: GEEKED HOMER GEEKED HOMER GEEKED HOMER"], trainerKey: "RIVAL_1" },
      { id: "sign_forest_1", x: 7, y: 10, color: null, type: "sign",
        dialog: ["[#gaming-vc]\nWild members everywhere.\nTrees whisper 'kingboys'."] },
      { id: "sign_forest_2", x: 18, y: 10, color: null, type: "sign",
        dialog: ["[#gaming-vc]\nSouth: #lobby-2\nNorth: #voice-call"] },
      { id: "treasure_forest", x: 5, y: 5, color: "#ff8aff", facing: "down", type: "item",
        dialog: ["You found a Raid Shield!"], itemKey: "RAID_SHIELD", consumed: false },
    ],

    pewter: [
      { id: "nurse_pewter", x: 8, y: 5, color: "#ff8aa8", facing: "down", type: "healer",
        dialog: ["Barista: Welcome!", "(*HSSSS*)", "Barista: All restored!"] },
      { id: "gym_bird", x: 15, y: 11, color: "#a08a5a", facing: "down", defeated: false, type: "trainer",
        dialog: ["Stream Captain ronic: drop a follow on ROBLOX or get banished.\nVerified Role on the line."],
        trainerKey: "STREAMER_LEAD" },
      { id: "kid_pewter", x: 10, y: 14, color: "#5fa84a", facing: "down", type: "npc",
        dialog: ["Yeep: this server is famous for sheep.", "Yeep: ...and minecraft."] },
      { id: "sign_pewter", x: 17, y: 3, color: null, type: "sign",
        dialog: ["[#voice-call]\nHome of Stream Gym (Badge 2)\nEast: #code-help"] },
    ],

    route3: [
      { id: "hiker3", x: 8, y: 14, color: "#7a5a3a", facing: "down", defeated: false, type: "trainer",
        dialog: ["F503N: 503 errors only. cowboy hat included."], trainerKey: "RIVAL_1" },
      { id: "lass3", x: 18, y: 7, color: "#ff8aa8", facing: "down", defeated: false, type: "trainer",
        dialog: ["_Kee_: JUST. tModLoader. I have like 80 mods installed."], trainerKey: "RIVAL_1" },
      { id: "sign_route3", x: 3, y: 2, color: null, type: "sign",
        dialog: ["[#code-help]\nThe Cave of Stack Overflow ahead.\nBring a Coffee Shot."] },
      { id: "sign_route3_b", x: 19, y: 14, color: null, type: "sign",
        dialog: ["[#code-help]\nWest: #voice-call\nEast: Stack Overflow Cave"] },
    ],

    mt_moon: [
      { id: "cultist_mtm", x: 14, y: 9, color: "#5a1a8a", facing: "down", defeated: false, type: "trainer",
        dialog: ["zyphon_.: lowercase only. permanent invisible."], trainerKey: "RIVAL_1" },
      { id: "rival_mtm", x: 17, y: 13, color: "#ff5e5e", facing: "down", defeated: false, type: "trainer",
        dialog: ["sapwn: caught me grinding for June 5th. battle me."], trainerKey: "RIVAL_1" },
      { id: "treasure_mtm", x: 1, y: 9, color: "#ff8aff", facing: "down", type: "item",
        dialog: ["You found a Golden Apple!"], itemKey: "GOLDEN_APPLE_I", consumed: false },
    ],

    cerulean: [
      { id: "nurse_cer", x: 14, y: 6, color: "#ff8aa8", facing: "down", type: "healer",
        dialog: ["Barista: Cerulean Cappuccino — fresh!", "(*HSSSS*)", "Barista: Restored!"] },
      { id: "shop_cer", x: 14, y: 20, color: "#ffd700", facing: "down", type: "shop",
        dialog: ["Cerulean Shopkeeper: Premium cells!"] },
      { id: "gym_sigma", x: 9, y: 14, color: "#9aa5ff", facing: "down", defeated: false, type: "trainer",
        dialog: ["Dev Lead dr.yeet: I'll merge your PR... if you can beat me.\nContributor Role here."],
        trainerKey: "CODE_LEAD" },
      { id: "old_man_cer", x: 7, y: 9, color: "#aabbcc", facing: "down", type: "npc",
        dialog: ["Old Man: In my day, only ONE Discord server."] },
      { id: "aura_farmer_cer", x: 18, y: 9, color: "#9aa5ff", facing: "down", defeated: false, type: "trainer",
        dialog: ["Banana_Man: I miss geeked Homer pls c..."], trainerKey: "DRAMA_LEAD" },
      // STORY: pre-drama-gym ambush after Badge 3.
      { id: "cult_lieu_cer", x: 4, y: 4, color: "#5a1a8a", facing: "down", defeated: false, type: "trainer",
        dialog: ["forgbear1: I knew you'd come east.\nGEEKED HOMER whispered through the static."],
        trainerKey: "DRAMA_LEAD" },
      { id: "sign_cer", x: 16, y: 16, color: null, type: "sign",
        dialog: ["[#dev-channel]\nDev Gym (Badge 3) center!\nEast: #art-showcase"] },
    ],

    route4: [
      { id: "fisher", x: 15, y: 11, color: "#3a78dc", facing: "down", defeated: false, type: "trainer",
        dialog: ["Trees: catch me on the leaderboard, leaf-style"], trainerKey: "RIVAL_1" },
      { id: "beach_bum", x: 8, y: 11, color: "#ffaa66", facing: "down", defeated: false, type: "trainer",
        dialog: ["sussybaka: when the impostor is sus 😳"], trainerKey: "RIVAL_1" },
      { id: "cosmic_rancher", x: 11, y: 2, color: "#fff5e0", facing: "down", defeated: false, type: "trainer",
        dialog: ["pootalker789: im tired of this grandpa, thats..."], trainerKey: "DRAMA_LEAD" },
      // STORY: pre-final ambush from the drama crew.
      { id: "cult_capt_r4", x: 24, y: 14, color: "#5a1a8a", facing: "down", defeated: false, type: "trainer",
        dialog: ["wart: TRLL forever. skull energy. nothing personal."],
        trainerKey: "DRAMA_LEAD" },
      { id: "sign_r4", x: 21, y: 2, color: null, type: "sign",
        dialog: ["[#art-showcase]\nEast: #admin-lounge\nWest: #dev-channel"] },
    ],

    vermilion: [
      { id: "nurse_verm", x: 4, y: 5, color: "#ff8aa8", facing: "down", type: "healer",
        dialog: ["Vermilion Barista: Sea-salt espresso!", "(*HSSSS*)", "Restored!"] },
      { id: "shop_verm", x: 14, y: 5, color: "#ffd700", facing: "down", type: "shop",
        dialog: ["Vermilion Shopkeeper: Imports from Italy!"] },
      { id: "gym_beach", x: 11, y: 14, color: "#3a78dc", facing: "down", defeated: false, type: "trainer",
        dialog: ["Drama Lord pootalker789: im tired of this grandpa, thats why I fight you instead.\nDRAMA ROLE here."],
        trainerKey: "DRAMA_LEAD" },
      { id: "gym_fire", x: 17, y: 14, color: "#a3361f", facing: "down", defeated: false, type: "trainer",
        dialog: ["Head Mod Christian: HMOD activated.\nMOD ROLE earned here."],
        trainerKey: "ADMIN_LEAD" },
      { id: "champion_npc", x: 11, y: 18, color: "#c93dff", facing: "down", defeated: false, type: "trainer",
        dialog: ["Champion Karl: discord.gg/AKnwZ58nP — final test."], trainerKey: "OWNER_FINAL" },
      { id: "ai_researcher", x: 7, y: 11, color: "#ffaaff", facing: "down", defeated: false, type: "trainer",
        dialog: ["Fffoost: pink hair, full ML pipeline in her brain."], trainerKey: "CODE_LEAD" },
      // STORY: Final pre-Champion confrontation.
      { id: "cult_leader_verm", x: 14, y: 11, color: "#5a1a8a", facing: "down", defeated: false, type: "trainer",
        dialog: ["Banana_Man: BANANA MAN WAS HERE FIRST!\nGEEKED HOMER NEVER LEFT!"],
        trainerKey: "ADMIN_LEAD" },
      { id: "high_roller", x: 19, y: 5, color: "#ffd700", facing: "down", defeated: false, type: "trainer",
        dialog: ["ronic: KING. ROBLOX. 7-7-7."], trainerKey: "DRAMA_LEAD" },
      // POST-GAME: Ferry captain opens the route to the South Valley
      // Isles after the Champion has been beaten.
      { id: "ferry_capt_verm", x: 20, y: 18, color: "#3a78dc", facing: "down", type: "ferry",
        dialog: ["Ferry Captain: Beat the Champion to unlock my route.",
                 "Ferry Captain: I sail you to the SOUTH VALLEY ISLES.",
                 "Ferry Captain: Wild legendaries roam there. Bring Ultra Cells."],
        ferryTo: { map: "south_valley", x: 1, y: 9 } },
      { id: "sign_verm", x: 16, y: 3, color: null, type: "sign",
        dialog: ["[VERMILION CITY]\nLast major town!\nGyms 4&5 + Champion here."] },
    ],

    south_valley: [
      { id: "sv_sign", x: 12, y: 2, color: null, type: "sign",
        dialog: ["[SOUTH VALLEY ISLES]\nPost-game island. Legendaries roam here.",
                 "Walk into the deepest grass at your own risk."] },
      { id: "sv_old_man", x: 13, y: 15, color: "#aabbcc", facing: "down", type: "npc",
        dialog: ["Old Man: I came here to forget. Glorbnoxion never left me.",
                 "Old Man: But the Tralalero pods? They sing me to sleep."] },
      { id: "sv_ferry_back", x: 1, y: 9, color: "#3a78dc", facing: "down", type: "ferry",
        dialog: ["Ferry Captain: Headed back to Vermilion?"],
        ferryTo: { map: "vermilion", x: 20, y: 18 } },
    ],
  };

  // ===========================================================
  // current map state
  // ===========================================================
  let currentMapId = "pallet";
  function currentMap() { return MAPS[currentMapId]; }
  function getCurrentMapId() { return currentMapId; }
  function setCurrentMap(id) { currentMapId = id; }

  function tileAt(x, y) {
    const m = currentMap();
    if (x < 0 || y < 0 || x >= m.width || y >= m.height) return T.W;
    return m.tiles[y][x];
  }

  function isWalkable(x, y) {
    const t = tileAt(x, y);
    if (t === T.W || t === T.R || t === T.B || t === T.S || t === T.HEAL_SIGN ||
        t === T.FENCE || t === T.CAVE_WALL ||
        (t >= T.ROOF_RED_L && t <= T.ROOF_PURPLE_R)) return false;
    const npcs = NPCS_BY_MAP[currentMapId] || [];
    for (const n of npcs) {
      if (n.consumed) continue;
      if (n.x === x && n.y === y) return false;
    }
    return true;
  }

  function npcAt(x, y) {
    const npcs = NPCS_BY_MAP[currentMapId] || [];
    return npcs.find(n => !n.consumed && n.x === x && n.y === y);
  }

  function isEncounterTile(x, y) {
    return tileAt(x, y) === T.H;
  }

  function encounterTable() {
    const m = currentMap();
    return m.encounters; // string key into ENCOUNTERS or null
  }

  function portalAt(x, y) {
    const m = currentMap();
    if (!m.portals) return null;
    return m.portals.find(p => p.x === x && p.y === y) || null;
  }

  function getMapWidth() { return currentMap().width; }
  function getMapHeight() { return currentMap().height; }
  function getMapName() { return currentMap().name; }

  function allNpcs() {
    return NPCS_BY_MAP[currentMapId] || [];
  }
  function allMaps() {
    const out = [];
    for (const id of Object.keys(MAPS)) out.push({ id, ...MAPS[id], npcs: NPCS_BY_MAP[id] || [] });
    return out;
  }

  function draw(ctx, cam, time) {
    const m = currentMap();
    const TILE = SpriteRenderer.TILE_SIZE;
    const startX = Math.max(0, Math.floor(cam.x / TILE) - 1);
    const startY = Math.max(0, Math.floor(cam.y / TILE) - 1);
    const endX = Math.min(m.width, Math.ceil((cam.x + ctx.canvas.width) / TILE) + 1);
    const endY = Math.min(m.height, Math.ceil((cam.y + ctx.canvas.height) / TILE) + 1);
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const sx = x*TILE - cam.x;
        const sy = y*TILE - cam.y;
        // Pass the world tile coords (tx, ty) so deterministic detail
        // (windows, flowers, etc.) stays anchored to the world. Older
        // code computed details from screen coords, which made them
        // visibly flicker in/out as the camera scrolled past buildings.
        SpriteRenderer.drawTile(ctx, m.tiles[y][x], sx, sy, time, x, y);
      }
    }
    const npcs = NPCS_BY_MAP[currentMapId] || [];
    const frame = Math.floor(time / 350);
    for (const n of npcs) {
      if (n.consumed) continue;
      if (n.color === null) continue;
      const sx = n.x*TILE - cam.x;
      const sy = n.y*TILE - cam.y;
      if (sx < -TILE || sx > ctx.canvas.width || sy < -TILE || sy > ctx.canvas.height) continue;
      SpriteRenderer.drawNpc(ctx, sx, sy, n.color, frame, n.type);
    }
  }

  return {
    T, MAPS, NPCS_BY_MAP,
    tileAt, isWalkable, npcAt, isEncounterTile, encounterTable, portalAt,
    getCurrentMapId, setCurrentMap, getMapName, getMapWidth, getMapHeight,
    allNpcs, allMaps, draw,
    get TILE() { return SpriteRenderer.TILE_SIZE; },
    get WIDTH() { return currentMap().width; },
    get HEIGHT() { return currentMap().height; },
    get npcs() { return NPCS_BY_MAP[currentMapId] || []; },
  };
})();
