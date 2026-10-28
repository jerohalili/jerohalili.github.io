/**
 * What a visitor sees the FIRST time they try each theme.
 * Edit the values below to change the defaults.
 *
 *   mode     'light' | 'dark' | 'system'
 *              'system' follows the visitor's device setting.
 *   accent   'orange' | 'rose' | 'violet' | 'blue' | 'cyan' | 'emerald'
 *   effects  Optional per-theme overrides of effectDefaults (below).
 *
 * Once a visitor changes something in the Customize panel, their choice is
 * remembered for that theme and wins over these defaults. "Reset to defaults"
 * in the panel clears their choices.
 */
export const themeDefaults = {
  clean: {
    mode: 'light',
    accent: 'orange',
    effects: {},
  },
  command: {
    mode: 'dark',
    accent: 'cyan',
    effects: { spotlight: true },
  },
  terminal: {
    mode: 'dark',
    accent: 'emerald',
    effects: { spotlight: true, scanlines: true },
  },
} as const;

/** Effects for every theme, unless a theme overrides them above. */
export const effectDefaults = {
  motion: true, // animations, reveals, transitions
  particles: true, // animated constellations
  tilt: true, // 3D card tilt
  magnetic: true, // buttons drift toward the cursor
  glow: true, // soft light trailing the pointer
  spotlight: false, // cards light up under the cursor
  scanlines: false, // retro screen lines
} as const;
