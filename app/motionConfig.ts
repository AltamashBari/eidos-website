/**
 * PACING
 *
 * One distinction runs through this file, and it is worth keeping straight:
 *
 *   RESPONSE  — how fast the interface reacts to a touch. Always instant.
 *               Press feedback stays at 100ms and is NOT tuned here.
 *   NARRATIVE — how long a story beat takes to play. This is taste, and
 *               this is what the values below control.
 *
 * Everything here was slowed ~35% from the first pass, which read as rushed.
 * To go slower again, scale the `home.*ViewportHeights` values up together
 * (they must move as a set, along with the matching svh overrides in
 * globals.css) and lengthen the duration values below.
 */
export const motionConfig = {
  nav: {
    characterDurationMs: 300,
    characterStaggerMs: 65,
    travelPx: 16,
  },
  mobileNav: {
    panelDurationMs: 480,
    characterDurationMs: 560,
    totalCharacterStaggerMs: 520,
  },
  loader: {
    // No artificial floor. The loader shows only while assets genuinely load;
    // a ready page reveals immediately. maximumAssetWaitMs is the safety cap
    // so a slow image can never hold the page hostage.
    minimumVisibleMs: 0,
    maximumAssetWaitMs: 5000,
    exitDurationMs: 560,
  },
  pageCover: {
    // Used by the View Transitions API now — it runs alongside navigation
    // rather than delaying it. Lengthening this adds grace without adding
    // a single millisecond of waiting before the navigation starts.
    enterDurationMs: 380,
  },
  home: {
    // Scroll distance each chapter occupies. The animation is scrubbed against
    // this height, so a LARGER number spreads the same beats over more scroll —
    // the story plays slower without anything being cut.
    introViewportHeights: 2150,
    teamViewportHeights: 990,
    chapterOverlapViewportHeights: 270,
    heroExit: [0.355, 0.5] as const,
    sectorTravel: [0.465, 1] as const,
    sectorPanelViewportWidths: 63,
    sectorTravelViewportWidths: 341,
    sectorMainParallax: 1,
    sectorRearParallax: 1.2,
    sectorAccentParallax: 0.5,
    teamTravelViewportWidths: 200,
  },
  projectCard: {
    imageScaleStart: 1,
    imageScaleEnd: 1.2,
    copyTravelPx: 223,
    shapeStartPercent: -23,
    shapeEndPercent: -100,
  },
  projectEntry: {
    shapeDurationMs: 900,
    titleDurationMs: 650,
    titleTravelPx: 50,
  },
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
} as const;

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function rangeProgress(value: number, start: number, end: number) {
  return clamp01((value - start) / (end - start));
}
