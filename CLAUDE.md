# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A fork of the unofficial FoundryVTT game system for the Mothership RPG (by Tuesday Knight Games), maintained at `mechanoid23/fvtt-mosh-fork`. Supports both 0th edition (0e) and 1st edition (1e) rules. The system ID is `mosh-fork` (distinct from the upstream `mosh` so both can be installed in Foundry simultaneously).

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
| `module/actor/vehicle-sheet.js` | `MothershipVehicleSheet` | `vehicle` |
| `module/item/item-sheet.js` | `MothershipItemSheet` | most item types |
| `module/item/class-sheet.js` | `MothershipClassSheet` | `class` |
| `module/item/skill-sheet.js` | `MothershipSkillSheet` | `skill` |

### Settings & windows
- `module/settings.js` — registers all world/client settings (edition toggle, calm mode, macro target, etc.)
- `module/windows/` — sub-windows/apps: creature settings, actor generator, rolltable config, ship deckplan, ship megadamage, ship macros, ship setup

### Data schema
`module/data/` defines TypeDataModel classes for all actor and item types, replacing the upstream `template.json`. Registered in `module/mosh.js` via `CONFIG.Actor.dataModels` and `CONFIG.Item.dataModels`. Key actor types:
- **character**: stats (strength, speed, intellect, combat, sanity, fear, body, armor), stress/calm, wounds (hits), health, skills, equipment
- **creature**: configurable stats (combat, instinct, speed, loyalty, armor, sanity — each togglable via `enabled`)
- **ship**: hull/fuel/stock/crew supplies, weapon hardpoints, megadamage system
- **vehicle**: speed, armor (value + damageReduction), crew (value/max), weapons (value/max), description/biography/notes; weapon items can be embedded

### Templates
Handlebars templates in `templates/` organized by `actor/`, `item/`, `chat/`, `dialogs/`.

### Compendium packs
`packs/*.db` (LevelDB) — conditions, macros, and rolltables for each edition. Declared in `system.json`. The source JS files for macros live in `_macros/hotbar_0e/`, `_macros/hotbar_1e/`, `_macros/triggered_0e/`, `_macros/triggered_1e/`.

## Releasing updates

The fork uses GitHub Releases for Foundry package distribution. To ship an update:

1. Make changes, bump `"version"` in `system.json`, and update `"download"` to the next tag (e.g. `fork_06`)
2. Commit and push to `master`
3. Build a flat ZIP from the repo root (Foundry requires `system.json` at the ZIP root):
   ```bash
   zip -r /tmp/fvtt-mosh-fork.zip . \
     --exclude "*.git*" --exclude "*node_modules*" --exclude "*_releases*" \
     --exclude "*.DS_Store" --exclude "*/scss/*" --exclude "*package-lock.json" \
     --exclude "*/\.*" -q
   ```
4. Create the GitHub release:
   ```bash
   gh release create fork_06 /tmp/fvtt-mosh-fork.zip \
     --repo mechanoid23/fvtt-mosh-fork --title "fork_06"
   ```

> **Important**: always name the zip `fvtt-mosh-fork.zip` (not `fvtt-mosh-fork-fork06.zip` or any other variant). The `"download"` URL in `system.json` hardcodes that exact filename — a mismatch causes a 404 when Foundry tries to install.

The `"manifest"` URL points to `master/system.json` so Foundry always sees the latest version number and can detect updates. The `"download"` URL points to the specific release ZIP.

Install/update in Foundry via: `https://raw.githubusercontent.com/mechanoid23/fvtt-mosh-fork/master/system.json`

### TypeDataModel conventions (`module/data/`)

Each item/actor type has a `*Data` class in `module/data/items/` or `module/data/actors/` that extends `foundry.abstract.TypeDataModel` and implements `static defineSchema()`. Exported from `index.js` and registered in `mosh.js`.

**Critical schema gotcha — `choose_skill_or`**: The raw DB stores this as `Array<Array<Object>>` (array of option groups, each group being an array of option objects). The schema must be `ArrayField(ArrayField(ObjectField()))`. Using `ArrayField(ObjectField())` causes Foundry to corrupt the inner arrays — only the first option in each group will be available.

### Psionics tab

`module/actor/actor-sheet.js` — `_prepareCharacterItems()` separates `type === "ability"` items into an `abilities` array and sets `actorData.system.hasPsionics = true` when the character's class is `"Psychic"` or `"Emissary"`. The character sheet template (`templates/actor/actor-sheet.html`) conditionally renders a Psionics tab when `system.hasPsionics` is set.

`type: "ability"` items use `module/data/items/ability-data.js` with fields: `rank` (StringField), `bonus` (NumberField), `prerequisite_ids` (ArrayField of StringField). These are the psionic powers from the RWC compendium (`fvtt_mosh_1e_rwc`).

### Actor generator (`module/windows/actor-generator.js`)

`applyClassSkills()` reads `classObject.system.selected_adjustment.choose_skill_or` and normalizes each group with `if (!Array.isArray(g)) g = Object.values(g)` as a defensive fallback (the TypeDataModel schema fix makes this a no-op, but it stays for safety). `showOptionsDialog()` uses `foundry.applications.api.DialogV2` with one button per option.

## Fork-specific conventions

- **System ID**: `mosh-fork` — used in `registerSheet`, `game.settings.get/register`, pack `system` fields, and `Compendium.mosh-fork.*` references. Do NOT change CSS class names in `defaultOptions.classes` — those stay as `"mosh"` to match the compiled CSS in `css/mosh.css`.
- **CSS classes**: Sheet `defaultOptions.classes` arrays use `"mosh"` (not `"mosh-fork"`) as the first class. The compiled CSS targets `.mosh`. Do not rename these.
- **getData() pattern**: Sheet `getData()` calls `super.getData()`, works on `data.data.*`, and returns `data.data`. The Handlebars template context is `data.data`.

## Key conventions

- **Edition gating**: the `firstEdition` game setting controls which rules apply. Check `game.settings.get('mosh', 'firstEdition')` before edition-specific logic.
- **Macro targeting**: macros respect `game.settings.get('mosh', 'macroTarget')` — either `'character'` (user's assigned character) or `'token'` (selected tokens). Both branches must always be handled.
- **Roll flow**: most rolls go through `actor.rollCheck(rollString, aimFor, attribute, skill, skillValue, weapon)` on `MothershipActor`.
- **Calm mode**: the `useCalm` setting repurposes the stress track as a calm track (min stress 0, default max 85, label "Calm").
- **Foundry API version**: targets v13–v14. Use `foundry.applications.api.DialogV2`, `foundry.documents.collections.Actors`, and `foundry.utils.*` — not deprecated v11 patterns.
- **No bundler**: JS files use native ES module `import`/`export`. Keep imports relative and explicit (`.js` extension required).
