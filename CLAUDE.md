# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An unofficial FoundryVTT game system for the Mothership RPG (by Tuesday Knight Games). Supports both 0th edition (0e) and 1st edition (1e) rules. The system ID is `mosh`.

## Build commands

```bash
npm install          # install dependencies (gulp, gulp-sass, etc.)
npm run build        # compile SCSS once and watch for changes
npm run compile      # compile SCSS once (no watch)
```

SCSS source lives in `scss/` and compiles to `css/mosh.css`. There is no JS build step — the ES modules in `module/` are loaded directly by Foundry.

## Architecture

### Entry point
`module/mosh.js` — registers all document classes and sheets, sets up Handlebars helpers, and exposes the global `game.mosh` API used by macros (`rollItemMacro`, `initRollCheck`, `initModifyActor`, etc.).

### Document classes
- `module/actor/actor.js` — `MothershipActor` extends Foundry's `Actor`. Derived data (armor totals, netHP, bleeding) is computed in `prepareDerivedData()` per actor type.
- `module/item/item.js` — `MothershipItem`

### Sheet classes (one per actor/item subtype)
| File | Sheet | Types |
|---|---|---|
| `module/actor/actor-sheet.js` | `MothershipActorSheet` | `character` |
| `module/actor/creature-sheet.js` | `MothershipCreatureSheet` | `creature` |
| `module/actor/ship-sheet-sbt.js` | `MothershipShipSheetSBT` | `ship` (default) |
| `module/actor/ship-sheet.js` | `MothershipShipSheet` | `ship` (alternate) |
| `module/item/item-sheet.js` | `MothershipItemSheet` | most item types |
| `module/item/class-sheet.js` | `MothershipClassSheet` | `class` |
| `module/item/skill-sheet.js` | `MothershipSkillSheet` | `skill` |

### Settings & windows
- `module/settings.js` — registers all world/client settings (edition toggle, calm mode, macro target, etc.)
- `module/windows/` — sub-windows/apps: creature settings, actor generator, rolltable config, ship deckplan, ship megadamage, ship macros, ship setup

### Data schema
`template.json` defines the data model for all actor and item types. Key actor types:
- **character**: stats (strength, speed, intellect, combat, sanity, fear, body, armor), stress/calm, wounds (hits), health, skills, equipment
- **creature**: configurable stats (combat, instinct, speed, loyalty, armor, sanity — each togglable via `enabled`)
- **ship**: hull/fuel/stock/crew supplies, weapon hardpoints, megadamage system

### Templates
Handlebars templates in `templates/` organized by `actor/`, `item/`, `chat/`, `dialogs/`.

### Compendium packs
`packs/*.db` (LevelDB) — conditions, macros, and rolltables for each edition. Declared in `system.json`. The source JS files for macros live in `_macros/hotbar_0e/`, `_macros/hotbar_1e/`, `_macros/triggered_0e/`, `_macros/triggered_1e/`.

## Key conventions

- **Edition gating**: the `firstEdition` game setting controls which rules apply. Check `game.settings.get('mosh', 'firstEdition')` before edition-specific logic.
- **Macro targeting**: macros respect `game.settings.get('mosh', 'macroTarget')` — either `'character'` (user's assigned character) or `'token'` (selected tokens). Both branches must always be handled.
- **Roll flow**: most rolls go through `actor.rollCheck(rollString, aimFor, attribute, skill, skillValue, weapon)` on `MothershipActor`.
- **Calm mode**: the `useCalm` setting repurposes the stress track as a calm track (min stress 0, default max 85, label "Calm").
- **Foundry API version**: targets v13–v14. Use `foundry.applications.api.DialogV2`, `foundry.documents.collections.Actors`, and `foundry.utils.*` — not deprecated v11 patterns.
- **No bundler**: JS files use native ES module `import`/`export`. Keep imports relative and explicit (`.js` extension required).
