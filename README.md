**Install in Foundry VTT:** `https://raw.githubusercontent.com/mechanoid23/fvtt-mosh-fork/master/system.json`

> This is a maintained fork by mechanoid23. It adds homebrew class support, a Psionics tab, and TypeDataModel-based data validation on top of the upstream unofficial mosh system.

## MoSh | Unofficial Mothership RPG

An unofficial implementation of Tuesday Knight's Mothership role playing system. Mothership is the property of Tuesday Knight Games, and can be purchased at https://mothershiprpg.com/

#### Fork additions (mechanoid23)
- **Psionics tab** on the character sheet — visible only for Psychic and Emissary class characters; lists `ability`-type items (psionic powers from the RWC compendium) with rank and bonus
- **TypeDataModel data layer** — replaces upstream `template.json` with explicit Foundry schema classes in `module/data/`, enabling proper field validation and type safety
- **Vehicle actor type** — additional sheet and template for vehicle actors
- **Potential stat** — character stat for potential rolls in the actor generator

#### Features
- Full 1e AND 0e system support with conditions, rolltables, and macros for each
- Character sheets styled to resemble the official printout sheets
- Comprehensive automation for all checks, saves, attacks, wounds, and conditions
- Intuitive hotbar macros for key tasks that guide you through step-by-step
- Customizable ship and creature sheets with selectable stats
- Macro support for weapons, items, stats, and skills
- Includes optional house rules, like Calm and Android panic tables
- Custom Dice So Nice! themes for regular rolls, damage, and panic checks 
  
#### Screenshots
![Alt text](https://github.com/Futil/foundry-mothership/assets/982251/9d929554-8fcf-4fa1-b198-44c99b60434c "Screenshot") 

#### Licensing & Community Guidelines
- This system is not affiliated with Tuesday Knight Games and is released for non-commercial purposes.
- Mothership is copyright Tuesday Knight Games. All relevant trademarks and IP are the property of their respective owners.
- This Foundry VTT system for Mothership is an unofficial community project, released under the MIT License. Third-party modules (free or paid) are welcome, but are not supported, and may break with future updates to the system.
